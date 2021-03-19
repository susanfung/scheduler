import React from 'react';
import { Modal } from 'antd';

const AddNewSchedule = ({ visible, onCancel }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
    >
      <div className="about">
        <div class="container">
          <div class="row align-items-center my-5">
            <div class="col-lg-5">
              <h1 class="font-weight-light">Add New Schedule</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewSchedule;