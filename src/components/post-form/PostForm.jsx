import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'

        },
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const [imagePreview, setImagePreview] = useState('')
    const submit = async (data) => {
        console.log("Form Data:", data);

        let fileId = post?.featuredImage || null; // Ensure `fileId` is always set

        if (data.image && data.image[0]) {
            try {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    fileId = file.$id;

                    if (post?.featuredImage) {
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                }
            } catch (error) {
                console.error("File upload failed:", error);
                return; // Stop submission if file upload fails
            }
        }

        try {
            const payload = {
                ...data,
                featuredImage: fileId || "", // Ensure `featuredImage` is never missing
                userId: userData?.$id,
            };

            const dbPost = post
                ? await appwriteService.updatePost(post.$id, payload)
                : await appwriteService.createPost(payload);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
        }
    };
    const handleInputImage = (e) => {
        let file = e.target.files[0]
        setValue("image", e.target.files, { shouldValidate: true })
        let imageURL = URL.createObjectURL(file)
        setImagePreview(imageURL)
        console.log(imageURL)
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/[^a-z0-9-]/g, "") // Remove special characters
                .replace(/-+/g, "-");
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 w-1/5"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={handleInputImage}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 w-1/5"
                    {...register("status", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {imagePreview && <div className='mb-4'>
                    <img src={imagePreview} className='rounded-sm' alt="" />
                </div>}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
