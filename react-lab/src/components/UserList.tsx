import { User } from "../types/user"
import {Dispatch, SetStateAction} from 'react'


type Props = {
    users: User[],
    setData: Dispatch<SetStateAction<Omit<User, "id">>>,
    setUsers: Dispatch<SetStateAction<User[]>>,
    setViewData: Dispatch<SetStateAction<User | null>>,
}

export default function UserList({users, setData, setUsers, setViewData}: Props) {
    const handleViewUser = (userId: string) => {
        const selectedUser = users.find(user => user.id === userId)!

        setViewData(selectedUser)
    }

    const handleDeleteUser = (userId: string) => {
        const newUsers = users.filter(user => user.id != userId)

        setUsers(newUsers)
    }

    return <div className="flex flex-col">
        <h1>User List</h1>
        {
            users.length === 0 
            ? <>-</>
            : <ul>
                {users.map(((user, index) => {
                    return <div key={index}>
                        <li>
                            {user.fullname} - {user.id}
                            <button onClick={() => handleViewUser(user.id)}>View</button>
                            <button onClick={() => setData(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </li>
                    </div>
                }))}
            </ul>
        }
    </div>
}