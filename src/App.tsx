import { useEffect, useState } from "react";
import { AuthenicatedUser } from "./Utils/util";
import Login from "./pages/Login";
import { UserProvider } from "./contexts/useContexts";
import { Home } from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { ProductPage } from "./pages/ProductPage";
import { ProductsPage } from "./pages/ProductsPage";
import { UsersPage } from "./pages/User";
import { OrdersPage } from "./pages/Orders";

const fetchAuthenticatedUser = async (setUser: Function) => {
  const user = await axios.get("http://localhost:3000/api/user", {
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
  if (user !== null) {
    setUser(user)
  } else {
  }

}

function App() {
  const [authUser, setAuthUser] = useState<AuthenicatedUser | null>(null)
  useEffect(() => {
    const setUser = async () => {
      fetchAuthenticatedUser(setAuthUser);
    }
    setUser()
  }, [])
  return (
    <>
      <UserProvider.Provider value={authUser}>
        <Router>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/products/:id" Component={ProductPage} />
            <Route path="/products" Component={ProductsPage} />
            <Route path="/user" Component={UsersPage} />
            <Route path="/orders" Component={OrdersPage} />
          </Routes>
        </Router>
      </UserProvider.Provider>

    </>
  )
}

export default App
