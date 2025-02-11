import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("https://bookstore-backend-o996.onrender.com/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="md:w-[600px] w-[400px]">
          <div className="modal-box dark:text-black">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* Close button for the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-black"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg dark:text-black">Signup</h3>
              
              {/* Name Field */}
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="md:w-80 px-3 py-1 border rounded-md outline-none w-[300px]"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Email Field */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="md:w-80 px-3 py-1 border rounded-md outline-none w-[300px]"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Password Field */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password" 
                  placeholder="Enter your password"
                  className="md:w-80 px-3 py-1 border rounded-md outline-none w-[300px]"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Signup Button and Login Prompt */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
                <p className="text-xl dark:text-black">
                  Have an account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() => document.getElementById("my_modal_3").showModal()}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Separate Login modal, not nested inside <p> */}
      <dialog id="my_modal_3">
        <Login />
      </dialog>
    </>
  );
}

export default Signup;