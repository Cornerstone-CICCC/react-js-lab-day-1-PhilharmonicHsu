import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import {User} from './types/user'

const initFormData = {
  fullname: "",
  age: 0,
  education: "",
  gender: "",
  skills: [],
  bio: ""
}

const App = () => {
  /* Your states here */
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<Omit<User, 'id'>>(initFormData)
  const [viewData, setViewData] = useState<User | null>(null)

  const handleResetFormData = () => {
    setFormData(initFormData)
  }

  /* Your handlers here */

  return (
    <div className='flex justify-evenly gap-10'>
      <UserForm data={formData} setData={setFormData} users={users} setUsers={setUsers} resetData={handleResetFormData}/>
      <UserList users={users} setData={setFormData} setUsers={setUsers} setViewData={setViewData} />
      <UserProfile viewData={viewData}/>    
    </div>
  )
}

export default App