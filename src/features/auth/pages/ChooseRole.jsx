import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ChooseRole() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === "student") {
      navigate("/signup-student");
    } else if (role === "teacher") {
      navigate("/signup-teacher");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-brand-200 gap-10">
      <Menu>
        <MenuHandler>
          <Button className="w-[200px] h-[40px] text-3xl">تسجيل حساب ك </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem
            className="text-3xl"
            onClick={() => handleRoleSelection("student")}
          >
            طالب
          </MenuItem>
          <MenuItem
            className="text-3xl"
            onClick={() => handleRoleSelection("teacher")}
          >
            مدرس
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default ChooseRole;
