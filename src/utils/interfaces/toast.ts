import { IFunc } from './common'

export interface Props {
  open: boolean;
  title: string;
  message: string | null;
  onClose: IFunc;
}
