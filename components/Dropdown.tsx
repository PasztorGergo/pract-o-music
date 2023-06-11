import { motion } from "framer-motion";
import React from "react";

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, type: "tween" } }}
      exit={{ opacity: 0, transition: { duration: 0.2, type: "tween" } }}
      className="absolute lg:top-0 lg:-right-48 top-full right-0 w-fit h-fit flex flex-col bg-brand-light rounded-lg"
    >
      {children}
    </motion.ul>
  );
};
export const DropdownItem = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <li className="flex items-center px-2 py-1 justify-start gap-4 cursor-pointer">
      {icon}
      {children}
    </li>
  );
};
