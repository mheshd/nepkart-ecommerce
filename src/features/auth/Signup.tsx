import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../components/layout/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    <div className=" min-h-17.5  flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-4 py-4 ">
        {/* Brand */}
        <div className=" flex flex-col items-center mb-2">
          <Logo />
          <p className=" font-body text-gray-500">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* sr only for input currenlty rely on current placeholder or for sceen reader */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="confirm  password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="placeholder:text-gray-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full  bg-[#F85606] py-2 font-semibold  hover:bg-[#FF6A1A]"
          >
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-3 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Login
          </Link>
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
