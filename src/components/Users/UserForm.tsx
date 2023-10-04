import { useState } from "react"
import { UserData, useUpdateUserMutation } from "../../api/Users.slice"
import { ClipLoader } from "react-spinners"

export const UserForm: React.FC<Partial<UserData> & {handleCancelForm:()=>void}> = ({id, first_name, last_name, email, role,handleCancelForm}) => {
    const [inputs, setInputs] = useState({
        first_name: first_name,
        last_name: last_name,
        email: email,
        role_id: role?.id
    });
    
    const {"0":updateUser,"1":status} = useUpdateUserMutation(id as any);
    const handleSubmit = async() => {
       updateUser({
        id:`${id}`,
        data:inputs
       }).then(_data=>handleCancelForm());
       
    }

    return <div className="user-form-container">
        <form id="user-form">
        <button className="cancel" onClick={handleCancelForm}>Cancel</button>
           <div>
            <label htmlFor="first_name">First name</label>
            <input type="text" name="first_name" onChange={(e) => {
                setInputs(prev => {
                    const { name, value } = e.target
                    return {
                        ...prev,
                        [name]: value
                    }
                })
            }} value={inputs.first_name} />
           </div>
            <div>
           <label htmlFor="last_name">Last name</label>
            <input type="text" name="last_name" onChange={(e) => {
                setInputs(prev => {
                    const { name, value } = e.target
                    return {
                        ...prev,
                        [name]: value
                    }
                })
            }} value={inputs.last_name} />
            </div>
            <div>
           <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={(e) => {
                setInputs(prev => {
                    const { name, value } = e.target
                    return {
                        ...prev,
                        [name]: value
                    }
                })
            }} value={inputs.email} />
            </div>
            <label className="label">
                Role
                <select value={inputs.role_id} onChange={(e) => {
                    setInputs(prev => {
                        return {
                            ...prev,
                            ['role_id']: +e.target.value
                        }
                    })
                }
                }
                >
                    <option value={1}>Admin</option>
                    <option value={2}>Editor</option>
                    <option value={3}>View</option>
                </select>
            </label>
           { status.isLoading ? <ClipLoader className="spinner" color="#000000" size={"1.85rem"} />: <button type="submit" onClick={e=>{e.preventDefault(); handleSubmit()}}>Submit</button>}
        </form>
    </div>
}