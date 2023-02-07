import { Input, Row, Tooltip, Typography } from "antd";
import React from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import useFetch from "../Hooks/useFetch";
import { SketchPicker } from "react-color";
import axios from "axios";

const Settings = () => {
  const { Title } = Typography;
  const { data, loading, reFetch } = useFetch(
    "http://localhost:8800/api/settings"
  );
  const [FieldToBeEdited, setFieldToBeEdited] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
    setEditData("");
  };

  const handleOk = async () => {
    await axios
      .put(
        `http://localhost:8800/api/settings/update/${data?.data[0]._id}`,
        {
          ...data.data[0],
          [FieldToBeEdited]: editData.color
            ? editData.color
            : editData[FieldToBeEdited],
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then(() => {
        setIsModalOpen(false);
        reFetch();
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeComplete = (color) => {
    setEditData({ color: color.hex });
  };

  if (loading) return "Loading";

  return (
    <div>
      <Row className="align-center me-3">
        <Title
          level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}
          className="mb-0 me-5 mt-1"
        >
          Colours:
        </Title>
        <Row className="mt-1">
          <Tooltip placement="topLeft" title="Click to update">
            <div
              onClick={() => {
                showModal();
                setFieldToBeEdited("themecolor");
              }}
              style={{
                background: data?.data[0].themecolor,
                borderRadius: "50%",
                height: 30,
                width: 30,
                cursor: "pointer",
              }}
            ></div>
          </Tooltip>
          <Tooltip placement="topLeft" title="Click to update">
            <div
              onClick={() => {
                showModal();
                setFieldToBeEdited("primarycolor");
              }}
              className="ms-2"
              style={{
                background: data?.data[0].primarycolor,
                borderRadius: "50%",
                height: 30,
                width: 30,
                cursor: "pointer",
              }}
            ></div>
          </Tooltip>
          <Tooltip placement="topLeft" title="Click to update">
            <div
              onClick={() => {
                showModal();
                setFieldToBeEdited("secondarycolor");
              }}
              className="ms-2"
              style={{
                background: data?.data[0].secondarycolor,
                height: 30,
                width: 30,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></div>
          </Tooltip>
        </Row>
      </Row>

      <Row className="align-center mt-5">
        <Title
          level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}
          className="mb-0 mt-3 me-5"
        >
          Logo:
        </Title>
        <Tooltip placement="topLeft" title="Click to update" className="mt-3">
          <img
            src={data?.data[0].logo}
            className="pointer"
            onClick={() => {
              showModal();
              setFieldToBeEdited("logo");
            }}
          />
        </Tooltip>
      </Row>

      <Row className="align-center mt-5">
        <Title
          level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}
          className="mb-0 mt-1 me-5"
        >
          Email:
        </Title>
        <Tooltip placement="topLeft" title="Click to update" className="mt-1">
          <Title
          level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}
            onClick={() => {
              showModal();
              setFieldToBeEdited("email");
            }}
            className="mb-0 pointer"
          >
            {data.data[0].email}
          </Title>
        </Tooltip>
      </Row>

      <Row className="align-center mt-5">
        <Title
          level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}
          className="mb-0 mt-1 me-5"
        >
          Contact Number:
        </Title>
        <Tooltip placement="topLeft" title="Click to update" className="mt-1">
          <Title
          level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}
            onClick={() => {
              showModal();
              setFieldToBeEdited("number");
            }}
            className="mb-0 pointer"
          >
            {data.data[0].number}
          </Title>
        </Tooltip>
      </Row>

      {/* MODAL TO EDIT SETTING */}
      <Modal
        title="Edit Settings"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {FieldToBeEdited.includes("color") && (
          <>
            <SketchPicker
              color={
                editData?.color
                  ? editData.color
                  : data?.data[0][FieldToBeEdited]
              }
              onChangeComplete={handleChangeComplete}
            />
          </>
        )}

        {FieldToBeEdited === "logo" && (
          <>
            <Input
              type={"text"}
              onChange={(e) =>
                setEditData({ [FieldToBeEdited]: e.target.value })
              }
            />
          </>
        )}

        {(FieldToBeEdited === "email" || FieldToBeEdited === "number") && (
          <>
            <Input
              type={FieldToBeEdited === "email" ? "email" : "text"}
              value={
                editData[FieldToBeEdited]
                  ? editData[FieldToBeEdited]
                  : data.data[0][FieldToBeEdited]
              }
              onChange={(e) =>
                setEditData({ [FieldToBeEdited]: e.target.value })
              }
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Settings;
