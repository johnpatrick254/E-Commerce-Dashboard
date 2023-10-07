import { sideBarcards } from "../../Utils/Dashboard/sideBarcards";
import "../../styles/sidebar/sidebar.style.css";
import { useState } from "react";
import { SiderBarCard } from "./Sidbarcard";
import { useNavigate } from "react-router-dom";

export const SiderBar = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<string>('Analytics')

    return <>
        <section id="sidebar">
            <div className="sidebar-container">
                {sideBarcards.map((card, i) =>
                    <SiderBarCard
                        name={card.name}
                        compIcon={card.compIcon}
                        nextIcon={card.nextIcon}
                        key={i}
                        setSelected={setSelected}
                        selected={selected}
                        onClick={() => { navigate(`/${card.name === "Analytics" ? "" : card.name.toLowerCase()}`) }}
                    />
                )}
            </div>
        </section>

    </>
}