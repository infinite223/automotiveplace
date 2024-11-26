"use client";

import React, { FC, useState } from "react";
import { TTagCreate } from "@/app/utils/types/tag";
import { v4 as uuidv4 } from "uuid";

interface IAMPTagsView {
  edit?: boolean;
  addTag?: (value: TTagCreate) => void;
  removeTag?: (id: string) => void;
  tags: TTagCreate[];
  projectId?: string;
  carItemId?: string;
}

export const AMPTagsView: FC<IAMPTagsView> = ({
  edit = false,
  addTag,
  removeTag,
  tags,
  carItemId,
  projectId,
}) => {
  const [newTag, setNewTag] = useState<string>("");

  if (!carItemId && !projectId && edit) return;

  const handleAddTag = () => {
    // call to api to find tag name

    if (newTag.trim() !== "") {
      const tag: TTagCreate = {
        localId: uuidv4(),
        name: newTag,
        carItemId,
        projectId,
        authorId: "",
      };
      addTag && addTag(tag);
      setNewTag("");
    }
  };

  const handleRemoveTag = (id: string) => {
    removeTag && removeTag(id);
  };

  return (
    <div className="shadow-md">
      <div className="flex flex-wrap mb-1">
        {tags.map((tag, id) => (
          <div
            key={id}
            className="flex items-center bg-amp-800 dark:bg-amp-100 rounded-sm text-[11px] px-3 py-1 gap-1"
          >
            <span>#{tag.name}</span>
            {edit && (
              <button
                onClick={() => handleRemoveTag(tag.localId)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
      {edit && (
        <div className="flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-l-lg"
            placeholder="Add a new tag"
          />
          <button
            onClick={handleAddTag}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};
