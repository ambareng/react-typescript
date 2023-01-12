import { Dispatch, FC, SetStateAction } from "react";
import Modal from "react-modal";
import AddEventForm from "./AddEventForm";

const modalContentStyle = {
  backgroundColor: "#FFF",
  height: "30rem",
  width: "35rem",
  boxShadow: "1px 2px 9px #e7dbdd",
  padding: "2.5rem",
  display: "flex",
  flexDirection: "column" as "column",
};

const EditEventModal: FC<EditEventModalProps> = (props): JSX.Element => {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={{
          content: {
            backgroundColor: "transparent",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        // contentLabel="Example Modal"
      >
        <div style={modalContentStyle}>
          <AddEventForm
            setEvents={props.setEvents}
            title={props.title}
            event_date={props.event_date}
            start_time={props.start_time}
            end_time={props.end_time}
            id={props.id}
            setIsOpen={props.setIsOpen}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditEventModal;

interface EditEventModalProps {
  title: string | null;
  event_date: string | null;
  start_time: string | null;
  end_time: string | null;
  id: string | null;
  setEvents: Dispatch<SetStateAction<never[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
