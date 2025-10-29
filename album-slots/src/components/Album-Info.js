import { useEffect, useState } from "react";

function AlbumInfo(props) {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (props.spinning) {
            setShowImage(false);
            return
        }
        if (props.album && props.album.album_name) {
            setTimeout(() => { setShowImage(true); }, props.delay);
        }
    }, [props.spinning, props.album])


    return (
        <>
            {showImage &&
                <div className="album-info-block">
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