import styled from 'styled-components';
import { Container } from "react-bootstrap";

const Content = styled(Container)`
  .avatar {
    width: 50px;
    height: 50px;
  }

  .btn-delete {
    border: none;
    padding: 0;
  }

  .actions {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
  }
`

export default Content