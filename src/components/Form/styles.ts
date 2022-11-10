import styled from 'styled-components';
import Container from 'react-bootstrap/Container';

const FormContainer = styled(Container)`
  padding: 7rem;

  .form-control {
    &[type="file"] {
      padding-top: 1.5rem;
      padding-left: 1rem;
    }

    &.select {
      padding-top: 1rem;
    }
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .buttons {
    gap: 20px
  }
`;

export default FormContainer;
