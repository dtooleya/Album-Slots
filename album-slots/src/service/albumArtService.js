export const AlbumArtService = {

    async getThumbnailURL(json) {
        if (json && json.images && json.images.length > 0) {
            console.log(json)
            return json.images[0].thumbnails.small;
        }
        return 'Error';
    },

    async getAlbumCover(album) {
        try {
            const mbResponse = await fetch(`https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(album.album_name)}&fmt=json&inc=releases`);
            const mbData = await mbResponse.json();

            if (mbData.releases && mbData.releases.length > 0) {
                const index = mbData.releases.findIndex(obj => 
                    obj["artist-credit"][0].name.toLowerCase() === album.band_name.toLowerCase()
                )
                if (index === -1) { // return error if band name not found
                    return "Error";
                }
                const releaseId = mbData.releases[index === -1 ? 0 : index].id; // MBID

                const caaResponse = await fetch(`https://coverartarchive.org/release/${releaseId}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (caaResponse.redirected) { // redirected to binary image
                    const redirectResponse = await fetch(caaResponse.url);
                    return this.getThumbnailURL(await redirectResponse.json());
                }

                return this.getThumbnailURL(await caaResponse.json());
            } else {
                console.log("Album not found on MusicBrainz.");
                return "Error";
            }
        } catch (error) {
            console.error("Error fetching album cover:", error);
            return "Error";
        }
    },
}