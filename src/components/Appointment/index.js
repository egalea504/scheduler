import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

async function save(name, interviewer) {

  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);

  await new Promise(resolve => {
    props.bookInterview(props.id, interview);
    resolve();
  })
  
transition(SHOW); 
}

async function deleteInterview() {
  const interview = null;

  transition(DELETE);

  await new Promise(resolve => {
    props.cancelInterview(props.id, interview);
    resolve();
  })
  transition(EMPTY);
}

const edit = () => {

  transition(EDIT);
}

   return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && ( <Show interview={props.interview} student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={edit}/> )}
      {mode === CREATE && ( <Form interviewers={props.interviewers} onCancel={() => back(SHOW)} onSave={save} />)}
      {mode === SAVING && < Status message=""/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={() => back(SHOW)} onSave={deleteInterview} />}
      {mode === DELETE && < Status message="Deleting" />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer} interviewers={props.interviewers} onCancel={() => back(SHOW)} onSave={save} />}
    </article>
   )
}

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment key='unique-appointment-key' />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => <Show 
  key='unique-show-key'
  student="Lydia Miller-Jones" 
  interviewer={
      { id: 1, 
      name: "Sylvia Palmer", 
      avatar: "https://i.imgur.com/LpaY82x.png"}} 
   onEdit={action("onEdit")} 
   onDelete={action("onDelete")} />)
   .add("Confirm", () => <Confirm message="Delete the appointment?" onConfirm={action("onConfirm")} onCancel={action("onCancel")} />)
   .add("Status", () => <Status message="Deleting" />)
   .add("Error", () => <Error message="Could not delete appointment." onClose={action("onClose")} />)
   .add("Edit", () => <Form 
   key='unique-add-key'
   student="Eliza Galea" 
   interviewer={4} 
   interviewers={[
      { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
      { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
      { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    ]} 
   onSave={action("onSave")} 
   onCancel={action("onCancel")} />)
   .add("Create", () => <Form 
   key='unique-create-key'
   interviewers={[
      { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
      { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
      { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    ]} 
    onSave={action("onSave")} 
    onCancel={action("onCancel")} />)

