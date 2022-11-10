import List from '../components/List'
import Form from '../components/Form'

export default [{
  path: '/employee/edit/:id',
  slug: 'employee',
  name: 'Employee',
  icon: 'bi bi-speedometer',
  component: <Form type="edit" />,
  isMenu: false,
  index: 2
}, {
  path: '/employee/add',
  slug: 'addEmployee',
  name: 'Add New',
  icon: 'bi bi-person-plus-fill',
  component: <Form type="new" />,
  isMenu: true,
  index: 1
}, {
  path: '/dashboard',
  slug: 'home',
  name: 'Dashbord',
  icon: 'bi bi-speedometer',
  component: <List />,
  isMenu: true,
  index: 0
}];
