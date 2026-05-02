import { redirect } from "next/navigation";

export default function InspireSignupPage() {
  redirect(
    "https://docs.google.com/forms/d/1341gqGEOkzUVYZFHaaI0YWlzCq0o1BeeOzV5Whut-kM/edit?usp=drivesdk",
  );
}
