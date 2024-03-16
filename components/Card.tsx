"use client";
import useApi from "@/hooks/useApi";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

const Card = ({ comment }: Record<string, any>) => {
  const { data: session } = useSession();
  const [reply, setReply] = React.useState("");
  const handleReply = async () => {
    try {
      const response = await axios.post(`/api/reply/${comment.id}`, {
        body: reply,
        user_id: session?.user?.id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: replies = [] } = useApi(`/api/reply/${comment.id}`);
  return (
    <div>
      <h1>{comment?.body}</h1>
      <h1>{comment?.user?.username}</h1>
      <p>{comment?.createdAt}</p>
      <input onChange={(e) => setReply(e.target.value)} />
      <button onClick={handleReply}>Reply</button>

      {replies.map((reply: any) => (
        <div key={reply.id}>
          <h1>{reply?.body}</h1>
          <h1>{reply?.user?.username}</h1>
          <p>{reply?.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
