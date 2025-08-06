"use client";

import { useState } from "react";
import { api } from "@/app/providers";
import { CreatePostForm } from "@/components/posts/create-post-form";
import { PostCard } from "@/components/posts/post-card";

export default function DashboardPage() {
  const { data: session } = api.auth.getSession.useQuery();
  const { data: profile } = api.profile.get.useQuery(undefined, {
    enabled: !!session,
  });
  const { data: myPosts, refetch: refetchPosts } = api.post.getMyPosts.useQuery(
    { limit: 20 },
    { enabled: !!session }
  );

  const signOutMutation = api.auth.signOut.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  if (!session) {
    return (
      <div className="container mx-auto p-8">
        <p>Please sign in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {profile?.full_name || session.email}!
          </p>
        </div>
        <button
          onClick={() => signOutMutation.mutate()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
          <CreatePostForm onSuccess={() => refetchPosts()} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
          <div className="space-y-4">
            {myPosts?.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={() => refetchPosts()}
                canEdit={true}
              />
            ))}
            {myPosts?.length === 0 && (
              <p className="text-gray-500">
                No posts yet. Create your first post!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
