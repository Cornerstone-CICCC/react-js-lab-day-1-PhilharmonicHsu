import {User} from '../types/user'
import {ChangeEvent, Dispatch, SetStateAction} from 'react'
import {v4 as uuidv4} from 'uuid'

interface Props {
    data: Omit<User, 'id'> | User,
    setData: Dispatch<SetStateAction<Omit<User, "id">>>,
    users: User[],
    setUsers: Dispatch<SetStateAction<User[]>>,
    resetData: () => void
}

const Skills = [
    {
        key: 'typeScript',
        value: 'TypeScript'
    },
    {
        key: 'react',
        value: 'React'
    },
    {
        key: 'node',
        value: 'Node'
    },
    {
        key: 'noSQL',
        value: 'NoSQL'
    },
]

export default function UserForm({data, setData, users, setUsers, resetData}: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData(prevState => ({
          ...prevState,
          [name]: value
        }))
    }    

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
    
        setData(prevState => {
          const updatedSkills = checked
          ? [...prevState.skills, value]
          : prevState.skills.filter(skill => skill !== value)
    
          return {
            ...prevState,
            skills: updatedSkills
          }
        })
    }

    const handleAddUser = () => {
        const newUser: User = {
            id: uuidv4(),
            fullname: data.fullname,
            age: data.age,
            education: data.education,
            gender: data.gender,
            skills: data.skills,
            bio: data.bio
        }

        setUsers(prev => (
            [
              ...prev,
              newUser
            ]
        ))

        resetData();
    }

    const handleEditUser = (userId: string) => {
        const newUsers = users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    fullname: data.fullname,
                    age: data.age,
                    education: data.education,
                    gender: data.gender,
                    skills: data.skills,
                    bio: data.bio
                }
            }

            return user;
        })

        setUsers(newUsers);
    }

    return <div className='flex flex-col'>
        <h1>User Form</h1>
        <form>
            <div>
            <label htmlFor="fullname">Full Name:</label>
            <input 
                type="text" 
                id="fullname" 
                name="fullname" 
                value={data.fullname} 
                onChange={handleChange} 
            />
            </div>
            <div>
            <label htmlFor="age">Age:</label>
            <input 
                type="number" 
                id="age" 
                name="age" 
                min="1"
                value={data.age} 
                onChange={handleChange} 
            />
            </div>
            <div>
                <select name="education" id="education" value={data.education} onChange={handleChange}>
                    <option value="">Select your Education</option>
                    <option value="Backend Developer">Grade school</option>
                    <option value="Frontend Developer">High school</option>
                    <option value="Full-Stack Developer">College</option>
                </select>
            </div>
            <div>
                <input type="radio" id="male" name="gender" value="Male" checked={data.gender === 'Male'} onChange={handleChange} />
                <label htmlFor="male">Male</label><br />
                <input type="radio" id="female" name="gender" value="Female" checked={data.gender === 'Female'} onChange={handleChange} />
                <label htmlFor="female">Female</label><br />
                <input type="radio" id="other" name="gender" value="Other" checked={data.gender === 'Other'} onChange={handleChange} />
                <label htmlFor="other">other</label>
            </div>
            <div>
            
            <label>Skills:</label>
            {
                Skills.map((skill, index) => <div key={index}>
                        <input 
                            type="checkbox" 
                            id={skill.key} 
                            name="skills" 
                            value={skill.value} 
                            checked={data.skills.includes(skill.value)}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={skill.key} >{skill.value}</label>
                    </div>
                )
            }
            </div>
            <label htmlFor="bio">Bio:</label>
            <div>
                <textarea name="bio" value={data.bio} onChange={handleChange} />
            </div>
        </form>
        {
            ('id' in data) 
            ? <button onClick={() => handleEditUser(data.id)}>Save</button>
            : <button onClick={handleAddUser}>Add</button>
        }
        <button onClick={resetData}>Clear</button>
    </div>
}