import { Button, Layout } from "antd";
import { request } from "shared/utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "app/provider";
import { LOGOUT } from "shared/api/constants";
import style from "./index.module.css";
import { Logo } from "../logo";

export const HeaderLayout = () => {
  const { router, setRouter } = useMyContext();
  const navigate = useNavigate();

  const onLogout = () => {
    request(LOGOUT, "POST");
    Cookies.remove("token", {
      path: "/",
      domain:
        window.location.hostname === "localhost"
          ? undefined
          : window.location.hostname,
    });
    localStorage.removeItem("isAuth");
    setRouter(false);
    navigate("/auth", { replace: true });
  };

  return (
    <Layout.Header>
      <div className={style.header}>
        <Logo width={190} height={45} />
        {router && (
          <Button className={style.logoutBtn} onClick={onLogout}>
            Out
          </Button>
        )}
      </div>
    </Layout.Header>
  );
};
