/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { FaUser } from "react-icons/fa";
import { useModal } from "../hooks/use-modal";

export const UserBox = ({ name, userId }) => {
  const { onOpen } = useModal();

  const onClick = useCallback(() => {
    onOpen({ name, userId });
  }, [onOpen, name, userId]);

  return (
    <div className="flex justify-between items-center w-full mt-4">
      <div className="flex items-center space-x-4">
        <FaUser className="h-8 w-8 bg-neutral-300 rounded-2xl p-2 text-white" />
        <p className="text-xl font-semibold">{name}</p>
      </div>
      <button
        onClick={onClick}
        className="p-2 px-4 bg-black text-white rounded-lg"
      >
        Send Money
      </button>
    </div>
  );
};
