import { useState } from 'react';
import './style.css'
function SwitchButton({ status, handleUpdateSwitch }:any) {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="switch-button" onClick={  handleUpdateSwitch }>
            <div className={status===1 ? "switch-button-toggle on" : "switch-button-toggle off"}></div>
        </div>
    );
}
export default SwitchButton