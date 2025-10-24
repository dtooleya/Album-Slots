import { useEffect } from "react";
import { DatabaseService } from "../service/databaseService";
import Arm from "./arm";
import SlotSpinner from "./Slot-Spinner";

function Body() {

    // const [selectedAlbums, setSelectedAlbums] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    async function handleFetch() {
        const data = await DatabaseService.selectMultipleAlbumsById();
        console.log(data);
    }

    return (
        <div className="flex-center">
            <div className="body">
                <div className="flex-around" style={{ alignItems: "center", height: '100%' }}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <SlotSpinner key={"spinner_" + i}></SlotSpinner>
                    ))}
                </div>
            </div>
            <Arm />
        </div>
    );
}

export default Body;