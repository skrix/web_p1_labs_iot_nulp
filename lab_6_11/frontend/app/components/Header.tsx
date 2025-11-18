import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCartItemCount } from "../store/cartSlice";
import {
  selectIsAuthenticated,
  selectCurrentUser,
  logout,
} from "../store/authSlice";
import { HeaderAuthenticated } from "./HeaderAuthenticated";
import { HeaderUnauthenticated } from "./HeaderUnauthenticated";

export function Header() {
  const cartItemCount = useAppSelector(selectCartItemCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  if (isAuthenticated) {
    return (
      <HeaderAuthenticated
        cartItemCount={cartItemCount}
        firstName={currentUser?.firstName || ""}
        onLogout={handleLogout}
      />
    );
  }

  return <HeaderUnauthenticated />;
}
