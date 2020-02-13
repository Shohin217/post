import React from 'react'
import Post from '../Post/Post'
import PostAddForm from '../PostAddForm/PostAddForm'
import { useReducer } from 'react'
import {POST_ADD, POST_REMOVE, POST_LIKE, COMMENT_REMOVE, COMMENT_LIKE, COMMENT_ADD, ANSWER_COMMENT_ADD, ANSWER_COMMENT_REMOVE, ANSWER_COMMENT_LIKE} from '../../actions/actions'

let nextPostId = 1
let nexCommentId = 1
let nextAnswersComment = 1
const initPost = [
    {
        id: nextPostId++, 
        postByMe: false, 
        authorImg: 'https://i.pravatar.cc/50', 
        name: 'Владимир', 
        surname: 'Фролов', 
        content: 'Единственный способ жить хорошо - сразу уходить оттуда, где плохо. Взято с сайта: millionstatusov.ru',
        imgContent:" https://millionstatusov.ru/pic/statpic/all2/58fb6df2a05dd.jpg", 
        audioContent: false, 
        videoContent: false, 
        like: 2, 
        likedByMe: false, 
        comments:   
        [{
                id: nexCommentId++, 
                name: 'Александр', 
                surname: 'Владимирский', 
                content: 'Случается плохо,где было хорошо и некоторым там хорошо,где плохо, к примеру или климат подошёл, или просто отсутствие близкого лоха.)))', 
                like: 4, 
                likedByMe: false, 
                commentByMe: false, 
                answersComment: 
                [{
                        id: nextAnswersComment++, 
                        name: 'Ейвгений', 
                        surname: 'Витаельевич', 
                        content: 'Подкомент для коммента', 
                        like: 1, 
                        likedByMe: false, 
                        commentByMe: false
                }]
        }]
    },
]



function likeComment(comments, idComment){
    return comments.map(c => {
        if(c.id === idComment){
            return {...c, likedByMe: !c.likedByMe, like: c.likedByMe ? c.like - 1 : c.like + 1}
        }
        return c
    })
}
function removeComment(comments, idComment){
    return comments.filter(c => (c.id !== idComment))
}
function addComment(comments,comment, name, surname){
    return [...comments,  {id:nexCommentId++, name: name, surname: surname, content: comment, like: 0, likedByMe: false, commentByMe: true, answersComment:[]}]
}

function answerCommentLike (ansComment, ansId){
    return ansComment.map(a => {
        if(a.id === ansId){
            return {...a, likedByMe: !a.likedByMe, like: a.likedByMe ? a.like - 1: a.like + 1 } 
        }
        return a
    }) 
}
function answerCommentRemove(ansComment, ansId){
    return ansComment.filter(a => a.id!== ansId)
}

function answerCommentAdd(oldcomment){
    return [...oldcomment, 
        {
            id: nextAnswersComment++, 
            name: 'anonimous', 
            surname: 'anonim', 
            content: 'wery cool!', 
            like: 1, 
            likedByMe: false, 
            commentByMe: false
        }]
}
function reducer(posts, action){
    switch(action.type){
        case POST_ADD:
            { 
                const {name, surname, content, multimediaContent} = action
                const imgContent = multimediaContent.indexOf('.jpg')!== -1 && multimediaContent 
                const audioContent = multimediaContent.indexOf('.mp3') !== -1 && multimediaContent 
                const videoContent = multimediaContent.indexOf('.mp4') !== -1 && multimediaContent 
                const newPost = {
                    id: nextPostId++, 
                    postByMe: true,
                    authorImg: 'https://i.pravatar.cc/50',
                    name,
                    surname, 
                    content, 
                    imgContent,
                    audioContent,
                    videoContent,
                    like: 0, 
                    likedByMe: false, 
                    comments: []
                }; 
            return  [newPost, ...posts]
            }
        case POST_REMOVE:
            {
                const {postId} = action
                return posts.filter(o => o.id !== postId)
            }
        case POST_LIKE:
            {
                const {postId} = action
                return posts.map(o => {
                    return postId !== o.id ? 
                    o : o.likedByMe ? 
                    {...o, likedByMe: false, like: o.like - 1} : {...o,likedByMe: true, like: o.like + 1}
                })
            }
        case COMMENT_ADD:
            {
                const {postId, comment, name, surname} = action
                return posts.map(o => ({
                    ...o, comments: o.id === postId ? addComment(o.comments,comment,name,surname) : o.comments
                }))
            }
        case COMMENT_REMOVE:
            {
                const {commentId} = action
                return posts.map(p => ({
                    ...p, comments: removeComment(p.comments, commentId)
                }))
            }
        case COMMENT_LIKE:
            {
                const {commentId} = action 
                return posts.map(p => ({
                    ...p, comments: likeComment(p.comments, commentId)
                }))
            }
        case ANSWER_COMMENT_ADD:
            {
                const {commentId} = action
                return posts.map(p => ({
                    ...p,
                    comments: p.comments.map(o => ({
                        ...o, 
                        answersComment: commentId === o.id ? answerCommentAdd(o.answersComment) : o.answersComment
                    }))
                }))
            }
        case ANSWER_COMMENT_REMOVE:
            {
                const {answerId} = action
                return posts.map(p => ({
                    ...p,
                    comments: p.comments.map( c =>({
                        ...c,
                        answersComment: answerCommentRemove(c.answersComment, answerId)
                    }))
                }))
            }
        case ANSWER_COMMENT_LIKE:
            {
                const {answerId} = action
                return posts.map(p => ({
                    ...p,
                    comments: p.comments.map(c => ({
                        ...c,
                        answersComment: answerCommentLike(c.answersComment, answerId)
                    }))
                }))
            }
        default:{
            return posts
        }
    }
}
export default function Wall() {
    const [posts, dispatch] = useReducer(reducer, initPost)
    return (
        <div>
            <PostAddForm dispatch={dispatch} />
            {posts.map(o => <Post
                key={o.id}
                post={o} 
                dispatch={dispatch}
            />)}
        </div>
    )
}
