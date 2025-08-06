"use client";

import { useState } from "react";
import { api } from "@/app/providers";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    created_at: string;
    profiles?: {
      full_name: string | null;
      email: string;
    };
  };
  onUpdate?: () => void;
  canEdit?: boolean;
}

export function PostCard({ post, onUpdate, canEdit }: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content || "");

  const updateMutation = api.post.update.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      onUpdate?.();
    },
  });

  const deleteMutation = api.post.delete.useMutation({
    onSuccess: () => {
      onUpdate?.();
    },
  });

  const togglePublishMutation = api.post.togglePublish.useMutation({
    onSuccess: () => {
      onUpdate?.();
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      id: post.id,
      title,
      content,
    });
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-2">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">
              {post.profiles
                ? `By ${post.profiles.full_name || post.profiles.email}`
                : ""}
            </p>
          </div>

          {post.content && <p className="text-gray-700 mb-3">{post.content}</p>}

          <div className="flex items-center justify-between">
            <span
              className={`text-sm px-2 py-1 rounded ${
                post.published
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>

            {canEdit && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePublishMutation.mutate({ id: post.id })}
                  className="text-purple-500 hover:underline text-sm"
                >
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure?")) {
                      deleteMutation.mutate({ id: post.id });
                    }
                  }}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
