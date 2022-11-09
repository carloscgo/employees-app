import Alert from 'react-bootstrap/Alert';
import { PropsError } from '../../utils/interfaces';

const Error = ({ message }: PropsError) => {
  return (
    <Alert variant="danger">
      {message}
    </Alert>
  )
}

export default Error;
