import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {

   return (
    <article className="appointment"></article>
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
   onDelete={action("onDelete")} />);

