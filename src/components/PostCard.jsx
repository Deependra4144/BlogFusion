import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import parser from 'html-react-parser'

function PostCard({ $id, title, featuredImage, content }) {

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className=' justify-center mb-4'>
          <img src={appwriteService.filePreview(featuredImage)} alt={title}
            className='rounded-xl object-cover h-48 w-full'
          />
        </div>
        <h2 className=' md:text-xl font-bold'>{title}</h2>
        <div className="browser-css">
          {parser(content)}
        </div>
      </div>
    </Link>
  )
}

export default PostCard
