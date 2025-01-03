import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation/formValidation";
import BGImg from "../assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signup_token } from "../api/endPoints";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [role, setRole] = useState("User");
  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(<FaEyeSlash />); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const userRole = data.role === "User" ? "NU" : "WC";
    try {
      const { username, email, password, phone } = data;
      const response = await signup_token(
        username,
        email,
        password,
        userRole,
        phone
      );

      if (response.status === 200) {
        toast("Successfully signed up!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setIcon(<FaEye />); 
    } else {
      setPasswordType("password");
      setIcon(<FaEyeSlash />); 
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="h-full w-full sm:h-[80%] sm:w-[80%] grid sm:grid-cols-2"
        style={{ boxShadow: "20px 20px 20px #DEDEDE" }}
      >
        <div className="bg-zinc-50">
          <h1 className="text-5xl font-samarkan font-bold text-center mt-4">
            <span className="font-extrabold text-green-700">Fohor</span>
            <span>Malai</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex-1 mt-3 p-10"
          >
            <div className="mx-auto max-w-md flex flex-col gap-4">
              <input
                className="w-full px-5 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                {...register("username")}
              />
              <p className="text-red-600 text-md font-semibold">
                {errors.username && errors.username.message}
              </p>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                {...register("email")}
              />
              <p className="text-red-600 text-md font-semibold">
                {errors.email?.message}
              </p>

              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                type="phone"
                placeholder="Phone number"
                name="phone"
                id="phone"
                {...register("phone")}
              />
              <p className="text-red-600 text-md font-semibold">
                {errors.phone?.message}
              </p>

              <div className="relative">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                  type={passwordType} 
                  placeholder="Password"
                  name="password"
                  id="password"
                  {...register("password")}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {icon} {/* Display the icon */}
                </span>
              </div>
              <p className="text-red-600 text-md font-semibold">
                {errors.password?.message}
              </p>

              <div className="relative">
                <select
                  className="signup-input w-full border"
                  {...register("role")}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Collector</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="mt-2 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">Sign Up</span>
                </button>
              </div>
              <div className=" flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  id="checkbox"
                  {...register("Agreed")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor="checkbox" className="text-gray-600">
                  I agree to the{" "}
                  <span className="text-blue-600">Terms and Conditions</span>
                </label>
              </div>
              <p className="text-red-600 text-md font-semibold">
                {errors.Agreed?.message}
              </p>
            </div>
          </form>
        </div>

        <div className="bg-zinc-50  ">
          <img
            style={{
              objectFit: "fill",
              width: "80%",
              height: "80%",
              marginTop: "2%",
            }}
            src={BGImg}
            alt="Beach"
            className="h-52 w-full rounded-md"
          />

          <p className="mt-6 text-lg text-gray-600 text-center">
            Already a member?{" "}
            <Link to="/login">
              <span className=" text-md underline text-blue-900 font-semibold">
                login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
