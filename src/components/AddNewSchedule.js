import React from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select
} from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AddNewSchedule = ({ visible, onCancel, handleHouseChange, addSchedule, employee, employeeTagsData }) => {
  const [form] = Form.useForm();

  const handleFormValuesChange = (changedValues) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === "resourceId") {
      handleHouseChange(changedValues.resourceId);
      form.setFieldsValue({client: undefined})
    }
  };
  
  return (
    <Modal
      visible={visible}
      title={<div>Add New Schedule</div>}
      width={1000}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            addSchedule(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} onValuesChange={handleFormValuesChange}>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "This information is required." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "This information is required." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="resourceId"
          label="Employee #"
          rules={[{ required: true, message: "This information is required." }]}
        >
          <Select>
            {employeeTagsData.map(employee => (
              <Option key={employee}>{employee}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="client"
          label="Client"
          rules={[{ required: true, message: "This information is required." }]}
        >
          <Select>
            {employee.map(client => (
              <Option key={client}>{client}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="dates"
          label="Shift"
          rules={[{ required: true, message: "This information is required." }]}
        >
          <RangePicker showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewSchedule;