// layouts/AuthLayout.js
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      {/* You can add a header, footer, or any other layout components for authentication here */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
