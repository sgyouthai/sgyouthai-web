"use client";

import { api } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LinkInBioPage() {
  const { data: linkinbio } = api.linkinbio.getAll.useQuery({
    showHidden: false,
  });
  return (
    <div>
      <Button onClick={() => toast.info("TEST")}>TEST</Button>
      {linkinbio?.map((link) => {
        return link.title;
      })}
    </div>
  );
}
