import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../../../components/layout/Logo";
import { Link } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const ForgotPasswordPage = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex =
      /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

    const trimmed = email.trim();

    if (!emailRegex.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSubmitting(true);
    await requestPasswordReset(trimmed);
    setSubmitting(false);

    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex  items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="flex justify-center">
            <Logo />
          </div>

          <h1 className="mt-6 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
            Check your inbox
          </h1>

          <p className="mt-4 font-body text-sm leading-6 text-gray-600 sm:text-base">
            If an account exists for{" "}
            <strong className="font-semibold text-gray-900">
              {email.trim()}
            </strong>
            , we've sent a password reset link to your email address.
          </p>

          <Link
            to="/login"
            className="mt-4 inline-block font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md bg-white rounded-2xl px-4 py-4">
        <div className="flex flex-col items-center mb-4">
          <Logo />
          <p className="font-body text-gray-500 mt-2">Reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "email-error" : undefined}
              className="placeholder:text-gray-500"
            />
            {error && (
              <p
                id="email-error"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full py-1 bg-[#F85606] font-semibold hover:bg-[#FF6A1A] disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
