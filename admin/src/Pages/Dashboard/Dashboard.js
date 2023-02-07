import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Routes from "../../Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const { Header, Sider } = Layout;

const Dashboard = () => {
  const { user, setUser, setAdmin, admin } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    window.matchMedia("(max-width: 800px)").matches && setCollapsed(true);
  }, []);

  if (!user) return navigate("/login");

  return (
    <Layout style={{ minHeight: "100vh" }} className="Dashboard">
      <Sider trigger={null} collapsible collapsed={collapsed} className="aside">
        <div
          style={{
            height: 32,
            margin: 16,
            fontSize: "2rem",
            color: "gainsboro",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          {!collapsed && "Hola!"}{" "}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              key: "/",
              icon: <HomeOutlined style={{ fontSize: "20px" }} />,
              label: "Dashboard",
            },
            admin && {
              key: "/settings",
              icon: <SettingOutlined style={{ fontSize: "20px" }} />,
              label: "Settings",
            },
            admin && {
              key: "/users",
              icon: <UserOutlined style={{ fontSize: "20px" }} />,
              label: "Users",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex align-center justify-between"
          style={{
            padding: "0px 20px",
            fontSize: "1.4rem",
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: `trigger ${
                window.matchMedia("(max-width: 425px)").matches && !collapsed
                  ? "ml-aside"
                  : ""
              }`,
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Button
            type="primary"
            className="px-5"
            size={
              window.matchMedia("(max-width: 500px)").matches
                ? "middle"
                : "large"
            }
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              setAdmin(false);
              navigate("/login");
            }}
            danger
          >
            Logout
          </Button>
        </Header>
        <Content
          className="rounded"
          style={{
            margin: "24px 16px",
            padding: 20,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
