import React, { useState, useEffect } from "react";

import Axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  useEffect(() => {
  Promise.all([
    Axios.get('/api/days'),
    Axios.get('/api/appointments'),
    Axios.get('api/interviewers')
  ]).then((all) => {
    setState(prev => ({
      ...prev, 
      days: all[0].data, 
      appointments: all[1].data,
      interviewers: all[2].data
    }));
  });
},[]);

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

const setDay = day => setState({ ...state, day });

const dailyAppointments = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

function bookInterview(id, interview) {
  // this will create {interview: ....} object which will nest student and interviewer
  // had a problem with the PUT function it was pushing {student:, interviewer:} instead of {interview: student:, interviewer}
  const updatedInterview = {interview: {...interview}};

  const appointment = {
    ...state.appointments[id],
    ...updatedInterview
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  // should this be on .then , when I try, the page reloads and we don't want that
  setState({
    ...state,
    appointments});

    Axios.put(`/api/appointments/${id}`, updatedInterview)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
    console.error('Error:', error);
  });

}

function cancelInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  }

  const appointments = {
    ...state.appointments,
    [id]: appointment
  }

  setState({
    ...state,
    appointments
  })

      Axios.delete(`/api/appointments/${id}`, interview)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
      console.error('Error:', error);
    });
}

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment 
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            />
          )
        }) }
        <Appointment key="last" time="5pm" bookInterview={bookInterview} cancelInterview={cancelInterview} />
      </section>
    </main>
  );
}
