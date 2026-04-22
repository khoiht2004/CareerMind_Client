import { clearUser } from "@/store/slice/authSlice";
import { apiSlice } from "@/store/slice/apiSlice";
import { toast } from "sonner";
import { path } from "@/config/path";

function handleLogout(dispatch, navigate) {
      dispatch(clearUser());
      dispatch(apiSlice.util.resetApiState());
      toast.success("Đã đăng xuất");
      navigate(path.login);
};

export default handleLogout;

