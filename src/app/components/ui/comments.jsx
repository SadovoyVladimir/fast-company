import React from 'react'
import { orderBy } from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useComments } from '../../hooks/useComments'

export default function Comments() {
  const { createComment, comments, removeComment } = useComments()

  const handleSubmit = (data) => {
    createComment(data)
  }
  const handleRemoveComment = (id) => {
    removeComment(id)
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className='card mb-2'>
        <div className='card-body '>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className='card mb-3'>
          <div className='card-body '>
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  )
}
