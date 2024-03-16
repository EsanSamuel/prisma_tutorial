"use client";
import AuthProvider from "@/components/AuthProvider";
import useUsers from "@/hooks/useUsers";
import React from "react";
import { useSession } from "next-auth/react";
import useApi from "@/hooks/useApi";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import { useRouter } from "next/navigation";

type userProps = {
  id: string;
  username: string;
  image: string;
  email: string;
  createdAt: string;
};

type postProps = {
  id: string;
  body: string;
  createdAt: string;
  user: {
    username: string;
  };
};

const page = () => {
  const [body, setBody] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const { data: session } = useSession();
  const { data: users = [] } = useUsers();
  const { data: posts = [] } = usePosts();
  const { data: user } = useApi(`/api/users/${session?.user?.id}`);
  const router = useRouter();

  const createPost = React.useCallback(async () => {
    try {
      const response = await axios.post("/api/posts", {
        body,
        user_id: session?.user?.id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [body, session?.user?.id]);

  const updateUser = React.useCallback(async () => {
    try {
      const response = await axios.patch(`/api/users/${session?.user?.id}`, {
        bio,
        username,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [bio, username]);

  React.useEffect(() => {
    setUsername(user?.username);
    setBio(user?.bio);
  }, [user]);

  return (
    <div>
      <AuthProvider />
      <h1>Logged in user: {user?.username}</h1>
      <h1>Logged in user bio: {user?.bio}</h1>
      <div>
        <h1>Edit User</h1>
        <input
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          placeholder="Enter Bio"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Enter Username"
        />
        <button onClick={updateUser}>Edit profile</button>
      </div>

      {users.map((user: userProps) => (
        <div key={user.id} className="border p-2 border-neutral-800">
          <h1>{user.username}</h1>
          <h1>{user.email}</h1>
          <p>{user.createdAt}</p>
        </div>
      ))}

      <h1>Create Post</h1>
      <input
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter post"
      />
      <button onClick={createPost}>post</button>

      {posts.map((post: postProps) => {
        const navigateToPost = () => {
          router.push(`/post?postId=${post.id}`);
        };
        return (
          <div
            key={post.id}
            className="border p-2 border-neutral-800"
            onClick={navigateToPost}
          >
            <h1>{post.body}</h1>
            <h1>{post?.user?.username}</h1>
            <p>{post?.createdAt}</p>
          </div>
        );
      })}
    </div>
  );
};

export default page;
