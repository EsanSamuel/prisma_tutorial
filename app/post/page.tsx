"use client";
import useApi from "@/hooks/useApi";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import Card from "@/components/Card";

const page = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const { data: post } = useApi(`/api/posts/${postId}`);
  const [body, setBody] = React.useState("");
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    setBody(post?.body);
  }, [post]);

  const updatePost = React.useCallback(async () => {
    try {
      const response = await axios.patch(`/api/posts/${postId}`, {
        body,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [body]);

  const handleComment = React.useCallback(async () => {
    try {
      const response = await axios.post(`/api/comment/${postId}`, {
        body: comment,
        user_id: session?.user?.id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [comment, postId, session?.user?.id]);

  const { data: comments = [] } = useApi(`/api/comment/${postId}`);

  const { data: userPosts = [] } = useApi(
    `/api/user_posts/${session?.user?.id}`
  );

  return (
    <div>
      <h1>{post?.body}</h1>
      <h1>{post?.user?.username}</h1>
      <p>{post?.createdAt}</p>

      <input onChange={(e) => setBody(e.target.value)} value={body} />
      <button onClick={updatePost}>Edit</button>

      <h1>comments</h1>
      <input onChange={(e) => setComment(e.target.value)} value={comment} />
      <button onClick={handleComment}>Comment</button>

      {comments?.map((comment: any) => {
        return (
          <div key={comment.id} className="border p-2 border-neutral-800">
            <Card comment={comment} />
          </div>
        );
      })}
    </div>
  );
};

export default page;
