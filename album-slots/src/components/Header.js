import Light from "./Light";
import { useState, useEffect } from "react";

function Header() {
    const delay = 200;
    const totalLights = 22;
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
                    <Light num={21} currentLight={currentLight} key={"light_21"}></Light>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <div className="title">Album Slots</div>
                </div>
                <div className="right light-flex">
                        <Light num={10} currentLight={currentLight} key={"light_"+ (10)}></Light>
        
                </div>
                <div className="flex" style={{ width: '100%' }}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <Light num={20 - i} currentLight={currentLight} key={"light_"+ (20 -i)}></Light>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;