"use client";

import { useMemo, useState } from "react";
import { api } from "@/app/providers";

interface CreateShortLinkFormProps {
  onSuccess?: () => void;
}

export function CreateShortLinkForm({ onSuccess }: CreateShortLinkFormProps) {
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [overrideTitle, setOverrideTitle] = useState("");
  const [overrideDesc, setOverrideDesc] = useState("");
  const [overrideImage, setOverrideImage] = useState("");

  const [createdShortUrl, setCreatedShortUrl] = useState<string | null>(null);

  const createMutation = api.shortLinks.create.useMutation({
    onSuccess: (data) => {
      setCreatedShortUrl(data.shortUrl);
      setLongUrl("");
      setCustomCode("");
      setOverrideTitle("");
      setOverrideDesc("");
      setOverrideImage("");
      onSuccess?.();
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const canSubmit = useMemo(() => {
    if (!longUrl.trim()) return false;
    try {
      new URL(longUrl);
    } catch {
      return false;
    }
    return true;
  }, [longUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMutation.mutate({
      longUrl,
      code: customCode.trim() ? customCode.trim() : undefined,
      title: overrideTitle.trim() ? overrideTitle.trim() : undefined,
      description: overrideDesc.trim() ? overrideDesc.trim() : undefined,
      image: overrideImage.trim() ? overrideImage.trim() : undefined,
    });
  };

  const copy = async () => {
    if (!createdShortUrl) return;
    await navigator.clipboard.writeText(createdShortUrl);
    alert("Copied!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Long URL</label>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="https://..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Custom code (optional)
        </label>
        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. my-offer"
        />
        <p className="text-xs text-gray-500 mt-1">
          Allowed: letters, numbers, <code>-</code> and <code>_</code>.
        </p>
      </div>

      <details className="rounded border p-3">
        <summary className="cursor-pointer text-sm font-medium">
          Override preview (optional)
        </summary>
        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={overrideTitle}
              onChange={(e) => setOverrideTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="If blank, we'll scrape OG title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={overrideDesc}
              onChange={(e) => setOverrideDesc(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="If blank, we'll scrape OG description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              value={overrideImage}
              onChange={(e) => setOverrideImage(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="https://... (absolute URL)"
            />
          </div>
        </div>
      </details>

      <button
        type="submit"
        disabled={createMutation.isPending || !canSubmit}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {createMutation.isPending ? "Creating..." : "Create Short Link"}
      </button>

      {createdShortUrl && (
        <div className="rounded border p-3 space-y-2">
          <div className="text-sm font-medium">Created</div>
          <div className="break-all text-sm">{createdShortUrl}</div>
          <button
            type="button"
            onClick={copy}
            className="px-3 py-1 rounded border text-sm hover:bg-gray-50"
          >
            Copy
          </button>
        </div>
      )}
    </form>
  );
}
