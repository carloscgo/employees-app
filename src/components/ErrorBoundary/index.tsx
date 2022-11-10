/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from "react";
import { Button } from "react-bootstrap";

import Container from './styles';

type Props = {
  children: ReactElement | HTMLElement | any
}
type State = {
  hasError: boolean
}

import image from '../../assets/error.svg'

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container fluid className="p-0" image={image}>
          <Button variant="primary" size="lg" className="btn-retry" onClick={() => window.location.reload()}>Retry again</Button>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary