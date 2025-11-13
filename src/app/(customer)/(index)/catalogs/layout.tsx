"use client";

import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface layoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default layout;
