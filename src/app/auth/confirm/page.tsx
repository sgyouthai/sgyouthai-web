export default function ConfirmPage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
      <p className="text-gray-600">
        We've sent you a confirmation email. Please click the link in the email
        to confirm your account.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Didn't receive an email? Check your spam folder or try signing up again.
      </p>
    </div>
  );
}
