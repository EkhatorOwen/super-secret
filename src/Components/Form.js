import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
const { Option } = Select;

function FormComponent({
  vehicleTypes,
  setSelectedVehicleType,
  vehicleMakes,
  setSelectedVehicleMake,
  setUseYear,
  useYear,
  setModelYear,
  submitButtonDisabled,
  handleSearch,
  loading,
  form,
}) {
  const handleVechicleTypeChange = (value) => {
    setSelectedVehicleType(value);
  };
  const hadleVehicleMakeChange = (value) => {
    setSelectedVehicleMake(value);
  };

  const handleCheckBoxChange = (e) => {
    form.setFieldsValue({ year: "" });
    setUseYear(e.target.checked);
  };

  const handleYearChange = (e) => {
    setModelYear(e.target.value);
  };
  const handleSubmit = () => {
    handleSearch();
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
      >
        <Form.Item
          label="Vehicle Type"
          name="vehicleType"
          validateTrigger="onChange"
          rules={[
            {
              required: true,
              message: "Please input vehicle type!",
            },
          ]}
        >
          <Select
            placeholder="Select vehicle type"
            onChange={handleVechicleTypeChange}
            allowClear
          >
            {vehicleTypes.map((elem, index) => {
              return (
                <Option key={index} value={elem}>
                  {elem}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          validateTrigger="onChange"
          label="Vehicle Makes"
          name="vehicleMakes"
          rules={[
            {
              required: true,
              message: "Please enter vehicle make!",
            },
          ]}
        >
          <Select
            placeholder="Select vehicle make"
            onChange={hadleVehicleMakeChange}
            allowClear
            mode="multiple"
            style={{ width: "100%" }}
          >
            {vehicleMakes.map((elem, index) => {
              return (
                <Option key={index} value={elem.MakeId}>
                  {elem.MakeName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="useYear" valuePropName="checked" label="Use Year?">
          <Checkbox onChange={handleCheckBoxChange} />
        </Form.Item>
        {useYear && (
          <Form.Item
            label="year"
            name="year"
            validateTrigger="onChange"
            rules={[
              {
                required: true,
                message: "Please input a valid year",
              },
              {
                validator: (_, value) => {
                  if (/[a-zA-Z]/.test(value) === false && value.length === 4) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject();
                  }
                },
                message:
                  "This field can only contain numbers and length must be four(4) characters",
              },
            ]}
          >
            <Input
              maxLength={4}
              minLength={4}
              //type="number"
              allowClear
              onChange={handleYearChange}
              showCount
            />
          </Form.Item>
        )}
        <div style={{ display: "flex" }}>
          <Button
            disabled={submitButtonDisabled}
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>{" "}
          {loading && <p>searching...</p>}
        </div>
      </Form>
    </div>
  );
}

export default FormComponent;
