"use client";

import { useRouter } from "next/navigation";
import { api } from "@/app/providers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/server/api/root";

interface DashboardClientProps {
  initialPosts: RouterOutputs["post"]["getAll"];
  user: NonNullable<RouterOutputs["auth"]["getSession"]>;
}

export function DashboardClient({ initialPosts, user }: DashboardClientProps) {
  const router = useRouter();

  // Use the query with initial data from server
  const { data: posts } = api.post.getAll.useQuery(
    { limit: 10 },
    { initialData: initialPosts }
  );

  const signOutMutation = api.auth.signOut.useMutation({
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <Button onClick={() => signOutMutation.mutate()} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                By {post.profiles?.full_name || post.profiles?.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {post.content || "No content"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
