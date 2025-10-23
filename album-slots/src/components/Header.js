import Light from "./Light";

function Header() {
    const delay = 200;
    const totalLights = 24;
    return (
        <div className="header">
            <div className="lights-border">
                <div className="flex">
                    {Array.from({ length: 10 }, (_, i) => (
                        <Light initDelay={i * delay} total={totalLights} delay={delay}></Light>
                    ))}
                </div>
                <div className="left-light-flex">
                    {Array.from({ length: 2 }, (_, i) => (
                        <Light initDelay={(1 - i) * delay + (22 * delay)} total={totalLights} delay={delay}></Light>
                    ))}
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <div className="title">Album Slots</div>
                </div>
                <div className="right-light-flex">
                    {Array.from({ length: 2 }, (_, i) => (
                        <Light initDelay={i * delay + (10 * delay)} total={totalLights} delay={delay}></Light>
                    ))}
                </div>
                <div className="flex" style={{width: '100%'}}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <Light initDelay={(9 - i) * delay + (12 * delay)} total={totalLights} delay={delay}></Light>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;