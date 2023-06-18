import Axios from "axios";
// import { getAppointmentsForDay } from "helpers/selectors";
import { useState, useEffect } from "react";

export default function useApplicationData(initial) {

useEffect(() => {
  Promise.all([
    Axios.get('/api/days'),
    Axios.get('/api/appointments'),
    Axios.get('/api/interviewers')
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

// console.log(state.appointments);

const setDay = day => setState({ ...state, day });

function spotsRemaining(clonedState) {

  const selectedDay = clonedState.days.find((d) => d.name === clonedState.day)

  // console.log(selectedDay);
  if (!selectedDay) {
    console.log("no day selected");
  } else {
    const bookedAppointments = Object.values(clonedState.appointments)
    .filter((appointment) => appointment.interview !== null)
    .filter((appointment) => selectedDay.appointments.includes(appointment.id));

  const spotsRemaining = 5 - bookedAppointments.length;
  console.log("this is spots remaining", spotsRemaining);

  const updatedDays = clonedState.days.map((day) => {
    if (day.id === selectedDay.id) {
      return { ...day, spots: spotsRemaining };
    }
    return day;
  });

  return updatedDays;
}
  }

async function bookInterview(id, interview) {
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
  

    console.log("setState in book is done", state);

    return Axios.put(`/api/appointments/${id}`, updatedInterview)
    .then(response => {
      const copyState = {...state, appointments: appointments};
      const updatedDays = spotsRemaining(copyState);
      setState({
        ...state,
        appointments,
        days: updatedDays});
      console.log(response);
    })
    .catch(error => console.log("Error:", error));
    
  }

async function cancelInterview(id, interview) {
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
    appointments});

      return Axios.delete(`/api/appointments/${id}`, interview)
      .then(response => {
        const copyState = {...state, appointments: appointments};
      const updatedDays = spotsRemaining(copyState);
      setState({
        ...state,
        appointments,
        days: updatedDays});
      console.log(response);
      })
      .catch(error => {
      console.error('Error:', error);
    });
}

return {state, setDay, bookInterview, cancelInterview};
}