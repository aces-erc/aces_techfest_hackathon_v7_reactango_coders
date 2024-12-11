import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/formValidation"; // Import the schema
import { Link } from "react-router-dom";

const Login = () => {
  // Destructuring the register function from the resolver object
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema), // Apply yupResolver here with the loginSchema
  });

  // Submission handler for login
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 bg-gray-100 flex items-center justify-center"
      >
        <div className="space-y-6 w-80">
          {/* Logo (you can replace with actual logo) */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {/* Display error for username */}
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {/* Display error for password */}
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Log In
          </button>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <label>
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="#" className="hover:text-blue-600">
              Forgot Your Password?
            </Link>
          </div>
        </div>
      </form>

      {/* Right Section: Promotional Content */}
      <div className="w-1/2 bg-purple-600 text-white flex flex-col justify-center items-start p-10 space-y-6">
        <h1 className="text-4xl font-semibold">
          Humans with agents, driving success together.
        </h1>
        <p className="text-lg">
          Boost productivity with AI agents that assist in everyday tasks and
          take action. Seamlessly transfer from proactive AI agents to humans.
          Even build custom agents with low-code and natural language tools.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700">
            Discover Agentforce
          </button>
          <button className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700">
            Calculate Your ROI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
