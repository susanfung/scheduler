import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.css';
import { Spin } from 'antd';

const localizer = momentLocalizer(moment);
const Scheduler = withDragAndDrop(Calendar);

class App extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [],
      loading: true,
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

    return (
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
              color: 'black',
              borderRadius: "8px",
            };
      
            if (event.client === "JC"){
              newStyle.backgroundColor = "#FFA69E"
            } else if (event.client === "SC"){
              newStyle.backgroundColor = "#3C91E6"
            } else if (event.client === "KH"){
              newStyle.backgroundColor = "#B8F2E6"
            } else if (event.client === "SL"){
              newStyle.backgroundColor = "#592E83"
            } else if (event.client === "RM"){
              newStyle.backgroundColor = "#426A5A"
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
    );
  }
}

export default App;