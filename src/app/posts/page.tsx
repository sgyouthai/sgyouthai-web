"use client";

import { api } from "@/app/providers";
import { PostCard } from "@/components/posts/post-card";

export default function PostsPage() {
  const { data: posts } = api.post.getAll.useQuery({
    limit: 20,
    onlyPublished: true,
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Public Posts</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {posts?.length === 0 && (
          <p className="text-gray-500">No published posts yet.</p>
        )}
      </div>
    </div>
  );
}
