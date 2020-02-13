import React from 'react'
import { useState } from 'react'
import { COMMENT_ADD } from '../../actions/actions'

export default function CommentAdd({postId,dispatch}) {
    const [comment, setComment] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const onCommentAdd = evt =>{
        evt.preventDefault();
        dispatch({type: COMMENT_ADD, postId, comment, name, surname})
        setComment('')
        setName('')
        setSurname('')
    }
    const inputComment = evt => {
        const value = evt.target.value
        setComment(value)
    }
    const inputName = evt => {
        const value = evt.target.value
        setName(value)
    }
    const inputSurname = evt => {
        const value = evt.target.value
        setSurname(value)
    }
    return (
        <form className='commentAdd '>
            <div className='clearfix'>
            <label htmlFor="inputCommentName">Имя: </label>
                <input className='inputCommenName' onChange={inputName} value={name}/>
                <label htmlFor="inputCommentSurname">Фамилия: </label>
                <input className='inputCommentSurname' onChange={inputSurname} value={surname}/>
                <label className='labelForComment' htmlFor="inputComment">Комментарий: </label>
            </div>
            <div className='clearfix'>
                <textarea className='inputComment' onChange={inputComment} value={comment}/>
                <button onClick={onCommentAdd}>Ok</button>
            </div>
        </form>
    )
}
