import React from "react";

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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => 
      // console.log("ERROR!!", error));
      transition(ERROR_SAVE, true));
}

function deleteInterview() {

  transition(DELETE, true);

    props
    .cancelInterview(props.id)
    .then(() => {
    transition(EMPTY);
  })
    .catch(error => {
      transition(ERROR_DELETE, true);
    });
}

const edit = () => {

  transition(EDIT);
}

   return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && ( <Show interview={props.interview} student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={edit}/> )}
      {mode === CREATE && ( <Form interviewers={props.interviewers} onCancel={() => back(SHOW)} onSave={save} />)}
      {mode === SAVING && < Status message="Saving"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={() => back(SHOW)} onSave={deleteInterview} />}
      {mode === DELETE && < Status message="Deleting" />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => back(SHOW)} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="There was an issue with booking your appointment." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment." onClose={back} />}
    </article>
   )
}

