import { Nav } from "../components/nav/Nav"
import { SideBar } from "../components/sidebar/SideBar"
import "../styles/sidebar/sidebar.style.css";
import "../styles/orders/orders.style.css";

export const Profile: React.FC = () => {
    return <>
        <Nav />
        <div className="orders-page-container">
            <SideBar />
            <div className="orders">
                <h1>Under construction</h1>
            </div>
        </div>
    </>
}