import React, { useState } from 'react'
import { POST_ADD } from '../../actions/actions'

export default function PostAddForm({dispatch}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [content, setContent] = useState('')
    const [multimediaContent, setMultimediaContent] = useState('')
    
    const onInputName = evt =>{
        const nameValue = evt.target.value
        setName(nameValue)
    }
    const onInputSurname = evt =>{
        const surnameValue = evt.target.value
        setSurname(surnameValue)

    }
    const onInputContent = evt =>{
        const contentValue =  evt.target.value
        setContent(contentValue)
    }
    const onInputMultimediaContent = evt =>{
        const multimediaContentValue = evt.target.value
        setMultimediaContent(multimediaContentValue)
    }
    const handleSubmit = evt =>{
        evt.preventDefault()
        dispatch({type: POST_ADD, name, surname, content, multimediaContent})
        setName('')
        setSurname('')
        setContent('')
        setMultimediaContent('')
    }
    
    return (
        <div className='form_add_post clearfix'>
             <form onSubmit={handleSubmit} >
                 <div className='formEl clearfix'>
                    <label htmlFor="inputName">Введите имя: </label>
                    <input id="inputName" type="text" onChange={onInputName} value={name} />
                </div>
                <div className='formEl clearfix'>
                    <label htmlFor="inputSurname">Введите фамилию: </label>
                    <input id="inputSurname" type="text" onChange={onInputSurname} value={surname}/>
                </div>
                <div className='formEl clearfix'>
                    <label htmlFor="inputContent">Текстовый контент: </label>
                    <textarea className='clearfix' id="inputContent" type="text" onChange={onInputContent} value={content}/>
                 </div><div className='formEl clearfix'>
                    <label htmlFor="inputMultimediaContent">Мультимедийный контент: </label>
                    <textarea className='clearfix formElMultimedia' id="inputMultimediaContent" type="text" onChange={onInputMultimediaContent} value={multimediaContent}/>
                 </div>
                <button>Добавить пост</button>
            </form>
        </div>
       
    )
}
