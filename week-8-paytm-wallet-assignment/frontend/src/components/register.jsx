import { Link, useNavigate } from "react-router-dom";
import { Input } from "./input";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: email,
        password,
        firstName,
        lastName,
      });

      toast.success("registered successfully!");
      navigate("/signin");
    },
    [email, password, firstName, lastName, navigate]
  );
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-100">
      <div className="flex flex-col justify-center bg-white px-8 py-4 rounded-lg">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center items-center space-y-4 mb-4">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-neutral-500">
              Enter your information to create an account
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Input
              label="First Name"
              placeholder="John"
              type="text"
              onChange={(value) => setFirstName(value)}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              type="text"
              onChange={(value) => setLastName(value)}
            />
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
              Sign Up
            </button>
            <p className="mt-4">
              Already have an account?{" "}
              <Link className="underline" to="/signin">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
