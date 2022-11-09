import { IFunc } from './common'

export interface Props {
  open: boolean;
  title: string;
  message: string;
  lblClose: string;
  lblAction?: string | undefined;
  onAction?: IFunc | undefined,
  onClose: IFunc
}
