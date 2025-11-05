import { useEffect, useState } from "react";

function AlbumInfo(props) {
    const [showImage, setShowImage] = useState(false);
    const [initLoad, setInitLoad] = useState(true);

    useEffect(() => {
        if (props.album?.url === "Error") {
            console.log("here? ", props.album?.album_name)
        }
        if (props.spinning) {
            setTimeout(() => { setShowImage(false); }, (props.delay / 2));
            return;
        }
        if (props.album && props.album.album_name) {
            setTimeout(() => { 
                setShowImage(true);
                setInitLoad(false)
             }, props.delay);
        }
    }, [props.spinning, props.album, props.delay])


    return (
        <>
            {!initLoad &&
                <div className={"album-info-block " + (showImage ? "" : "disabled")}>
                    <div>{showImage}</div>
                    {props.album && props.album.album_name &&
                        <>
                            <div className="title">Album:</div>
                            <div>{props.album.album_name}</div>
                        </>
                    }
                    {props.album && props.album.band_name &&
                        <>
                            <div className="title">Artist:</div>
                            <div>{props.album.band_name}</div>
                        </>
                    }
                    {props.album && props.album.genres &&
                        <>
                            <div className="title">Genres:</div>
                            {props.album.genres.map((genre) => (
                                <span className="badge" key={genre}>{genre}</span>
                            ))}
                        </>
                    }
                    {props.album && props.album.descriptors &&
                        <>
                            <div className="title">Descriptors:</div>
                            {props.album.descriptors.map((descriptor) => (
                                <span className="badge">{descriptor}</span>
                            ))}
                        </>
                    }

                </div>
            }
        </>

    );
}

export default AlbumInfo;