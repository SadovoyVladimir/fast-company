import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsRecieved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    commentRemoved: (state, action) => {
      const newState = state.entities.filter(c => c._id !== action.payload)
      state.entities = newState
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsRecieved, commentsRequestFailed, commentCreated, commentRemoved } = actions

const commentCreateRequested = createAction('comments/commentCreateRequested')
const createCommentFailed = createAction('comments/createCommentFailed')
const commentRemoveRequested = createAction('comments/commentRemoveRequested')
const removeCommentFailed = createAction('comments/removeCommentFailed')

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsRecieved(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (comment) => async dispatch => {
  dispatch(commentCreateRequested())
  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(createCommentFailed(error.message))
  }
}

export const removeComment = (commentId) => async dispatch => {
  dispatch(commentRemoveRequested())
  try {
    const { content } = await commentService.removeComment(commentId)
    if (content === null) {
      dispatch(commentRemoved(commentId))
    }
  } catch (error) {
    dispatch(removeCommentFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
