import "server-only";
import { PostHog } from "posthog-node";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (!key) throw new Error("Missing NEXT_PUBLIC_POSTHOG_KEY");

const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export const posthogServer = new PostHog(key, { host });

export async function captureAndFlush(
  payload: Parameters<typeof posthogServer.capture>[0],
  maxWaitMs = 120
) {
  posthogServer.capture(payload);

  const phAny = posthogServer as unknown as {
    flush?: () => void;
    flushAsync?: () => Promise<void>;
    shutdown?: () => Promise<void>;
  };

  const flushPromise =
    phAny.flushAsync?.() ??
    phAny.shutdown?.() ??
    (phAny.flush ? Promise.resolve(phAny.flush()) : Promise.resolve());

  await Promise.race([
    flushPromise,
    new Promise((res) => setTimeout(res, maxWaitMs)),
  ]);
}
