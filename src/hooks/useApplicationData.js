import Axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData(initial) {

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
  setState({
    ...state,
    appointments});

    return Axios.put(`/api/appointments/${id}`, updatedInterview)
    .then(response => {
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
    appointments
  })
  console.log("something");
      return Axios.delete(`/api/appointments/${id}`, interview)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
      console.error('Error:', error);
    });
}

return {state, setDay, bookInterview, cancelInterview};
}