import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../components/layout/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className=" min-h-17.5 flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-4 py-4">
        {/* Brand */}
        <div className=" flex flex-col items-center mb-6">
          <Logo />
          <p className=" font-body text-gray-500 mt-2">Welcome back!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="placeholder:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="placeholder:text-gray-500"
            />
          </div>

          <div className=" flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium font-body text-gray-600 hover:text-indigo-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full  bg-[#F85606] py-2 font-semibold  hover:bg-[#FF6A1A]"
          >
            Login
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign Up
          </Link>
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
