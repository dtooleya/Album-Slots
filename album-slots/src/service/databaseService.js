import {supabase} from './createClient'

export const DatabaseService = {

    async fetchAllAlbums() {
        const {data} = await supabase.from('albums').select('*');
        return data;
    },

    async selectMultipleAlbumsById() {
        const {data} = await supabase.from('albums').select('*').in('id', [1, 2, 3, 4]);
        return data;
    }

}