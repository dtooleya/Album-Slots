import Autocomplete from "./Autocomplete";
import { useState, useEffect } from "react";
import '../styles/Sidebar.css';
import { useDispatch, useSelector } from "react-redux";
import { addGenre, removeGenre, addDescriptor, removeDescriptor, toggleShowArt, reset } from "../service/settingsSlice";
import { DatabaseService } from "../service/databaseService";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

function Settings() {
    const [showSettings, setShowSettings] = useState(false);
    const [fullGenreList, setFullGenreList] = useState([]);
    const [fullDescriptorList, setFullDescriptorList] = useState([]);
    let selectedGenres = useSelector(state => state.settings.genres);
    let selectedDescriptors = useSelector(state => state.settings.descriptors);
    let showArt = useSelector(state => state.settings.showArt);

    let dispatch = useDispatch();

    useEffect(() => {
        async function getDescriptors() {
            const data = await DatabaseService.getUniqueDescriptors();
            setFullDescriptorList(data);
        }
        async function getGenres() {
            const data = await DatabaseService.getUniqueGenres();
            setFullGenreList(data);
        }
        getDescriptors();
        getGenres();
    }, []);

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
            <img className="settings-gear" src="/Album-Slots/images/gear.png" alt="Settings"
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
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox checked={showArt} onChange={()=>dispatch(toggleShowArt())} sx={{ '& .MuiSvgIcon-root': { color: 'white', }, }} />
                        } label="Show Album Art" />
                        <span className="hint" style={{marginTop:"-7px"}}>Spin again for this to take effect</span>
                    </FormGroup>
                    <button onClick={() => dispatch(reset())}>Default</button>
                </div>
            </div>
        </>
    )
}

export default Settings;