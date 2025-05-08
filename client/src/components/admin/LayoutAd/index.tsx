import { Outlet } from "react-router-dom";
import HeaderAd from "../headerAd";

export function LayoutAd() {
  return (
    <>
      <HeaderAd />
      <Outlet />
    </>
  );
}
