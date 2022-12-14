export interface Props {
  prop: string;
  label: string;
}

export const ROWS: Array<Props> = [{
  prop: 'id',
  label: 'ID',
}, {
  prop: 'firstName',
  label: 'Firstname',
}, {
  prop: 'lastName',
  label: 'Lastname',
}, {
  prop: 'email',
  label: 'Email',
}, {
  prop: 'image',
  label: 'Photo',
}, {
  prop: 'gender',
  label: 'Gender',
}, {
  prop: 'age',
  label: 'Age',
}, {
  prop: 'actions',
  label: 'Actions',
}]

export const messages = {
  dialog: {
    title: 'Warning',
    message: 'Are you sure to delete the employee?',
    lblClose: 'No',
    lblAction: 'Yes'
  }
}