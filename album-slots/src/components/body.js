import { useEffect, useState } from "react";
import { DatabaseService } from "../service/databaseService";
import { AlbumArtService } from "../service/albumArtService";
import Arm from "./arm";
import SlotSpinner from "./Slot-Spinner";
import AlbumInfo from "./Album-Info";

function Body() {

    const [spinning, setSpinning] = useState(false);
    const [selectedAlbums, setSelectedAlbums] = useState([]);

    useEffect(() => {
        if (spinning) {
            let promise = new Promise(function (resolve, reject) {
                generateAlbumIds(resolve, reject);
            });
            promise.then(handleFetch);
        }
    }, [spinning]);

    async function handleFetch(albumIds) {
        const data = await DatabaseService.selectMultipleAlbumsById(albumIds);
        console.log("fetched albums:", data);
        const artPromises = data.map(album =>
            AlbumArtService.getAlbumCover(album).catch(err => {
                console.error('getAlbumCover error for', album, err);
                return 'Error';
            })
        );

        const artResults = await Promise.all(artPromises);
        const albumsWithUrl = data.map((album, i) => ({ ...album, url: artResults[i] }));
        setSelectedAlbums(albumsWithUrl);
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

    return (
        <div className="flex-center">
            <div className="body">
                <div className="flex-around spinner-container" style={{ alignItems: "center", }}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <div>
                            <SlotSpinner spinning={spinning} key={"spinner_" + i}
                                url={selectedAlbums.length >= 5? selectedAlbums[i].url: ""}></SlotSpinner>

                            <AlbumInfo album={selectedAlbums[i]} />
                        </div>
                    ))}
                </div>
            </div>
            <Arm spinning={spinning} setSpinning={setSpinning} />
        </div>
    );
}

export default Body;