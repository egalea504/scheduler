import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { container, debug } = render(<Application />);

  // select container and what you are looking for
  await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // click on add to add an appointment
    fireEvent.click(getByAltText(appointment,"Add"));

    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // console.log(prettyDOM(appointment));
    // debug(prettyDOM(appointment));

    // check if SAVING mode - in my case the status has an alt of "Loading" - test passes
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // wait until the student name appears
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // console.log(prettyDOM(day));

    // find spots info in day
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // find Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    // 3. Click the "Delete button on the first booked appointment. "Archie Cohen"
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(queryByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm button"
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" is displayed.
     await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    const { container, debug } = render(<Application />);

    // select container and what you are looking for
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // find Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    // 3. Click the "Edit button on the first booked appointment. Lydia booked above
    fireEvent.click(getByAltText(appointment, "Edit"));
    // change the value of student name
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Jones Doe" }
    });
    // change the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //trigger save and expect the mode to be saving
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // wait until new student name shows up
    await waitForElement(() => queryByText(appointment, "Jones Doe"));
    // check spots remaining which should still be 1 for Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug();
  });

  /* test number five */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    // same as book function but we check for "error" after saving state
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // click on add to add an appointment
    fireEvent.click(getByAltText(appointment,"Add"));

    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // check if SAVING mode - test doesn't pass after
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // check for error
    await waitForElement(() => getByText(appointment,"Error"));
  
  });

  /* test number six */
  it("shows the save error when failing to cancel an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // find Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    // 3. Click the "Delete button on the first booked appointment. "Archie Cohen"
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(queryByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm button"
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // look for error
    await waitForElement(() => getByText(appointment, "Error"));

  });
});
