import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

const ErrorContainer = styled(Container)`
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  background-image: url(${props => props.image});
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-retry {
    border: none;
    position: relative;
    top: 50px;
  }
`;

export default ErrorContainer;
