import React from 'react'
import { COMMENT_LIKE, COMMENT_REMOVE, ANSWER_COMMENT_ADD } from '../../actions/actions'
import AnswerComment from '../AnswerComment/AnswerComment'

export default function Comment({comment, dispatch}) {
    const onLike= evt =>{
        evt.preventDefault()
        dispatch({type: COMMENT_LIKE, commentId: comment.id})
    }
    const onRemove = evt => {
        evt.preventDefault()
        dispatch({type: COMMENT_REMOVE, commentId: comment.id})
    }

    const onAnswerComment = () =>{
        dispatch({type: ANSWER_COMMENT_ADD, commentId: comment.id})
    }
    return (
        <div className={comment.commentByMe ? 'postComment myPostComment' : 'postComment'}>
            <div className='postCommentOwner clearfix'>
                <p>{comment.name}</p>
                <p>{comment.surname}</p>
            </div>
            <p className='comment'>{comment.content}</p>
            <p onClick={onLike} className={comment.likedByMe ? 'commentLike liked' : 'commentLike'}>❤ {comment.like}</p>
            {comment.answersComment.map(a => <AnswerComment answers={a} key={a.id} dispatch={dispatch}/>)}
            <p onClick={onAnswerComment}>Ответить на коммент</p>
            {comment.commentByMe && <button onClick={onRemove} className='removeComment'>X</button>}
        </div>
    )
}
