import Light from "./Light";
import { useState, useEffect } from "react";

function Header() {
    const delay = 200;
    const totalLights = 24;
    let [currentLight, setCurrentLight] = useState(0);

    const updateLight = () => {
        if (currentLight >= totalLights - 1) {
            setCurrentLight(0);
        } else {
            setCurrentLight(prev => prev + 1);
        }
    }

    useEffect(() => {
         setTimeout(() => { updateLight() }, delay);
    })


    return (
        <div className="header">
            <div className="lights-border">
                <div className="flex">
                    {Array.from({ length: 10 }, (_, i) => (
                        <Light num={i} currentLight={currentLight} key={"light_"+ i}></Light>
                    ))}
                </div>
                <div className="left light-flex">
                    {Array.from({ length: 2 }, (_, i) => (
                        <Light num={23 - i} currentLight={currentLight} key={"light_"+ (23-i)}></Light>
                    ))}
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <div className="title">Album Slots</div>
                </div>
                <div className="right light-flex">
                    {Array.from({ length: 2 }, (_, i) => (
                        <Light num={10 + i} currentLight={currentLight} key={"light_"+ (10 + i)}></Light>
                    ))}
                </div>
                <div className="flex" style={{ width: '100%' }}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <Light num={21 - i} currentLight={currentLight} key={"light_"+ (21 -i)}></Light>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;