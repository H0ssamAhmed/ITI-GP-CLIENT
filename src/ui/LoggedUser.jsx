import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout } from "../services/currentUser";
import { FaWallet } from "react-icons/fa";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"; // Import useDispatch
import {
  clearUserRole,
  logout as logoutAction,
} from "../features/auth/slices/authSlice.js"; // Adjust the import path as necessary

const LoggedUser = ({ role }) => {
  const dispatch = useDispatch(); // Create a dispatch function
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const handleLogout = async () => {
    try {
      await logout(); // Assuming logout() clears cookies and does not return anything

      // Dispatch actions to clear user data in Redux
      dispatch(logoutAction());
      dispatch(clearUserRole());

      // Show a success message
      toast.success("تم تسجيل الخروج بنجاح");

      navigate("/login");
      // Navigate to the login page
    } catch (error) {
      toast.error(error.message || "An error occurred during logout.");
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-2 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Avatar
          alt={user?.data.name}
          src={user?.data.picture}
          onClick={handleClick}
          className="cursor-pointer"
        />
        <span className="text-lg text-white font-semibold font-cairo">
          مرحبًا, {user?.data.firstName || "الزائر"}
        </span>
      </div>

      <Link to="/wallet">
        <div className="flex items-center gap-2 p-3 bg-yellow-400 rounded-full cursor-pointer transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg hover:scale-105">
          <FaWallet className="text-2xl" />
          <span className="text-lg font-semibold font-cairo">
            {user?.walletBalance ? `${user.walletBalance} EGP` : "المحفظة"}
          </span>
        </div>
      </Link>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="z-50"
        PaperProps={{
          sx: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
          },
        }}
      >
        <Link to={`/dashboard/${role}`}>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              fontSize: "16px",
              gap: "8px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            <MdOutlineDashboard className="text-[20px]" />
            لوحة التحكم
          </MenuItem>
        </Link>

        <Link to="/ProfileDetails">
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              fontSize: "16px",
              gap: "8px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            <CgProfile className="text-[20px]" />
            الصفحة الشخصية
          </MenuItem>
        </Link>
        <MenuItem
          onClick={handleLogout}
          sx={{
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            fontSize: "16px",
            gap: "8px",
            fontWeight: "bold",
            fontFamily: "Cairo, sans-serif",
          }}
        >
          <CiLogout className="text-[20px]" />
          تسجيل الخروج
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LoggedUser;
