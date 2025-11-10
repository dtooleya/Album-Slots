import { useEffect, useState } from "react";
import { DatabaseService } from "../service/databaseService";
import { AlbumArtService } from "../service/albumArtService";
import Arm from "./arm";
import SlotSpinner from "./Slot-Spinner";
import AlbumInfo from "./Album-Info";
import Settings from "./Settings"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Body() {

    const [spinning, setSpinning] = useState(false);
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    let selectedGenres = useSelector(state => state.settings.genres);
    let selectedDescriptors = useSelector(state => state.settings.descriptors);

    useEffect(() => {
        async function generateAlbumIds(resolve, reject) {
            const albumIds = [];
            let existingIds;
            if (selectedGenres.length > 0 || selectedDescriptors.length > 0) {
                existingIds = await DatabaseService.fetchAllAlbumIdsWithFilter(selectedGenres, selectedDescriptors);
            } else {
                existingIds = await DatabaseService.fetchAllAlbumIds();
            }
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
        if (spinning) {
            let promise = new Promise(function (resolve, reject) {
                generateAlbumIds(resolve, reject);
            });
            promise.then(handleFetch).catch(handleError);
        }
    }, [spinning, selectedDescriptors, selectedGenres]);

    function handleError() {
        toast.error(`Not enough albums with given filters, please add more`);
        setSpinning(false);
    }

    async function handleFetch(albumIds) {
        const data = await DatabaseService.selectMultipleAlbumsById(albumIds);
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

    return (
        <div className="flex-center">
            <Settings />
            <div className="body">
                <div className="flex-around spinner-container">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div key={i}>
                            <SlotSpinner spinning={spinning} key={"spinner_" + i} delay={(i + 1) * 300}
                                album={selectedAlbums.length >= 5 ? selectedAlbums[i] : null} />
                            <AlbumInfo album={selectedAlbums[i]} delay={i * 300 + 1000} spinning={spinning} />
                        </div>
                    ))}
                </div>
            </div>
            <Arm spinning={spinning} setSpinning={setSpinning} />
        </div>
    );
}

export default Body;