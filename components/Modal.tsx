"use client";
import { motion } from "framer-motion";
import React from "react";

export const Modal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 1, transition: { duration: 0.5, type: "tween" } }}
      animate={{ opacity: 1, transition: { duration: 0.5, type: "tween" } }}
      className="bg-black bg-opacity-25 w-full h-full fixed top-0 left-0 grid place-items-center backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0 }}
        exit={{ scale: 1, transition: { duration: 0.3, type: "tween" } }}
        animate={{ scale: 1, transition: { duration: 0.3, type: "tween" } }}
        className={`${className} rounded-lg`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
