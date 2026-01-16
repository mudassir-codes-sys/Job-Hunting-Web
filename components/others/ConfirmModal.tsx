"use client";

import { Button } from "../ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#172931] rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-white text-left text-lg mb-1">
          {message || "Are you sure?"}
        </h2>
        <p className="text-sm text-center text-gray-300 mb-5">
          you can not undo this action
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full py-2 cursor-pointer bg-gray-600 rounded hover:bg-gray-700 text-white"
          >
            Cancel
          </button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-full py-2  cursor-pointer text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
