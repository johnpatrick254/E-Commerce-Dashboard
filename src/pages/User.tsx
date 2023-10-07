
import { Nav } from "../components/nav/Nav";
import "../styles/sidebar/sidebar.style.css"
import "../styles/users/users.styles.css"
import SearchIcon from "../assets/search-5-svgrepo-com.svg"
import { SideBar } from "../components/sidebar/SideBar";
import { UserData, useGetAllUsersQuery } from "../api/Users.slice";
import { UserCard } from "../components/Users/Usercard";
import { useEffect, useState } from "react";
import { UserForm } from "../components/Users/UserForm";

export const UsersPage: React.FC = () => {
    const { data: users } = useGetAllUsersQuery(1);
    const [showEditForm, setShowEditForm] = useState<{
        show: boolean,
        isAdding:boolean,
        data: UserData
    }>({
        show: false,
        isAdding:false,
        data: {
            id: 1,
            first_name: "",
            last_name: "",
            email: "",
            role: {
                name: "",
                id: 0
            }
        }

    })

    const [query, setQuery] = useState('');
    const [filteredUserList, SetFilteredUserList] = useState<UserData[]>([]);
    useEffect(() => {
        if (users) {
            SetFilteredUserList(users.data);
        }
    }, [users]);
    useEffect(() => {
        if (users) {
            const updatedQuery = users.data.filter(item => {
                const name = item.first_name + " " + item.last_name;
                if (name.toLowerCase().includes(query.toLowerCase())) return item;
            });
            SetFilteredUserList(updatedQuery)
        }
    }, [query])


    const handleCancelForm = () => {
        setShowEditForm({
            show: false,
            isAdding:false,
            data: {
                id: 1,
                first_name: "",
                last_name: "",
                email: "",
                role: {
                    name: "",
                    id: 3
                }
            }
        })
    }

    return <>
        <Nav />
        <div className="user-page-container">
            <SideBar />
            <div className="users">
                <div className="user-top_bar">
                    <h2>Users </h2>
                    <div className="user-actions">
                        <div className="search-bar">
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <img src={SearchIcon} alt="search-bar" />
                        </div>
                        <button className="add-user" onClick={()=>{
                            setShowEditForm(prev=>{
                                return{
                                    ...prev,
                                    ['show']:true,
                                    ['isAdding']:true
                                }
                            })
                        }}>Add User</button>
                    </div>
                </div>
                <div className="user-container user-header">
                    <div className="check-box">
                    </div>
                    <div className="user-details">
                        <span>User name</span>
                    </div>
                    <div className="user-role">
                        <span>Role</span>
                    </div>
                    <div className="user-email">
                        <span>Email</span>
                    </div>
                </div>
                {
                    filteredUserList.map((user,i) => {
                        return <UserCard
                            first_name={user.first_name}
                            last_name={user.last_name}
                            email={user.email}
                            role={user.role}
                            id={user.id}
                            key={user.id}
                            i={i}
                            handleEdit={setShowEditForm}
                        />
                    })
                }       
            </div>
            
        </div>
        {showEditForm.show && <UserForm
                    id={showEditForm.data.id}
                    first_name={showEditForm.data.first_name}
                    last_name={showEditForm.data.last_name}
                    email={showEditForm.data.email}
                    role={showEditForm.data.role}
                    handleCancelForm={handleCancelForm}
                    isAdding={showEditForm.isAdding}
                />} 
    </>
}