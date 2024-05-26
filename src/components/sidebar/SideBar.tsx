import { sideBarcards } from "../../Utils/Dashboard/sideBarcards";
import "../../styles/sidebar/sidebar.style.css";
import { useState } from "react";
import { SiderBarCard } from "./Sidbarcard";
import { useNavigate } from "react-router-dom";
import { CardStackIcon} from '@radix-ui/react-icons'

function DrawerIcon({onClick}:{onClick:()=>void}) {
    return (
        <div id="drawer-icon" onClick={onClick}>
            <CardStackIcon color="black" />
        </div>
    )
}
export const SideBar = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<string>('Analytics')
    const [show, setShow] = useState<boolean>(false)

    return <>
        <section id="sidebar" style={{ left: show ? 0 : null as unknown as string }}>
                <DrawerIcon onClick={()=>setShow(!show)}/>
            <div className="sidebar-container" >
                {
                    sideBarcards.map((card, i) =>
                        <SiderBarCard
                            name={card.name}
                            compIcon={card.compIcon}
                            nextIcon={card.nextIcon}
                            key={i}
                            setSelected={setSelected}
                            selected={selected}
                            onClick={() => { navigate(`/${card.name === "Analytics" ? "" : card.name.toLowerCase()}`) }}
                        />
                    )
                }
            </div>
        </section>

    </>
}