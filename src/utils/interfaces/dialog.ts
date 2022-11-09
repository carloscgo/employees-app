import { IFunc } from './common'

export interface Props {
  title: string;
  message: string;
  lblClose: string;
  lblAction: string | undefined;
  onAction: IFunc | undefined
}
