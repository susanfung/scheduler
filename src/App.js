import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.css';
import { Spin, Tag, Divider } from 'antd';

const localizer = momentLocalizer(moment);
const Scheduler = withDragAndDrop(Calendar);
const { CheckableTag } = Tag;

const employeeTagsData = ['Employee #1775', 'Employee #1720', 'Employee #1755'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [],
      loading: true,
      selectedTags: employeeTagsData,
      lastIndex: 0
    }
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextselectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextselectedTags });
  }

  componentDidMount() {
    fetch('./data-EmployeeSchedule.json')
      .then(response => response.json())
      .then(result => {
        const schedule = result.map(item => {
          item.scheduleId = this.state.lastIndex;
          item.title = item.employeeLastName + ", " + item.employeeFirstName;
          item.start = moment(item.shift[0]).toDate();
          item.end = moment(item.shift[1]).toDate();
          this.setState({ lastIndex: this.state.lastIndex + 1});
          return item;
        })

        this.setState({ schedule: schedule, loading: false })
      })
  };

  render() {
    const resourceMap = [
      { resourceId: "1775", resourceTitle: 'Employee #1775' },
      { resourceId: "1720", resourceTitle: 'Employee #1720' },
      { resourceId: "1755", resourceTitle: 'Employee #1755' },
    ]

    const { selectedTags } = this.state;

    return (
      <>
        <div align="center">
          <p>
            <span style={{ marginRight: 8 }}>Employees:</span>
            {employeeTagsData.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </p>

          <p>
            <span style={{ marginRight: 8 }}>Clients:</span>
            <Tag color="#fd3153">1775 - JC</Tag>
            <Tag color="#1ccb9e">1775 - SC</Tag>
            <Tag color="#F480A8">1720 - KH</Tag>
            <Tag color="#fda256">1755 - SL</Tag>
            <Tag color="#8281fd">1755 - RM</Tag>
          </p>
        </div>

        <Divider />
        
        <Spin spinning={this.state.loading} tip="Loading...">
          <Scheduler
            defaultDate={moment().toDate()}
            defaultView="week"
            views={['month', 'week', 'day']}
            showMultiDayTimes
            events={this.state.schedule}
            localizer={localizer}
            resizable
            style={{ height: "100vh" }}
            eventPropGetter={event => {
              let newStyle = {
                color: "black",
                borderRadius: "8px",
              };
        
              if (event.client === "JC"){
                newStyle.backgroundColor = "#fd3153"
              } else if (event.client === "SC"){
                newStyle.backgroundColor = "#1ccb9e"
              } else if (event.client === "KH"){
                newStyle.backgroundColor = "#F480A8"
              } else if (event.client === "SL"){
                newStyle.backgroundColor = "#fda256"
              } else if (event.client === "RM"){
                newStyle.backgroundColor = "#8281fd"
              }
        
              return {
                className: "",
                style: newStyle
              };
            }}
            resources={resourceMap}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
          />
        </Spin>
      </>
    );
  }
}

export default App;