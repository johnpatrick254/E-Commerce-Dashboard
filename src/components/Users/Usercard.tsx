import { UserData, useDeleteUserMutation } from "../../api/Users.slice";
import EditIcon from "../../assets/edit-svgrepo-com.svg"
import MenuDots from "../../assets/delete-1-svgrepo-com.svg"
export const UserCard: React.FC<UserData & {i:number,
    handleEdit: React.Dispatch<React.SetStateAction<{
        show: boolean;
        data: UserData;
    }>>
}> = ({ email, first_name, id, last_name, role, handleEdit,i }) => {
    const {'0':deleteUser}=useDeleteUserMutation();
    return <>
        <div className="user-container">
            <div className="check-box">
                <p>{i+1}</p>
            </div>
            <div className="user-details">
                <p>{first_name} {last_name}</p>
            </div>
            <div className="user-role">
                {role?.name}
            </div>
            <div className="user-email">
                {email}
            </div>
            <div className="edit-user" onClick={() => {
                handleEdit({ show: true, data: { first_name: first_name, last_name: last_name, email: email, role: role, id: id } })
            }}>
                <img src={EditIcon} alt="edit" />
            </div>
            <div className="action-button" onClick={()=>{deleteUser(id)}}>
                <img src={MenuDots} alt="action-button" />
            </div>
        </div>
    </>
}