import React from "react";
import { default as ScheduleForm } from "./Schedule-Form";
import { Modal, Form } from "antd";

const AddNewSchedule = ({
  visible,
  record,
  onCancel,
  handleHouseChange,
  addSchedule,
  employee,
  employeeTagsData,
  resourceId,
  dates
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add New Schedule"
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
            console.log("Validate Failed:", info);
          });
      }}
    >
      <ScheduleForm
        form={form}
        record={record}
        handleHouseChange={handleHouseChange}
        employee={employee}
        employeeTagsData={employeeTagsData}
        resourceId={resourceId}
        dates={dates}
      />
    </Modal>
  );
};

export default AddNewSchedule;
