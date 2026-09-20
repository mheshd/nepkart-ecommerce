import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../components/layout/Logo";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface LoginProps {
  onSwitchToSignup?: () => void;
  onSuccess?: () => void;
}

const Login = ({ onSwitchToSignup, onSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

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
    const phoneRegex = /^(97|98)\d{8}$/;

    const newErrors: typeof errors = {};
    const identifier = formData.identifier.trim();

    if (!identifier) {
      newErrors.identifier = "Please enter your email or phone number.";
    } else if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      newErrors.identifier = "Enter a valid email or phone number.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log(formData);
    onSuccess?.();
  };

  return (
    <div className="  flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md bg-white rounded-2xl  px-4 py-4">
        {/* Brand */}
        <div className=" flex flex-col items-center mb-6">
          <Logo />
          <p className=" font-body text-gray-500 mt-2">Welcome back!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="identifier" className="sr-only">
              Email or phone number
            </label>
            <Input
              id="identifier"
              type="text"
              placeholder="Enter email or phone number"
              value={formData.identifier}
              onChange={handleChange}
              aria-invalid={!!errors.identifier}
              aria-describedby={
                errors.identifier ? "identifier-error" : undefined
              }
              className="placeholder:text-gray-500"
            />
            {errors.identifier && (
              <p
                id="identifier-error"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {errors.identifier}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                id="password-error"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {errors.password}
              </p>
            )}
          </div>

          <div className=" flex items-center justify-end">
            <Link
              onClick={onSuccess}
              to="/forgot-password"
              className="text-sm font-medium font-body text-gray-600 hover:text-indigo-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-1  bg-[#F85606]  font-semibold  hover:bg-[#FF6A1A]"
          >
            Login
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          {onSwitchToSignup ? (
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign Up
            </button>
          ) : (
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign Up
            </Link>
          )}
        </p>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="px-4 text-sm text-gray-400">Or, login with</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="flex items-center justify-center gap-8">
          <button className="   flex items-center gap-2 text-gray-500 cursor-pointer font-body">
            <FcGoogle size={22} />
            Google
          </button>

          <button className="  flex items-center gap-2 text-gray-500 cursor-pointer font-body">
            <FaFacebook size={22} className="text-blue-600" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
