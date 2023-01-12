import React, { useEffect, useState } from "react";
import AddActionButton from "./AddActionButton";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import EventContainer from "./EventContainer";
import { getAllEventsAPI } from "./http";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backgroundStyle = {
  backgroundColor: "#F8F9FA",
  display: "flex",
  flexDirection: "column" as "column",
  minHeight: "100vh",
};

const headerStyle = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  paddingTop: "1rem",
};

const eventsListContainerStyle = {
  padding: "2.5rem 5rem",
  display: "flex",
  flexWrap: "wrap" as "wrap",
  justifyContent: "center",
};

const App = () => {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [id, setId] = useState(null);

  const getEvents = async () => {
    await getAllEventsAPI("events").then((res) => {
      if (res.status === 200) {
        setEvents(res.data);
      }
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <ToastContainer />
      <AddEventModal
        setEvents={setEvents}
        title={null}
        event_date={null}
        start_time={null}
        end_time={null}
        id={null}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <EditEventModal
        setEvents={setEvents}
        title={title}
        event_date={eventDate}
        start_time={startTime}
        end_time={endTime}
        id={id}
        setIsOpen={setIsEditOpen}
        isOpen={isEditOpen}
      />
      <div style={backgroundStyle}>
        <h1 style={headerStyle}>Events</h1>
        <div style={eventsListContainerStyle}>
          {events.map((event, index) => (
            <EventContainer
              key={index}
              title={event["title"]}
              event_date={event["event_date"]}
              start_time={event["start_time"]}
              end_time={event["end_time"]}
              id={event["id"]}
              setEvents={setEvents}
              setTitle={setTitle}
              setEventDate={setEventDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setId={setId}
              setIsOpen={setIsEditOpen}
            />
          ))}
        </div>
        <AddActionButton setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default App;
