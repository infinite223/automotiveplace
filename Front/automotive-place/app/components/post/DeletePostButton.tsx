"use client";

import React, { FC } from "react";

interface DeletePostButtonProps {
  postId: string;
}

const DeletePostButton: FC<DeletePostButtonProps> = ({ postId }) => {
  async function handleClick(postId: string) {
    try {
      await fetch(`/api/post/${postId}`, { method: "DELETE" });
    } catch (error) {
      console.error(error);
    }
  }

  return <button onClick={() => handleClick(postId)}>Delete</button>;
};

export default DeletePostButton;
