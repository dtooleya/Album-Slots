import { supabase } from './createClient'

export const DatabaseService = {

    async fetchAllAlbums() {
        const { data } = await supabase.from('albums').select('*');
        return data;
    },

    async selectMultipleAlbumsById(albumIds) {
        const { data } = await supabase.from('albums').select('*').in('id', albumIds);
        return data;
    },

    async fetchAllAlbumIds() {
        const { data } = await supabase.from('albums').select('id');
        if (!data) return [];
        return data.map(row => row.id);
    },

    async getTotalAlbums() {
        const data = await supabase.from('albums').select('*', { count: 'exact', head: true });
        if (data && data.count) {
            return data.count;
        }
        return 0;
    }

}