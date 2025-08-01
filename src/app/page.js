"use client";
import RightAside from "./Component/RightAside";
import LeftAside from "./Component/LeftAside";
import CreatePost from "./Component/CreatePost";
import Posts from "./Component/Posts";
import { useState } from "react";

export default function Home() {
   const [localPosts, setLocalPosts] = useState([]);

  const handleNewPost = (newPost) => {
    setLocalPosts(prev => [newPost, ...prev]);
  }
  return (
    <div style={{backgroundColor: "#f5f7fa"}} className="font-[Ruboto,sans-serif]">
      <div style={{backgroundColor: "#f5f7fa"}} className="flex w-full max-w-screen-xl mx-auto">
        <div className="hidden lg:block bg-[#f0f4f8] border-l border-[#e0e7ef]  fixed left-15 top-0 z-20 w-70 pt-16">
          <RightAside />
        </div>
        <main className="flex-1 flex flex-col gap-1 sm:items-center w-full pt-14 lg:ml-64 lg:mr-64 transition-all duration-300">
          <CreatePost onPost={handleNewPost} />
          <Posts newPosts={localPosts} />
        </main>
        <div className="hidden lg:block bg-[#f0f4f8] border-r border-[#e0e7ef] h-screen fixed right-15 top-0 z-20 w-70 pt-16">
         
          <LeftAside />
        </div>
      </div>
    </div>
  );
}