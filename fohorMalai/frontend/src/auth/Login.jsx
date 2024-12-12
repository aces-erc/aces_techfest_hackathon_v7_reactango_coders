import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/formValidation"; // Import the schema
import { getUserByUsername, login_token } from "../api/endPoints";
import BGImg from "../assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Login = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login_token(data.username, data.password);
      if (response.status === 200) {
        toast.success("Login Successful", { autoClose: 1000 });
        await getUserByUsername(data.username);
        navigate(`/home/${data.username}`);
      }
    } catch (error) {
      toast("Invalid credential", {
        position: "top-right",
        autoClose: 12000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div
        className="h-full w-full sm:h-[80%] sm:w-[80%] grid sm:grid-cols-2"
        style={{ boxShadow: "20px 20px 20px #DEDEDE" }}
      >
        <div className="bg-zinc-50 pt-20">
          <h1 className="text-5xl font-samarkan font-bold text-center mt-8">
            <span className="font-extrabold text-green-700">Fohor</span>
            <span>Malai</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex-1 mt-8 p-10"
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
                {errors.username?.message}
              </p>

              <div className="relative">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-blue-100"
                  type={type}
                  placeholder="Password"
                  name="password"
                  id="password"
                  {...register("password")}
                />
                <span
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleToggle}
                >
                  <Icon icon={icon} size={20} />
                </span>
              </div>

              <p className="text-red-600 text-md font-semibold">
                {errors.password?.message}
              </p>

              <div>
                <span className="text-blue-900 ml-1 font-semibold">
                  Forgot Password?
                </span>
                <button className="mt-2 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">Login</span>
                </button>

                <p className="mt-6 text-lg text-gray-600 text-center">
                  Don't have an account yet?{" "}
                  <Link to="/signup">
                    <span className="text-md underline text-blue-900 font-semibold">
                      signup
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-zinc-50">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
