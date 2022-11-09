import { Modal, Button } from "react-bootstrap";

import { PropsDialog } from "../../utils/interfaces";

const Dialog = ({ title, message, lblClose, lblAction, onAction }: PropsDialog) => {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">{lblClose}</Button>
        <Button variant="primary" onClick={onAction}>{lblAction}</Button>
      </Modal.Footer>
    </Modal.Dialog>

  );
}

export default Dialog;
