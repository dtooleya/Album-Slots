import Slider from '@mui/material/Slider'
import { useState } from 'react';

function Arm(props) {

    const [sliderValue, setSliderValue] = useState(100)

    const handleSlider = (event, newValue) => {
        if (newValue === 0) {
            setTimeout(() => {setSliderValue(100)}, 1000);
            props.setSpinning(true);
            setTimeout(() => {props.setSpinning(false)}, 5000);
        } else if (!props.spinning) {
            setSliderValue(newValue);
        }
    }

    return (
        <div className="right" style={{ width: '100px' }}>
            <div className="arm">
                <Slider size="large"
                    value={sliderValue}
                    onChange={handleSlider}
                    orientation='vertical' />
            </div>
            <div className='connector'></div>
        </div>
    )
}

export default Arm;