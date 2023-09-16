import { sideBarcards } from "../../Utils/util";
import "../../styles/sidebar/sidebar.style.css";
import { useState } from "react";
import { SiderBarCard } from "./Sidbarcard";
import { useNavigate } from "react-router-dom";

export const SiderBar = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<string>('Analytics')
 
    return <>
        <section id="sidebar">
            {sideBarcards.map((card,i)=>
            <SiderBarCard
            name={card.name}
            compIcon={card.compIcon}
            nextIcon={card.nextIcon}
            key={i}
            setSelected={setSelected}
            selected={selected}
            onClick={()=>{navigate(`/${card.name.toLowerCase()}`)}}
            />
            )}
        </section>

    </>
}