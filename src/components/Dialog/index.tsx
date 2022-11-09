import { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";

import { PropsDialog } from "../../utils/interfaces";

const Dialog = ({ open, title, message, lblClose, lblAction, onAction, onClose }: PropsDialog) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open)
  }, [open])

  const handleClose = () => {
    onClose && onClose()

    setShow(false)
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className='text-bold'>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>{lblClose}</Button>
        <Button variant="primary" onClick={onAction}>{lblAction}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Dialog;
