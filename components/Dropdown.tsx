import { motion } from "framer-motion";
import React from "react";

export const Dropdown = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, type: "tween" } }}
      exit={{ opacity: 0, transition: { duration: 0.2, type: "tween" } }}
      className={className}
    >
      {children}
    </motion.ul>
  );
};
export const DropdownItem = ({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) => {
  return (
    <li
      className={
        "flex items-center px-2 py-1 justify-start gap-4 cursor-pointer " +
        className
      }
    >
      {icon}
      {children}
    </li>
  );
};
