import { useContext,createContext } from "react";
import { AuthenicatedUser } from "../Utils/util";

export const UserProvider = createContext<AuthenicatedUser | null>(null)

export const useUserContext = ()=>{
   const user = useContext(UserProvider)
   return user
}