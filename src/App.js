import React, { Component } from "react";
import moment from "moment";
import { findIndex } from "lodash";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "antd/dist/antd.css";
import "./App.css";
import { Spin, Tag, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { default as AddNewSchedule } from "./components/AddNewSchedule";
import { default as EditSchedule } from "./components/EditSchedule";

const localizer = momentLocalizer(moment);
const { CheckableTag } = Tag;

const employeeTagsData = ["Employee #1720", "Employee #1755", "Employee #1775"];
const clientData = {
  "Employee #1720": ["KH"],
  "Employee #1755": ["SL", "RM"],
  "Employee #1775": ["JC", "SC"]
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [],
      loading: true,
      selectedTags: employeeTagsData,
      resourceMap: [
        { resourceId: "Employee #1720", resourceTitle: "Employee #1720" },
        { resourceId: "Employee #1755", resourceTitle: "Employee #1755" },
        { resourceId: "Employee #1775", resourceTitle: "Employee #1775" }
      ],
      employee: [],
      visible: false,
      editScheduleModalVisible: false,
      lastScheduleIndex: 450,
      record: [],
      resourceId: null,
      dates: []
    };
  }

  eventPropGetter = (event) => {
    let newStyle = {
      color: "black",
      borderRadius: "8px"
    };

    if (event.client === "JC") {
      newStyle.backgroundColor = "#fd3153";
    } else if (event.client === "SC") {
      newStyle.backgroundColor = "#1ccb9e";
    } else if (event.client === "KH") {
      newStyle.backgroundColor = "#F480A8";
    } else if (event.client === "SL") {
      newStyle.backgroundColor = "#fda256";
    } else if (event.client === "RM") {
      newStyle.backgroundColor = "#8281fd";
    }

    return {
      className: "",
      style: newStyle
    };
  };

  onCancel = () => {
    this.setState({
      visible: false,
      editScheduleModalVisible: false,
      record: [],
      resourceId: null,
      dates: []
    });
  };

  handleHouseChange = (value) => {
    this.setState({ employee: clientData[value] });
  };

  handleChange = (tag, checked) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    const nextResourceMap = [];
    nextSelectedTags.map((item) => {
      nextResourceMap.push({ resourceId: item, resourceTitle: item });
      return item;
    });

    this.setState({
      selectedTags: nextSelectedTags,
      resourceMap: nextResourceMap
    });
  };

  addNewSchedule = () => {
    this.setState({ visible: true });
  };

  addSchedule = (newSchedule) => {
    let tempSchedules = this.state.schedule;

    let newTempSchedule = {
      ...newSchedule,
      title: newSchedule.lastName + ", " + newSchedule.firstName,
      start: moment(newSchedule.dates[0]).toDate(),
      end: moment(newSchedule.dates[1]).toDate(),
      scheduleId: this.state.lastScheduleIndex
    };

    tempSchedules.unshift(newTempSchedule);
    this.setState({
      schedule: tempSchedules,
      lastScheduleIndex: this.state.lastScheduleIndex + 1,
      visible: false
    });
  };

  updateSchedule = (scheduleId, values) => {
    let tempSchedules = this.state.schedule;
    let scheduleIndex = findIndex(this.state.schedule, {
      scheduleId: scheduleId
    });

    tempSchedules[scheduleIndex] = {
      ...tempSchedules[scheduleIndex],
      lastName: values.lastName,
      firstName: values.firstName,
      title: values.lastName + ", " + values.firstName,
      resourceId: values.resourceId,
      client: values.client,
      start: moment(values.dates[0]).toDate(),
      end: moment(values.dates[1]).toDate(),
      notes: values.notes
    };

    this.setState({
      schedule: tempSchedules,
      editScheduleModalVisible: false,
      record: [],
      resourceId: null,
      dates: []
    });
  };

  editSchedule = (record) => {
    this.setState({
      editScheduleModalVisible: true,
      record: record,
      resourceId: record.resourceId,
      dates: [moment(record.start), moment(record.end)]
    });
  };

  componentDidMount() {
    fetch("./data-EmployeeSchedule.json")
      .then((response) => response.json())
      .then((result) => {
        result.forEach((element) => {
          element.start = moment(element.start).toDate();
          element.end = moment(element.end).toDate();
        });
        this.setState({ schedule: result, loading: false });
      });
  }

  render() {
    const { selectedTags, resourceMap } = this.state;

    return (
      <>
        <div align="center">
          <p>
            <span style={{ marginRight: 8 }}>Employees:</span>
            {employeeTagsData.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
            <span style={{ float: "right" }}>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={this.addNewSchedule}
              />
            </span>
          </p>

          <p>
            <span style={{ marginRight: 8 }}>Clients:</span>
            <span
              className={
                "client " +
                (selectedTags.includes("Employee #1720") ? "" : "display")
              }
            >
              <Tag color="#F480A8">1720 - KH</Tag>
            </span>
            <span
              className={
                "client " +
                (selectedTags.includes("Employee #1755") ? "" : "display")
              }
            >
              <Tag color="#fda256">1755 - SL</Tag>
              <Tag color="#8281fd">1755 - RM</Tag>
            </span>
            <span
              className={
                "client " +
                (selectedTags.includes("Employee #1775") ? "" : "display")
              }
            >
              <Tag color="#fd3153">1775 - JC</Tag>
              <Tag color="#1ccb9e">1775 - SC</Tag>
            </span>
          </p>
        </div>

        <Divider />

        <Spin spinning={this.state.loading} tip="Loading...">
          <Calendar
            selectable
            resizable
            defaultDate={moment().toDate()}
            defaultView="week"
            views={["month", "week", "day"]}
            showMultiDayTimes
            events={this.state.schedule}
            localizer={localizer}
            style={{ height: "100vh" }}
            eventPropGetter={this.eventPropGetter}
            resources={resourceMap}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
            onSelectEvent={(record) => this.editSchedule(record)}
          />
        </Spin>

        <AddNewSchedule
          {...this.state}
          onCancel={this.onCancel}
          handleHouseChange={this.handleHouseChange}
          employeeTagsData={employeeTagsData}
          addSchedule={this.addSchedule}
        />

        <EditSchedule
          {...this.state}
          onCancel={this.onCancel}
          handleHouseChange={this.handleHouseChange}
          employeeTagsData={employeeTagsData}
          updateSchedule={this.updateSchedule}
        />
      </>
    );
  }
}

export default App;
