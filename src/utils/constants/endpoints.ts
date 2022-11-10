const SELECT = '?select=id,email,firstName,lastName,image,age,gender'

const endpoints = {
  list: {
    path: `/users/${SELECT}`,
    method: 'get'
  },
  details: {
    path: `/users/:id/${SELECT}`,
    method: 'get'
  },
  add: {
    path: `/users/add`,
    method: 'post'
  },
  update: {
    path: `/users/:id`,
    method: 'put'
  },
  delete: {
    path: `/users/:id`,
    method: 'delete'
  }
}

export default endpoints