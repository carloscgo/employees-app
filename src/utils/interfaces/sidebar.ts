
import { Props as PropsRoute } from './route'
import { IFunc } from "../../utils/interfaces";

export interface Props {
  color: string;
  image: string;
  routes: Array<PropsRoute>;
  onClean: IFunc
}
