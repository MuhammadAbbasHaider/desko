import React from "react";
import useFetch from "../../Hooks/useFetch";
import { Table } from "antd";
import { Typography } from "antd";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const Users = () => {
  const { admin } = useAuthContext();
  const { data } = useFetch(
    "http://localhost:8800/api/auth/users",
    localStorage.getItem("token")
  );
  const { Title } = Typography;

  const columns = [
    {
      title: "SNO.#",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Member Since",
      dataIndex: "member_since",
      key: "member_since",
    },
  ];

  const dataSource = [
    ...data.map((elem, i) => {
      return {
        key: i + 1,
        sno: i + 1,
        email: elem.email,
        member_since: elem.member_since
      };
    }),
  ];

  if (!admin) return <Navigate to="/" />;

  return (
    <div>
      <Title level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}>
        All Registered Users
      </Title>
      <Table dataSource={dataSource} columns={columns} className="responsiveTable" />;
    </div>
  );
};

export default Users;
