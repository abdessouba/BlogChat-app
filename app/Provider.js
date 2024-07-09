"use client";
import { SessionProvider } from "next-auth/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { authUserApi } from "./api/_store/apiSlice";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import SocketServerContext from "./context/SocketServerContext.js";

export const AuthProvider = ({ children }) => {
  const store = configureStore({
    reducer: {
      user: userSlice,
    },
  });//<Provider store={store}></Provider>

  return (
    <SessionProvider>
      <SocketServerContext>
        {children}
      </SocketServerContext>
    </SessionProvider>
  );
};
