"use client";
import { FoodProvider } from "@/contexts/foodContext";
import { UserProvider } from "@/contexts/userContext";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <FoodProvider>{children}</FoodProvider>;
    </UserProvider>
  );
};
