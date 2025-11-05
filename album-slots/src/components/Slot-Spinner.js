import { createRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee"

function SlotSpinner(props) {
    const fruits = ["🍒", "🍉", "🍊", "🍓", "🍇", "🥝", "7"];
    const [play, setPlay] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [initLoad, setInitLoad] = useState(true);
    const [fadeout, setFadeOut] = useState(false);
    const slotRef = createRef();

    useEffect(() => {
        setTimeout(() => setPlay(props.spinning), props.delay);
        if (props.spinning) {
            setImageLoaded(false);
            if (!initLoad) {
                setFadeOut(true);
                setTimeout(() => setFadeOut(false), 300);
            }
            setInitLoad(false);
        }
    }, [props.spinning, initLoad, props.delay]);

    function getImageClass() {
        if (fadeout) {
            return "spinner-image-fadeout";
        }
        return imageLoaded && !play ? "spinner-image" : "spinner-image-disabled";
    }

    return (
        <div className="spinner">
            {props.album?.url === "Error" && !play &&
                <div className="spinner-image-error">{props.album?.album_name}</div>
            }
            {!play && props.album?.url && props.album?.url !== "Error" &&
                <div>
                <img src={props.album?.url} className={getImageClass()} alt=""
                    onLoad={() => { setImageLoaded(true) }} />
                    </div>
            }
            {(play || props.spinning || initLoad) && !fadeout && <div className="slot-container" ref={slotRef}>
                <Marquee direction="down" speed={400} play={play}>
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