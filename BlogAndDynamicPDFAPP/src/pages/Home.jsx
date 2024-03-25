import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import logoImage from '../components/img.png'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8  text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8 px-8'>
            <Container>
                <div className='flex flex-wrap'>

                    <a href="#"
                       className="flex  items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:bg-blue-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src={logoImage} alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal mt-4 mb-5">
                            <h5 className="text-4xl font-black text-gray-900 dark:text-cyan-400">Welcome to blog app  :)</h5>
                            <p className="mb-3 font-normal text-cyan-700 dark:text-gray-400">
                                Craft a captivating headline that grabs attention and reflects your blog's niche. Briefly explain what your blog offers in a subheading. Include a clear call to action button to nudge visitors towards further exploration.
                                Showcase some of your best content in a featured posts section.
                                Use catchy titles, intriguing excerpts, and high-quality visuals to pique reader interest.
                                Consider adding a categories section with clear labels to help readers navigate your content based on their interests..</p>
                        </div>
                    </a>

                </div>
            </Container>
        </div>
    )
}

export default Home