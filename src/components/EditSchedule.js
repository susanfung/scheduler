import React from "react";
import { default as ScheduleForm } from "./Schedule-Form";
import { Modal, Form } from "antd";

const EditSchedule = ({
  editScheduleModalVisible,
  record,
  onCancel,
  handleHouseChange,
  updateSchedule,
  employee,
  employeeTagsData,
  resourceId,
  dates
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={editScheduleModalVisible}
      title="Edit Schedule"
      width={1000}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            updateSchedule(record.scheduleId, values);
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

export default EditSchedule;
