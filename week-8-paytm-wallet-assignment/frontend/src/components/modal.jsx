import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";
import { useModal } from "../hooks/use-modal";
import { Input } from "./input";

const sleep = (delay) => new Promise((r) => setTimeout(r, delay || 2000));

export const Modal = () => {
  const { isOpen, onClose, data } = useModal();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { name, userId } = data;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const transferFund = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem("token");

        await sleep(3000);

        await axios.post(
          "http://localhost:3000/api/v1/account/transfer",
          {
            to: userId,
            amount,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        onClose();
        toast.success("Tranferred successfully!");
        await sleep(2000);
        window.location.reload();
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [amount, onClose, userId]
  );

  if (!isOpen) return null;

  return (
    <div className="absolute backdrop-blur-md flex justify-center items-center z-10 inset-0">
      <div className="relative py-6 px-10 w-1/3 flex flex-col justify-center bg-white space-y-10 border">
        {isLoading && (
          <div className="flex justify-center items-center">
            <BeatLoader />
          </div>
        )}
        {!isLoading && (
          <>
            <RxCross1
              onClick={handleClose}
              className="absolute top-4 right-4 cursor-pointer"
            />
            <h1 className="text-3xl font-bold text-center">Send Money</h1>
            <div className="flex flex-col">
              <div className="flex items-center">
                <FaUser className="h-10 w-10 mr-2 bg-red-500 text-white rounded-3xl p-2" />
                <p>{name}</p>
              </div>
              <form onSubmit={transferFund}>
                <Input
                  label="Amount in (Rs)"
                  type="number"
                  placeholder="Enter amount"
                  onChange={(value) => setAmount(Number(value))}
                />
                <button
                  className="w-full p-2 bg-red-400 text-white rounded-lg mt-4"
                  type="submit"
                >
                  Initiate Transfer
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
