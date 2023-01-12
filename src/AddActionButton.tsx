import { Dispatch, FC, SetStateAction } from "react";

const addActionButtonStyle = {
  borderRadius: "100%",
  backgroundColor: "#FFF",
  height: "5rem",
  width: "5rem",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "1px 2px 9px #e7dbdd",
  position: "fixed" as "fixed",
  bottom: "0px",
  right: "0px",
  margin: "3.5rem",
  cursor: "pointer",
};

const AddActionButton: FC<AddActionButtonProps> = (props): JSX.Element => {
  return (
    <>
      <div style={addActionButtonStyle} onClick={() => props.setIsOpen(true)}>
        Add+
      </div>
    </>
  );
};

export default AddActionButton;

interface AddActionButtonProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
