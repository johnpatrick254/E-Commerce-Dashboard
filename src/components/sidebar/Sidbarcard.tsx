
import { useState } from "react";

export interface SideBarCardProps {
    compIcon: string;
    name: string;
    nextIcon: string;
    setSelected?: (name: string) => void;
    selected?: string;
    onClick?:()=>void
}


export const SiderBarCard: React.FC<SideBarCardProps> = ({ onClick,compIcon, name, nextIcon, setSelected, selected }) => {
    const [showNext, setShowNext] = useState<boolean>(false)

    return <>
        <div className={`sidebar_component ${selected === name ? "active" : ""} `} onClick={onClick}
            onMouseOver={() => {
                setShowNext(true)
                if (setSelected) {
                    setSelected(name)
                }
            }
            }
            onMouseLeave={() => setShowNext(false)}>
            <img src={compIcon} alt="" />
            <h3>{name}</h3>
            <div className={`next ${!showNext ? "hide" : ""}`}><img src={nextIcon} alt="" /></div>
        </div>
    </>
}