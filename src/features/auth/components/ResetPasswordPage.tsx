import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../../../components/layout/Logo";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Eye, EyeClosed } from "lucide-react";

const ResetPasswordPage = () => {
  const { user, loading, updatePassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and symbol",
      );
      return;
    }

    setError(null);
    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);

    if (error) {
      setError(error);
      return;
    }

    setDone(true);
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex items-center justify-center px-4 py-24 text-center">
        <div className="w-full max-w-md">
          <Logo />
          <p className="mt-4 font-body text-gray-700">
            This password reset link is invalid or has expired.
          </p>
          <Button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="mt-4 w-full py-1 bg-[#F85606] font-semibold hover:bg-[#FF6A1A]"
          >
            Request a new link
          </Button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex items-center justify-center px-4 py-24 text-center">
        <div className="w-full max-w-md">
          <Logo />
          <p className="mt-4 font-body text-gray-700">
            Your password has been updated.
          </p>
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full py-1 bg-[#F85606] font-semibold hover:bg-[#FF6A1A]"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md bg-white rounded-2xl px-4 py-4">
        <div className="flex flex-col items-center mb-4">
          <Logo />
          <p className="font-body text-gray-500 mt-2">Set a new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="password" className="sr-only">
              New password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "password-error" : undefined}
                className="placeholder:text-gray-500"
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {error && (
              <p
                id="password-error"
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
            {submitting ? "Updating..." : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
