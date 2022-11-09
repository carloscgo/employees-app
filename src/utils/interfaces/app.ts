
import { IFunc } from './common'
import { Props as PropsEmployee } from './employee'

export interface Props {
  error: string;
  employees: {
    loading: boolean,
    data: PropsEmployee
  };
  getAllRequestActionHandler: IFunc;
  deleteRequestActionHandler: IFunc;
}
