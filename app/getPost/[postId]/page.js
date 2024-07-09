"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import share from "../../../public/images/share.png";
import comment from "../../../public/images/coment.png";
import Comment from "@/app/components/Comment";
import Like from "@/app/components/Like";
import Follow from "@/app/components/Follow";
import AnimationWrapper from "@/app/AnimationWrapper";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "../../components/page.css";
import JoditEditor from "jodit-react";
import "./page.css";
import Link from "next/link";

const Page = (props) => {
  const [postData, setPostData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showComment, setShowComment] = useState(false);

  const [publishDate, setPublishDate] = useState("");
  
  const [alreadyLikedPost, setAlreadyLikedPost] = useState(false);
  const [isFollower, setIsFollower] = useState(false);


  useEffect(() => {
    const postId = props?.params.postId;
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/post/${postId}`);
        const {post: data, alreadyLiked, alreadyFollower} = res.data;
        setAlreadyLikedPost(alreadyLiked)
        setIsFollower(alreadyFollower)
        const date = new Date(data.createdAt)
        setPostData(data);
        setPublishDate(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`)
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    if(postId){
      fetch();
    }
  }, [props.params.postId]);

  // register new view
  useEffect(() => {
    axios.post("/api/views", { postId: props.params.postId }).catch((err) => {
      console.log(err);
    });
  }, []);


  return (
    <>
      {loading && (
        <div>
          <div role="status" className="text-center">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <AnimationWrapper>
          <div className="text-gray-800 w-[50%] max-xl:w-[90%] max-2xl:w-[70%] m-auto my-10">
            {postData && (
              <>
                  <Image
                    alt=""
                    src={`/storage/${postData.image}`}
                    width={1000}
                    height={600}
                    className="m-auto"
                  />
                  <h1 className="text-center font-bold max-sm:text-xl text-5xl max-xl:text-4xl first-letter:uppercase mt-3 leading-[60px] mx-2">
                    {postData.title}.
                  </h1>
                <p className="py-4 px-10 text-center bg-gray-100 my-5 rounded-md font-thin">
                  {postData.description}
                </p>
                <div className="my-7 px-2 flex items-center justify-between">
                  <Link href={"/users/"+postData.userId.username} className="flex gap-3">
                    <Image
                      alt=""
                      src={`/avatars/${postData.userId.avatar}`}
                      width={64}
                      height={64}
                      className="w-[64px] h-[64px] rounded-full border-gray-400"
                    />
                    <div className="mt-1">
                      <div>
                        <span>@</span>
                        <p className="inline first-letter:uppercase underline">
                          {postData.userId.name}
                        </p>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm">Member Since {new Date(postData.userId.createdAt).getUTCFullYear()}</p>
                    </div>
                  </Link>
                  <div className="text-sm text-gray-400 text-">
                    <span className="italic max-[800px]:hidden">Published on</span> {publishDate}
                  </div>
                </div>
                <hr />
                <div className="flex items-center justify-between my-3 px-4">
                  <div className="flex items-center gap-2">
                    <Like
                      likes={postData.like.length}
                      postId={postData._id}
                      alreadyLikedPost={alreadyLikedPost}
                      setAlreadyLikedPost={alreadyLikedPost}
                    />
                    <div className="flex items-center gap-1 ml-2">
                      <Image
                        onClick={() => setShowComment(true)}
                        alt=""
                        src={comment}
                        className="w-[32px] opacity-70 hover:bg-gray-200 hover:opacity-100 p-1 rounded-full cursor-pointer"
                      />
                      <p className="text-sm text-gray-600">
                        {postData.comments.length} <span className="max-sm:hidden">comments</span>
                      </p>
                    </div>
                    <Follow
                      follows={postData.userId.followers.length}
                      postId={postData._id}
                      isFollower={isFollower}
                    />
                  </div>
                  <div>
                    <Image
                      alt=""
                      src={share}
                      className="w-[24px] opacity-60 hover:opacity-100 transition cursor-pointer"
                    />
                  </div>
                </div>
                <hr />
                <JoditEditor
                  className="editor"
                  value={postData.content}
                  config={{
                    toolbar: false,
                    readonly: true,
                    statusbar: false,
                    className: "remove-border",
                  }}
                  tabIndex={1} // tabIndex of textarea
                />

                {showComment && (
                  <Comment
                    postId={postData._id}
                    setShowComment={setShowComment}
                  />
                )}
              </>
            )}
          </div>
        </AnimationWrapper>
      )}
    </>
  );
};

export default Page;
