export function getAppointmentsForDay(state, day) {
  let appointments = [];

  // loop through state days to find the day
  for (let i=0; i < state.days.length; i++) {

    if (state.days[i].name === day) {
      let appointmentsIds = state.days[i].appointments;

      // loop through appointments array to select all appointment objects from state.appointments
      for (let j=0; j < appointmentsIds.length; j++) {

          let appointmentId = appointmentsIds[j];

          appointments.push(state.appointments[appointmentId]);

      }
    }
  }

  return appointments;
}

export function getInterview(state, interview) {
  const interviewers = state.interviewers;

  for (const key in interviewers) {

    if (!interview) {
      return null;
    }
    
    if (Number(key) === interview.interviewer) {
     interview.interviewer = interviewers[key];
    }
  }

  return interview;
}

export function getInterviewersForDay(state, day) {
  let interviewers = [];

  const selectedDay = state.days.find((d) => d.name === day)

  if (!selectedDay) {
    return interviewers;
  }
//map to find interviwerID and return interview linked
interviewers = selectedDay.interviewers
  .map((interviewerId) => state.interviewers[interviewerId])

  return interviewers;
}