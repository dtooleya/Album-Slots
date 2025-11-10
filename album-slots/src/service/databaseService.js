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

    async getUniqueDescriptors() {
        const {data} = await supabase.rpc('get_unique_descriptors');
        return data?.map(row => row.descriptor) ?? [];
    },

    async getUniqueGenres() {
        const {data} = await supabase.rpc('get_unique_genres');
        return data?.map(row => row.genre) ?? [];
    },

    async fetchAllAlbumIdsWithFilter(genres, descriptors) {
        const genreFilter = '{"' + genres.join('","') + '"}';
        const descriptorFilter = '{"' + descriptors.join('","') + '"}';

        if (genres.length > 0 && descriptors.length > 0) {
            const { data } = await supabase.from('albums').select('id').or(`genres.ov.${genreFilter},descriptors.ov.${descriptorFilter}`);
            return data?.map(row => row.id) ?? [];
        } else if (genres.length > 0) {
            const { data } = await supabase.from('albums').select('id').overlaps('genres', genres);
            return data?.map(row => row.id) ?? [];
        } else {
            const { data } = await supabase.from('albums').select('id').overlaps('descriptors', descriptors);
            return data?.map(row => row.id) ?? [];
        }
    }
}