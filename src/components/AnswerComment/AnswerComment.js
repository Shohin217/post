import React from 'react'
import { ANSWER_COMMENT_REMOVE, ANSWER_COMMENT_LIKE } from '../../actions/actions'

export default function AnswerComment({answers, dispatch}) {
    const answerCommentRemove =()=>{
        dispatch({type: ANSWER_COMMENT_REMOVE, answerId: answers.id})
    }
    const answerCommentLike = () =>{
        dispatch({type: ANSWER_COMMENT_LIKE, answerId: answers.id})
    }
    return (
        <div>
            <p>{answers.name} {answers.surname}</p>
            <p>{answers.content}</p>
            <p onClick={answerCommentLike} className={answers.likedByMe ? 'liked': undefined}>❤ {answers.like}</p>
            <p onClick={answerCommentRemove}>X</p>
        </div>
    )
}
