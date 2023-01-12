import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { getAllEventsAPI, postEventAPI, putEventApi } from "./http";
import moment from "moment";
import { toast } from "react-toastify";

const addEventFieldContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const inputFieldStyle = {
  width: "20rem",
  padding: "12px 20px",
  margin: "8px 0",
  boxSizing: "border-box" as "border-box",
  border: "solid 1px #ccc",
  borderRadius: "5px",
  fontSize: "14px",
};

const addEventButtonStyle = {
  width: "10rem",
  height: "3.5rem",
  backgroundColor: "#90EE90",
  border: "solid 1px transparent",
  borderRadius: "5px",
  fontSize: "14px",
  boxShadow: "1px 2px 9px #e7dbdd",
  cursor: "pointer",
};

const cancelButtonStyle = {
  width: "10rem",
  height: "3.5rem",
  backgroundColor: "#90EE90",
  border: "solid 1px transparent",
  borderRadius: "5px",
  fontSize: "14px",
  boxShadow: "1px 2px 9px #e7dbdd",
  cursor: "pointer",
};

const AddEventForm: FC<AddEventFormProps> = (props): JSX.Element => {
  const now = new Date();

  const [title, setTitle] = useState(props.title === null ? "" : props.title);
  const [eventDate, setEventDate] = useState(
    props.event_date === null
      ? `${now.getFullYear()}-${Number(now.getMonth()) + 1}-${now.getDate()}`
      : props.event_date
  );
  const [startTime, setStartTime] = useState(
    props.start_time === null
      ? new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : moment(props.start_time, "hh:mm A").format("HH:mm")
  );
  const [endTime, setEndTime] = useState(
    props.end_time === null
      ? new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : moment(props.end_time, "hh:mm A").format("HH:mm")
  );
  const [id, setId] = useState(props.id);

  const convertTime = (time: any) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  const addEventHandler = async () => {
    const payload = {
      title: title,
      event_date: eventDate,
      start_time: convertTime(startTime),
      end_time: convertTime(endTime),
    };

    await postEventAPI("events", payload).then(async (res) => {
      if (res.status === 200) {
        await getAllEventsAPI("events").then((res) => {
          if (res.status === 200) {
            props.setEvents(res.data);
            props.setIsOpen(false);
            toast.success("Added Event Succesfully!");
          }
        });
      } else {
        toast.error(
          res.data.data?.error === null
            ? "Something went wrong!"
            : res.data.data?.error
        );
      }
    });
  };

  const editEventHandler = async () => {
    const payload = {
      id: id,
      title: title,
      event_date: eventDate,
      start_time: convertTime(startTime),
      end_time: convertTime(endTime),
    };

    await putEventApi("events", payload).then(async (res) => {
      if (res.status === 200) {
        await getAllEventsAPI("events").then((res) => {
          if (res.status === 200) {
            props.setEvents(res.data);
            props.setIsOpen(false);
            toast.success("Edited Event Succesfully!");
          }
        });
      }
    });
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <div style={addEventFieldContainerStyle}>
          <h2>Title: </h2>
          <input
            style={inputFieldStyle}
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <div style={addEventFieldContainerStyle}>
          <h2>Event Date: </h2>
          <div>
            <DatePicker
              minDate={new Date()}
              selected={new Date(eventDate)}
              onChange={(date: Date) =>
                setEventDate(
                  `${date.getFullYear()}-${
                    Number(date.getMonth()) + 1
                  }-${date.getDate()}`
                )
              }
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <div style={addEventFieldContainerStyle}>
          <h2>Start Time: </h2>
          <div>
            <TimePicker
              value={startTime}
              onChange={(e) => setStartTime(e.toString())}
              clearIcon={null}
              clockIcon={null}
              disableClock={true}
              maxTime={"20:00"}
              minTime={"8:00"}
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <div style={addEventFieldContainerStyle}>
          <h2>End Time: </h2>
          <div>
            <TimePicker
              value={endTime}
              onChange={(e) => setEndTime(e.toString())}
              clearIcon={null}
              clockIcon={null}
              disableClock={true}
              maxTime={"20:00"}
              minTime={"8:00"}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "3.5rem",
            padding: "0px 1rem",
          }}
          onClick={() =>
            props.id === null ? addEventHandler() : editEventHandler()
          }
        >
          <button type="button" style={addEventButtonStyle}>
            {props.id === null ? "Add" : "Edit"} Event
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "3.5rem",
            padding: "0px 1rem",
          }}
          onClick={() => props.setIsOpen(false)}
        >
          <button type="button" style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEventForm;

interface AddEventFormProps {
  title: string | null;
  event_date: string | null;
  start_time: string | null;
  end_time: string | null;
  id: string | null;
  setEvents: Dispatch<SetStateAction<never[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
