import { Animation, Container, Overlay } from './styles';
import {
  ILoading
} from '../../utils/interfaces';

const Loading = ({ show }: ILoading) => {
  if (!show) return null

  return (
    <Container>
      <Overlay />

      <Animation>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Animation>
    </Container>
  )
}

export default Loading