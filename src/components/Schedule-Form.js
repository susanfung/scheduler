import React from "react";
import { Form, Input, DatePicker, Select } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ScheduleForm = ({
  form,
  record,
  handleHouseChange,
  employee,
  employeeTagsData,
  resourceId,
  dates
}) => {
  const handleFormValuesChange = (changedValues) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === "resourceId") {
      handleHouseChange(changedValues.resourceId);
      form.setFieldsValue({ client: undefined });
    }
  };

  return (
    <Form form={form} onValuesChange={handleFormValuesChange}>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "This information is required." }]}
        initialValue={record.lastName}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "This information is required." }]}
        initialValue={record.firstName}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="resourceId"
        label="Employee #"
        rules={[{ required: true, message: "This information is required." }]}
        initialValue={resourceId}
      >
        <Select>
          {employeeTagsData.map((employee) => (
            <Option key={employee}>{employee}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="client"
        label="Client"
        rules={[{ required: true, message: "This information is required." }]}
        initialValue={record.client}
      >
        <Select>
          {employee.map((client) => (
            <Option key={client}>{client}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="dates"
        label="Time"
        rules={[{ required: true, message: "This information is required." }]}
        initialValue={dates}
      >
        <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
      </Form.Item>
    </Form>
  );
};

export default ScheduleForm;
