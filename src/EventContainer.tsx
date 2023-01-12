import { Dispatch, FC, SetStateAction } from "react";
import { deleteEventAPI, getAllEventsAPI } from "./http";
import { toast } from "react-toastify";

const eventsContainerStyle = {
  backgroundColor: "#FFF",
  height: "12.5rem",
  width: "17.5rem",
  borderRadius: "7.5px",
  boxShadow: "1px 2px 9px #e7dbdd",
  padding: "1rem",
  position: "relative" as "relative",
  margin: "1rem",
};

const titleStyle = {
  marginBottom: "1rem",
};

const dateStyle = {
  marginBottom: "0.5rem",
};

const timeStyle = {
  marginBottom: "0.25rem",
};

const actionButtonsContainerStyle = {
  color: "#b4accc",
  position: "absolute" as "absolute",
  display: "flex",
  flexDirextion: "row" as "row",
  bottom: "0px",
  right: "0px",
  padding: "0.35rem",
};

const actionButtonStyle = {
  margin: "0.25rem",
  cursor: "pointer",
};

const EventContainer: FC<EventContainerProps> = (props): JSX.Element => {
  const onDeleteEventHandler = async (event_id: string) => {
    await deleteEventAPI("events", event_id).then(async (res) => {
      if (res.status === 200) {
        toast.success("Deleted Event Succesfully!");
        await getAllEventsAPI("events").then((res) => {
          if (res.status === 200) {
            props.setEvents(res.data);
          }
        });
      }
    });
  };

  return (
    <div style={eventsContainerStyle}>
      <h3 style={titleStyle}>{props.title}</h3>
      <h4 style={dateStyle}>Date: {props.event_date}</h4>
      <h5 style={timeStyle}>Start Time: {props.start_time}</h5>
      <h5 style={timeStyle}>End Time: {props.end_time}</h5>
      <div style={actionButtonsContainerStyle}>
        <h6
          style={actionButtonStyle}
          onClick={() => {
            props.setTitle(props.title);
            props.setEventDate(props.event_date);
            props.setStartTime(props.start_time);
            props.setEndTime(props.end_time);
            props.setId(props.id);
            props.setIsOpen(true);
          }}
        >
          Edit
        </h6>
        <h6
          style={actionButtonStyle}
          onClick={() => onDeleteEventHandler(props.id)}
        >
          Delete
        </h6>
      </div>
    </div>
  );
};

export default EventContainer;

interface EventContainerProps {
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
  id: string;
  setEvents: Dispatch<SetStateAction<never[]>>;
  setTitle: Dispatch<SetStateAction<any>>;
  setEventDate: Dispatch<SetStateAction<any>>;
  setStartTime: Dispatch<SetStateAction<any>>;
  setEndTime: Dispatch<SetStateAction<any>>;
  setId: Dispatch<SetStateAction<any>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
