import { User } from "../types/user"

type Props = {
    viewData: User | null
}

export default function UserProfile({viewData}: Props) {

    const Context = () => {
        return (! viewData) 
            ? <>-</>
            : <div className="flex flex-col">
            <p>FullName: {viewData.fullname}</p>
            <p>Age: {viewData.age}</p>
            <p>Education: {viewData.education}</p>
            <p>Gender: {viewData.gender}</p>
            <p>Skills: {viewData.skills.join(', ')}</p>
            <div>Bio: {viewData.bio}</div>
        </div>
    }

    return <div className="flex flex-col">
        <h1>User Profile</h1>
        <Context />
    </div>
}