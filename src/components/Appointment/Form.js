import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setStudent("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function save() {
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" >
      <input
        className="appointment__create-input text--semi-bold"
        name="studentName"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        onSubmit={event => event.preventDefault()}
      />
    </form>
    <InterviewerList
    interviewers={props.interviewers}
    value={interviewer}
    onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={save} >Save</Button>
    </section>
  </section>
</main>
  )
}