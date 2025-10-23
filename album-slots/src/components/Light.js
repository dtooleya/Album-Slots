import { useEffect, useRef } from 'react';

function Light(props) {
    const lightRef = useRef(null);

    useEffect(() => {
        if (props.num === props.currentLight) {
            if (lightRef.current) {
                lightRef.current.classList.add('shine');
                setTimeout(turnOffLight, 200);
            }
        }
    }, [props]);

    const turnOffLight = () => {
        if (lightRef.current) {
            lightRef.current.classList.remove('shine');
        }
    }

    return (
        <div className="light" ref={lightRef}></div>
    )

}

export default Light;