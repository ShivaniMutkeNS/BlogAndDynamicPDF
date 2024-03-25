import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {//use to list all post in short format
    //$id is just variable it can be anything
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-black rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold text-white'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard