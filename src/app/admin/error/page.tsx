import { Suspense } from "react";
import AuthErrorClient from "./AuthErrorClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading error...</p>}>
      <AuthErrorClient />
    </Suspense>
  );
}
