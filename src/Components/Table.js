import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Make ID",
    dataIndex: "Make_ID",
    key: "Make_ID",
  },
  {
    title: "Make Name",
    dataIndex: "Make_Name",
    key: "Make_Name",
  },
  {
    title: "Model ID",
    dataIndex: "Model_ID",
    key: "Model_ID",
  },
  {
    title: "Model Name",
    dataIndex: "Model_Name",
    key: "Model_Name",
  },
];
function FormTable({ tableData }) {
  return (
    <div>
      <Table dataSource={tableData} columns={columns} />
    </div>
  );
}

export default FormTable;
