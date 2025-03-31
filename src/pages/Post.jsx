import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button, Container } from '../components'
import parser from 'html-react-parser'
import { useSelector } from 'react-redux'


function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false

    const handlePostDelete = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                    // console.log(post.featuredImage)
                    // console.log(appwriteService.filePreview(post.featuredImage))
                }
                else navigate('/')
            })

        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-1/2"
                    />
                    <div className="w-full mb-6 ms-6 ">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <div className="browser-css ">
                            {parser(post.content)}
                        </div>
                        {isAuthor && (
                            <div className="absolute bottom-4 right-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={handlePostDelete}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                </div>

            </Container>
        </div>
    ) : null;
}

export default Post
