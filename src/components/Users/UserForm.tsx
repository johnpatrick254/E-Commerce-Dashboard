import { useState } from "react"
import { UserData, useCreateUserMutation, useUpdateUserMutation } from "../../api/Users.slice"
import { ClipLoader } from "react-spinners"
import ShowIcon from '../../assets/eye-12120.svg'


export const UserForm: React.FC<Partial<UserData> & { handleCancelForm: () => void, isAdding: boolean }> = ({ id, first_name, last_name, email, role, handleCancelForm, isAdding }) => {
    const [inputs, setInputs] = useState({
        first_name: first_name!,
        last_name: last_name!,
        email: email!,
        role_id: role?.id!
    });
    const [passInputs, setPassInputs] = useState({
        password: '',
        password_confirm: '',
    });
    const [showPassword, setShowPassword] = useState(true);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMSG] = useState('');
    const { "0": updateUser, "1": status } = useUpdateUserMutation(id as any);
    const [addUser] = useCreateUserMutation()
    const handleSubmit = async () => {
        if (isAdding) {
            addUser({
                ...inputs,
                ...passInputs,
            }).then(_data => handleCancelForm())
        } else {

            updateUser({
                id: `${id}`,
                data: inputs
            }).then(_data => handleCancelForm());
        }

    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassInputs(prev => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value
            }
        });
    };

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

            {isAdding &&

                <div className="pass-container">
                    <div className="password"  >
                        <p>Password</p>
                        <div className="pass-input">
                            <input name='password' type={showPassword ? 'password' : 'text'} required onChange={handleInputChange} value={passInputs.password} />
                            <img src={ShowIcon} alt="show password"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            />
                        </div>
                    </div>
                    <div className="password"  >
                        <p>Confirm Password</p>
                        <div className="pass-input">
                            <input name='password_confirm' type={showPassword ? 'password' : 'text'} required onChange={(e) => {
                                if (passInputs.password !== e.target.value) {
                                    setErrMSG("Password Do not match")
                                    setErr(true);
                                } else {
                                    setErr(false)
                                }
                                handleInputChange(e)
                            }} value={passInputs.password_confirm} />
                            <img src={ShowIcon} alt="show password"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            />
                        </div>
                        <p>{err && errMsg}</p>
                    </div>
                </div>
            }
            {status.isLoading ? <ClipLoader className="spinner" color="#000000" size={"1.85rem"} /> : <button hidden={err ? true : false} type="submit" onClick={e => { e.preventDefault(); handleSubmit() }}>Submit</button>}
        </form>
    </div>
}