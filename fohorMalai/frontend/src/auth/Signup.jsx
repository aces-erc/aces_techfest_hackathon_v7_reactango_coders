import React, { useState } from "react";
import bg from "../assets/bg.jpg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Sign-Up Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="bg-gray-700 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            Sign Up
          </h1>
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-300 font-medium"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500 w-4 h-4"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="ml-auto text-sm text-blue-500 font-semibold hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign-Up Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-sm mt-6 text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Image Container */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
    </div>
  );
};

export default SignUp;
