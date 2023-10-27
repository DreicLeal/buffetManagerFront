"use client";
import React from "react";
import { FoodProvider } from "@/contexts/foodContext";
import { UserProvider } from "@/contexts/userContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <FoodProvider>{children}</FoodProvider>;
    </UserProvider>
  );
};