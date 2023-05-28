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

export default function Appointment(props) {

   return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show interview={props.interview} student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
   )
}

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => <Show 
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
   interviewers={[
      { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
      { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
      { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    ]} 
    onSave={action("onSave")} 
    onCancel={action("onCancel")} />)

