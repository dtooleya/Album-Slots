import React, { useRef } from 'react';

function Light(props) {
    const lightRef = useRef(null);

    setTimeout(() => {turnOnLight()}, props.initDelay);


    const turnOnLight = () => {
        if (lightRef.current) {
            lightRef.current.classList.add('shine');
            setTimeout(turnOffLight, 200)
        }
    }

    const turnOffLight = () => {
        if (lightRef.current) {
            lightRef.current.classList.remove('shine');
            setTimeout(turnOnLight, props.delay * (props.total - 1));
        }
    }

    return (
        <div className="light" ref={lightRef}></div>
    )

}

export default Light;