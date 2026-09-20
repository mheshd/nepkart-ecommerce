import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import React, { useState } from "react";
import Logo from "../../../components/layout/Logo";
import { Eye, EyeClosed } from "lucide-react";

interface SignUpProps {
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
}

const SignUp = ({ onSwitchToLogin, onSuccess }: SignUpProps) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

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
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    const newErrors: typeof errors = {};

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and symbol";
    }

    return newErrors;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSuccess?.();
  };

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
            <label htmlFor="phone" className="sr-only">
              Phone number
            </label>
            <div className="flex">
              <div className="flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                +977
              </div>

              <Input
                id="phone"
                type="tel"
                required
                placeholder="9812345678"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-l-none"
              />
            </div>
            {errors.phone && (
              <p
                id="email-phone"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {errors.phone}
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

          <Button
            type="submit"
            className="w-full py-1  bg-[#F85606]  font-semibold  hover:bg-[#FF6A1A]"
          >
            Sign Up
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
          <button className=" flex items-center gap-2 text-gray-500 cursor-pointer font-body">
            <FcGoogle size={22} />
            Google
          </button>

          <button className=" flex items-center gap-2 text-gray-500 cursor-pointer font-body   ">
            <FaFacebook size={22} className="text-blue-600" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
