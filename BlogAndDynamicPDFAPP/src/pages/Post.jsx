import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {isAuthor && (
                    <div className="w-full mb-13">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-blue-950 text-4xl font-bold text-cyan-10" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-blue-950  text-4xl font-bold text-cyan-10" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="w-full flex justify-center mb-  rounded-xl p-2 ">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl object-cover h-120 w-96 ..."
                    />


                </div>
                <div className="w-full mb-6">
                    <h1 className="text-4xl font-bold text-cyan-400">{post.title}</h1>
                </div>
                <div className="text-1xl font-bold text-gray-100  mb-13">
                    {parse(post.content)}
                </div>

            </Container>
        </div>
    ) : null;
}
