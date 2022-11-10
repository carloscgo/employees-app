import { useState, useEffect } from 'react';
import { Toast as BToast, ToastContainer } from 'react-bootstrap'

import { PropsToast } from "../../utils/interfaces";

const Toast = ({ open, title, message, onClose }: PropsToast) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open)
  }, [open])

  return (
    <ToastContainer position="middle-center">
      <BToast show={show} delay={3000} autohide onClose={onClose} bg="info">
        <BToast.Header>
          <strong className="text-success me-auto">{title}</strong>
        </BToast.Header>

        <BToast.Body>{message}</BToast.Body>
      </BToast>
    </ToastContainer>
  )
}

export default Toast