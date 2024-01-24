import { FaUser } from "react-icons/fa";
import { Input } from "./input";
import { UserBox } from "./userbox";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/use-debounce";

export const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [users, setUsers] = useState([]);
  const debouncedFilterValue = useDebounce(filterValue);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    let username = localStorage.getItem("username");

    setUsername(`${firstName} ${lastName}`);

    const getAccountBalance = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setBalance(res.data.balance);
    };

    const getUsers = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?username=${username}&filter=${debouncedFilterValue}`
      );
      setUsers(res.data.users);
    };
    getAccountBalance();
    getUsers();
  }, [navigate, debouncedFilterValue]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userId");

    navigate("/signin");
  }, [navigate]);

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <nav className="w-full flex items-center justify-between border-b p-4">
        <div>
          <h1 className="text-2xl font-semibold">Payments App</h1>
        </div>
        <div className="flex space-x-2 items-center">
          <p>Hello, {username}</p>
          <FaUser className="h-8 w-8 bg-neutral-300 rounded-2xl p-2 text-white" />
          <button
            onClick={logout}
            className="text-white p-2 rounded-lg bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex flex-col justify-center items-start p-4 space-y-4 w-full">
        <h2 className="font-bold">Your Balance ${balance}</h2>
        <p className="text-xl font-bold">Users</p>
        <Input
          type="text"
          placeholder="Search users..."
          onChange={(value) => setFilterValue(value)}
        />
        <div className="w-full">
          {users.map((user) => (
            <UserBox
              key={user._id}
              name={`${user.firstName} ${user.lastName}`}
              userId={user._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
