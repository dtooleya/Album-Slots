import { useEffect, useState } from "react";
import { DatabaseService } from "../service/databaseService";
import { AlbumArtService } from "../service/albumArtService";
import Arm from "./arm";
import SlotSpinner from "./Slot-Spinner";

function Body() {

    const [spinning, setSpinning] = useState(false);
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [albumArtUrlList, setAlbumArtUrlList] = useState([]);

    useEffect(() => {
        if (spinning) {
            let promise = new Promise(function (resolve, reject) {
                setAlbumArtUrlList([]);
                generateAlbumIds(resolve, reject);
            });
            promise.then(handleFetch);
        }
    }, [spinning]);

    useEffect(() => {
        selectedAlbums.forEach(album => {
            getAlbumArt(album);
        });
    }, [selectedAlbums]);

    async function handleFetch(albumIds) {
        const data = await DatabaseService.selectMultipleAlbumsById(albumIds);
        console.log(data);
        setSelectedAlbums(data);
    }

    async function generateAlbumIds(resolve, reject) {
        const albumIds = [];
        const existingIds = await DatabaseService.fetchAllAlbumIds();
        if (!existingIds || existingIds.length < 5) {
            reject(0);
            return;
        }

        while (albumIds.length !== 5) {
            const randIndex = Math.floor(Math.random() * existingIds.length);
            const randId = existingIds[randIndex];
            if (!albumIds.includes(randId)) {
                albumIds.push(randId);
            }
        }

        resolve(albumIds);
    }

    async function getAlbumArt(album) {
        const url = await AlbumArtService.getAlbumCover(album);
        if (url) {
            setAlbumArtUrlList(prev => [...prev, url]);
        }
    }

    return (
        <div className="flex-center">
            <div className="body">
                <div className="flex-around" style={{ alignItems: "center", height: '100%' }}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <SlotSpinner key={"spinner_" + i} url={i < albumArtUrlList.length ? albumArtUrlList[i] : ""}></SlotSpinner>
                    ))}
                </div>
            </div>
            <Arm spinning={spinning} setSpinning={setSpinning} />
        </div>
    );
}

export default Body;