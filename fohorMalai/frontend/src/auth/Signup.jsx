<<<<<<< HEAD
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
=======
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation/formValidation";
import BGImg from "../assets/signup.jpg";

const Signup = () => {

  const [role, setRole] = useState("User");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      signUpSchema
    )
  });

  const onSubmit = async (data) => {
console.log(data);

}

 

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-full w-full sm:h-[80%] sm:w-[80%] grid sm:grid-cols-2'
        style={{ boxShadow: "20px 20px 20px #DEDEDE" }}>

        <div className='bg-zinc-50'>
          <h1 className='text-5xl font-samarkan font-bold text-center mt-8'>
            <span className="font-extrabold text-green-700">Fohor</span><span>Malai</span>
          </h1>
          <form
   
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex-1 mt-8 p-10">
            <div className="mx-auto max-w-md flex flex-col gap-4">
              <input
                className="w-full px-5 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                type="text"
                placeholder="Username"
                name="username"
                id="username"

                {...register("username")}
              />
              <p className='text-red-600 text-md font-semibold'>{errors.username?.message}</p>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
     
                {...register("email")}


        
              />
              <p className='text-red-600 text-md font-semibold'>{errors.email?.message}</p>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                type="password"
                placeholder="Password"
                name="password"
                id="password"
        
                {...register("password")}
              />
              <p className='text-red-600 text-md font-semibold'>{errors.password?.message}</p>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
        
                {...register("confirmPassword")}
              />
              <p className='text-red-600 text-md font-semibold'>{errors.confirmPassword?.message}</p>

              <div className="relative">
                <select
                  className="signup-input w-full border"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Collector</option>
                </select>
              </div>

              <button className="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span className="ml-3">Sign Up</span>
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="checkbox"
              {...register("Agreed")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="checkbox" className="text-gray-600">
              I agree to the <span className="text-blue-600">Terms and Conditions</span>
            </label>

          </div>
        </div>


        <div className='bg-zinc-50  '>

          <img
            style={{ objectFit: "fill", width: "80%", height: "80%", marginTop: "2%" }}
            src={BGImg}
            alt="Beach"
            className="h-52 w-full rounded-md"
          />

          <p className="mt-6 text-s text-gray-600 text-center">
            Already a member?{" "}
            <a href="/SignIn">
              <span className="text-blue-900 font-semibold">Sign in</span>
            </a>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Signup 
>>>>>>> 9892400231d18c7e7cf11a8e165c76515d7f2fab
