import { createRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee"

function SlotSpinner(props) {
    const [fruits, setFruits] = useState(["🍒", "🍉", "🍊", "🍓", "🍇", "🥝", "7"]);
    useEffect(() => {
        const temp = fruits;
        temp.sort(() => Math.random() * 2 - 1);
        setFruits(temp);
        console.log("sort", fruits);
    }, [])
    const slotRef = createRef();

    useEffect(() => {
    }, [props.spinning]);

    return (
        <div className="spinner">
            {props.url && !props.spinning ?
                <img src={props.url} className="spinner-image" alt="" />
                : <div className="slot-container" ref={slotRef}>
                    <Marquee direction="down" speed={400} play={props.spinning}>
                        {fruits.map((fruit, i) => (
                            <div key={i} className="marquee-item">
                                {fruit}
                            </div>
                        ))}
                    </Marquee>
                </div>}
        </div>
    )
}

export default SlotSpinner;