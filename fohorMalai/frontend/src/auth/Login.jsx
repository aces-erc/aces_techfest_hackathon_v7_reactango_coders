// <<<<<<< HEAD
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/formValidation"; // Import the schema
import { Link } from "react-router-dom";

// const Login = () => {
//   // Destructuring the register function from the resolver object
// =======
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { loginSchema } from "../validation/formValidation";
// import { Link } from "react-router-dom";
import BGImg from "../assets/signup.jpg";

const Login = () => {

  const [role, setRole] = useState("User");
// >>>>>>> 9892400231d18c7e7cf11a8e165c76515d7f2fab
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
// <<<<<<< HEAD
    resolver: yupResolver(loginSchema), // Apply yupResolver here with the loginSchema
  });

  // Submission handler for login
//   const onSubmit = (data) => {
//     console.log("Form Submitted:", data);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left Section: Login Form */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-1/2 bg-gray-100 flex items-center justify-center"
//       >
//         <div className="space-y-6 w-80">
//           {/* Logo (you can replace with actual logo) */}
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               {...register("username")}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             {/* Display error for username */}
//             {errors.username && (
//               <div className="text-red-500">{errors.username.message}</div>
//             )}
//           </div>
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password")}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//             {/* Display error for password */}
//             {errors.password && (
//               <div className="text-red-500">{errors.password.message}</div>
//             )}
//           </div>
//           <button className="w-full bg-blue-500 text-white py-2 rounded-md">
//             Log In
//           </button>
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <label>
//               <input type="checkbox" className="mr-2" /> Remember me
//             </label>
//             <Link to="#" className="hover:text-blue-600">
//               Forgot Your Password?
//             </Link>
//           </div>
//         </div>
//       </form>

//       {/* Right Section: Promotional Content */}
//       <div className="w-1/2 bg-purple-600 text-white flex flex-col justify-center items-start p-10 space-y-6">
//         <h1 className="text-4xl font-semibold">
//           Humans with agents, driving success together.
//         </h1>
//         <p className="text-lg">
//           Boost productivity with AI agents that assist in everyday tasks and
//           take action. Seamlessly transfer from proactive AI agents to humans.
//           Even build custom agents with low-code and natural language tools.
//         </p>
//         <div className="flex space-x-4">
//           <button className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700">
//             Discover Agentforce
//           </button>
//           <button className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700">
//             Calculate Your ROI
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// =======
//     resolver: yupResolver(
//       loginSchema
//     )
//   });

  const onSubmit = async (data) => {
console.log(data);

}

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-full w-full sm:h-[80%] sm:w-[80%] grid sm:grid-cols-2'
        style={{ boxShadow: "20px 20px 20px #DEDEDE" }}>

        <div className='bg-zinc-50 pt-20'>
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
                type="password"
                placeholder="Password"
                name="password"
                id="password"
        
                {...register("password")}
              />
              <p className='text-red-600 text-md font-semibold'>{errors.password?.message}</p>
              <div className="">
              <span className="text-blue-900 ml-1 font-semibold">Forgot Password?</span>
              <button className="mt-2 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span className="ml-3">Login</span>
              </button>
              </div>

            </div>
          </form>
        </div>


        <div className='bg-zinc-50  '>

          <img
            style={{ objectFit: "fill", width: "80%", height: "80%", marginTop: "2%" }}
            src={BGImg}
            alt="Beach"
            className="h-52 w-full rounded-md"
          />


        </div>
      </div>

    </div>
  )
}

export default Login 
// >>>>>>> 9892400231d18c7e7cf11a8e165c76515d7f2fab
