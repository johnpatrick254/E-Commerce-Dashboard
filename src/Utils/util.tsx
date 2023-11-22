import axios from "axios"
const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
export interface AuthenicatedUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;

  role: {
    id: number,
    name: string,
    permisions: { id: number, name: string }[]
  }
}
export const fetchAuthenticatedUser = async () => {
  const user = await axios.get(baseURL , {
    withCredentials: true
  }).then(res => {
    if (res.status == 200) {
      return res.data as AuthenicatedUser
    } else {
      console.log(res.data);
      return null
    }
  }).catch(e => {
    console.log(e.response.data);
    return null

  })
  return user
}


