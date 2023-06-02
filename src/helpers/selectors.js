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