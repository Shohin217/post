import React from 'react'
// import Like from '../Like/Like'
import Comment from '../Comment/Comment'
import CommentAdd from '../CommentAdd/CommentAdd'
import {POST_LIKE, POST_REMOVE} from '../../actions/actions'

export default function Post({post, dispatch }) {
    const onPostLike = ()=>{
        dispatch({type: POST_LIKE, postId: post.id})
    }
    const onPostRemove = evt =>{
        evt.preventDefault();
        dispatch({type: POST_REMOVE, postId: post.id})
    }
    return (
        <div className='post'>
            <div className='postOwner clearfix'>
                <img src={post.authorImg} alt=""/>
                <p>{post.name}</p>
                <p>{post.surname}</p>
                {post.postByMe && <button onClick={onPostRemove}>Удалить пост</button>}
            </div>
            <div className='postContent clearfix'>
                <div className='childPostContent'>
                    <p>
                        {post.content}
                    </p>
                    {post.imgContent !== false && <img src={post.imgContent} alt="Img" />}
                    {post.audioContent !== false && <audio controls='enabled' src={post.audioContent} alt="IMG" />}
                    {post.videoContent !== false && <video controls='enabled' src={post.videoContent} alt="IMG" />}
                </div>
                <p onClick={onPostLike} className={post.likedByMe ? 'liked' : undefined} > ❤ {post.like}</p>
            </div>
            <div className='clearfix'>
                {post.comments.map(o => <Comment key={o.id} comment={o} dispatch={dispatch} />)}
            </div>
            <CommentAdd postId={post.id} dispatch={dispatch} />
        </div>
    )
}
