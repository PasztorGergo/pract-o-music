"use client";
import { motion } from "framer-motion";
import React, { Ref } from "react";

export const Modal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      exit={{ scale: 0, transition: { duration: 0.3, type: "tween" } }}
      animate={{ scale: 1, transition: { duration: 0.3, type: "tween" } }}
      className={`${className} rounded-lg absolute place-self-center`}
    >
      {children}
    </motion.div>
  );
};
