import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteConfirm: () => void;
}

const DeleteEmployeeDialog = ({ isOpen, onClose, onDeleteConfirm }: IProps) => (
  <Dialog open={isOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
      </DialogHeader>

      <DialogDescription>
        Are you sure you want to delete this employee?
      </DialogDescription>

      <DialogFooter>
        <button
          onClick={() => {
            onDeleteConfirm();
            onClose();
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
        <button onClick={onClose}>Cancel</button>
      </DialogFooter>
    </DialogContent>

    <DialogClose onClick={onClose} />
  </Dialog>
);

export default DeleteEmployeeDialog;
