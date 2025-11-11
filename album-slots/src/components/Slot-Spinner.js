import { createRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee"

function SlotSpinner({spinning, delay, album}) {
    const fruits = ["🍒", "🍉", "🍊", "BAR", "🍓", "🍇", "🥝", "7"];
    const [play, setPlay] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [initLoad, setInitLoad] = useState(true);
    const [fadeout, setFadeOut] = useState(false);
    const [currentName, setCurrentName] = useState(false);
    const slotRef = createRef();

    useEffect(() => {
        setTimeout(() => setPlay(spinning), delay);
        if (spinning) {
            setImageLoaded(false);
            if (!initLoad) {
                setFadeOut(true);
                setTimeout(() => setFadeOut(false), 300);
            }
            setInitLoad(false);
        }
    }, [spinning, initLoad, delay]);

    useEffect(() => {
        setTimeout(() => setCurrentName(album?.album_name), delay + 400);
    }, [album, delay]);

    function getImageClass() {
        if (fadeout) {
            return "spinner-image-fadeout";
        }
        return imageLoaded && !play ? "spinner-image" : "spinner-image-disabled";
    }

    return (
        <div className="spinner">
            {album?.url === "Error" && !play &&
                <div className="spinner-image-error">{currentName}</div>
            }
            {!play && album?.url && album?.url !== "Error" &&
                <div>
                <img src={album?.url} className={getImageClass()} alt=""
                    onLoad={() => { setImageLoaded(true) }} />
                    </div>
            }
            {(play || spinning || initLoad) && !fadeout && <div className="slot-container" ref={slotRef}>
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