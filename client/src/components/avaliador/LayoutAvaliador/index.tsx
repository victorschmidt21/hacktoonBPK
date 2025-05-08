import { Outlet } from "react-router-dom";
import HeaderAvaliador from "../headerAvaliador";

export function LayoutAvaliador() {
  return (
    <>
      <HeaderAvaliador />
      <Outlet />
    </>
  );
}
