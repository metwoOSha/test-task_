import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Brewery, BreweryState } from './breweryStore.interface';

export const useBreweriesStore = create<BreweryState>()(
    devtools((set) => ({
        breweries: [],
        page: 1,
        loading: false,
        fetchDataBreweries: async () => {
            set({ loading: true });
            try {
                const res = await fetch(
                    'https://api.openbrewerydb.org/v1/breweries?per_page=15&page=1'
                );
                const data: Brewery[] = await res.json();

                set((state) => ({
                    breweries: [...state.breweries, ...data],
                    page: state.page + 1,
                    loading: false,
                }));
            } catch (err) {
                set({ loading: false });
                console.log(err);
            }
        },
    }))
);
export default useBreweriesStore;
