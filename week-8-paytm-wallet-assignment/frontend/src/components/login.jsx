import { Link, useNavigate } from "react-router-dom";
import { Input } from "./input";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      localStorage.setItem("userId", user._id);
      toast.success("Logged In!");
      navigate("/");
    },
    [email, password, navigate]
  );

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-100">
      <div className="flex flex-col justify-center bg-white px-8 py-4 rounded-lg">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center items-center space-y-4 mb-4">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-neutral-500">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Input
              label="Email"
              placeholder="johndoe@example.com"
              type="email"
              onChange={(value) => setEmail(value)}
            />
            <Input
              label="Password"
              placeholder="******"
              type="password"
              onChange={(value) => setPassword(value)}
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-4">
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-black text-white"
            >
              Sign In
            </button>
            <p className="mt-4">
              Don&apos;t have an account?{" "}
              <Link className="underline" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
