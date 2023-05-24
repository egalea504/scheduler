import React from "react";

import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  let interviewerClass = classNames({
    "interviewers": true,
    "interviewers__item--selected" : props.selected
  });

  if (props.selected) {
  return (
  <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  {props.name}
  </li>
  ); } else { return (
  <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  </li>
)
}
}
