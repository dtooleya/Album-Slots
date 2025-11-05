import Autocomplete from "./Autocomplete";
import { useState } from "react";
import '../styles/Sidebar.css';
import { useDispatch, useSelector } from "react-redux";
import { addGenre, removeGenre, addDescriptor, removeDescriptor } from "../service/settingsSlice";

function Settings() {
    const [showSettings, setShowSettings] = useState(true);
    const fullGenreList = ["Rock", "Pop", "Jazz"];
    const fullDescriptorList = ["Energetic", "Calm", "Happy", "Sad"];
    let selectedGenres = useSelector(state => state.settings.genres);
    let selectedDescriptors = useSelector(state => state.settings.descriptors);

    let dispatch = useDispatch();

    function toggleSettings() {
        setShowSettings(!showSettings);
    }

    function handleGenreChange(action, genre) {
        if (action === "add") {
            dispatch(addGenre(genre));
        } else {
            dispatch(removeGenre(genre));
        }
    }

    function handleDescriptorChange(action, genre) {
        if (action === "add") {
            dispatch(addDescriptor(genre));
        } else {
            dispatch(removeDescriptor(genre));
        }
    }

    return (
        <>
            <img className="settings-gear" src="images/gear.png" alt="Settings"
                onClick={() => { toggleSettings() }} />
            <div className={"sidebar " + (showSettings ? "open" : "")}>
                <div className="sidebar-container">
                    <h1>Settings
                        <span style={{ float: "right", cursor: "pointer" }} onClick={() => setShowSettings(false)}>X</span>
                    </h1>
                    <Autocomplete label="Genres" fullList={fullGenreList}
                        handleChange={handleGenreChange} selected={selectedGenres} />
                    <Autocomplete label="Descriptors" fullList={fullDescriptorList}
                        handleChange={handleDescriptorChange} selected={selectedDescriptors} />

                </div>
            </div>
        </>
    )
}

export default Settings;