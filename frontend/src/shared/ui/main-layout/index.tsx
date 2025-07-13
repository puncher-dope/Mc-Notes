import { ConfigProvider, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { HeaderLayout } from "../header-layout";

export const MainLayout = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "#247595",
            headerColor: "white",
            headerHeight: '50px',
          },
        },
      }}
    >
      <Layout>
        <HeaderLayout />

        <Layout.Content style={{
          height: "calc(100vh - 50px)",
          overflow: "auto" 
        }}>
          <Outlet />
        </Layout.Content>
      
      </Layout>

    </ConfigProvider>
  );
};
