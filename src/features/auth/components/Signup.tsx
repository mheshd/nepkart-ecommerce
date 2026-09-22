import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import React, { useState } from "react";
import Logo from "../../../components/layout/Logo";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SignUpProps {
  onSwitchToLogin?: () => void;
}

const SignUp = ({ onSwitchToLogin }: SignUpProps) => {
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const emailRegex =
      /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    const newErrors: typeof errors = {};

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and symbol";
    }

    return newErrors;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    const { error } = await signUp(formData.email.trim(), formData.password);
    setSubmitting(false);

    if (error) {
      setErrors({ form: error });
      return;
    }

    setSignedUpEmail(formData.email.trim());
  };

  if (signedUpEmail) {
    return (
      <div className="flex items-center justify-center px-4 py-8 text-center">
        <div className="w-full max-w-md">
          <Logo />
          <p className="mt-4 font-body text-gray-700">
            We sent a confirmation link to <strong>{signedUpEmail}</strong>.
            Click it to activate your account, then log in.
          </p>
          <Button
            type="button"
            onClick={() => onSwitchToLogin?.()}
            className="mt-4 w-full py-1 bg-[#F85606] font-semibold hover:bg-[#FF6A1A]"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="   flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md bg-white rounded-2xl  px-4 py-4 ">
        {/* Brand */}
        <div className=" flex flex-col items-center mb-2">
          <Logo />
          <p className=" font-body text-gray-500">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* sr only for input currenlty rely on current placeholder or for sceen reader */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="placeholder:text-gray-500"
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className=" relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="placeholder:text-gray-500"
              />

              <button
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
                className=" absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer "
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {errors.password && (
              <p
                id="email-password"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {errors.password}
              </p>
            )}
          </div>

          {errors.form && (
            <p role="alert" className="text-sm text-red-500 text-center">
              {errors.form}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full py-1  bg-[#F85606]  font-semibold  hover:bg-[#FF6A1A]"
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-3 text-center text-sm text-gray-500">
          Already have an account?{" "}
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold  text-indigo-600 hover:text-indigo-700"
            >
              Login
            </button>
          ) : (
            <Link
              to="/login"
              className="font-semibold  text-indigo-600 hover:text-indigo-700"
            >
              Login
            </Link>
          )}
        </p>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="px-4 text-sm text-gray-400">Or, sign up with</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className=" flex items-center justify-center gap-8">
          <button
            onClick={() => signInWithGoogle()}
            className=" flex items-center gap-2 text-gray-500 cursor-pointer font-body"
          >
            <FcGoogle size={22} />
            Google
          </button>

          <button
            onClick={() => signInWithFacebook()}
            className=" flex items-center gap-2 text-gray-500 cursor-pointer font-body   "
          >
            <FaFacebook size={22} className="text-blue-600" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
