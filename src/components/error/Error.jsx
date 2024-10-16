import "./error.scss";
import { Message } from "primereact/message";

const Error = ({ message }) => {
  return (
    <div className="error">
      <Message severity="error" text={message} />
    </div>
  );
};

export default Error;
