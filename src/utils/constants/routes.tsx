import EmployeesList from '../../components/EmployeesList'

export default [{
  path: '/employee/:id',
  slug: 'employee',
  name: 'Employee',
  icon: 'bi bi-speedometer',
  component: <div>Employee</div>,
  isMenu: false,
  index: 2
}, {
  path: '/employee/add',
  slug: 'addEmployee',
  name: 'Add New',
  icon: 'bi bi-person-plus-fill',
  component: <div>Add Employees</div>,
  isMenu: true,
  index: 1
}, {
  path: '/dashboard',
  slug: 'home',
  name: 'Dashbord',
  icon: 'bi bi-speedometer',
  component: <EmployeesList />,
  isMenu: true,
  index: 0
}];
