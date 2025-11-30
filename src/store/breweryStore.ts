import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Brewery, BreweryState } from './breweryStore.interface';

export const useBreweriesStore = create<BreweryState>()(
    devtools((set, get) => ({
        breweries: [],
        selected: [],
        visible: [],
        page: 1,
        loading: false,
        errorMsg: '',
        fetchDataBreweries: async () => {
            set({ loading: true });
            const { page } = get();

            try {
                const res = await fetch(
                    `https://api.openbrewerydb.org/v1/breweries?per_page=15&page=${page}`
                );

                if (!res.ok) {
                    throw new Error('Error fetch data');
                }
                const data: Brewery[] = await res.json();

                set((state) => ({
                    breweries: [...state.breweries, ...data],
                }));
            } catch (err) {
                set({ errorMsg: `${err}` });
            } finally {
                set({ loading: true });
            }
        },
        toggleSelect: (id) => {
            const selected = get().selected;
            if (selected.includes(id)) {
                set({ selected: selected.filter((item) => item !== id) });
            } else {
                set({ selected: [...selected, id] });
            }
        },
        clearSelect: () => {
            set({ selected: [] });
        },
        deleteSelectItems: () => {
            const breweries = get().breweries;
            const selected = get().selected;
            set({
                breweries: breweries.filter((item) => !selected.includes(item.id)),
            });
            set({ selected: [] });
        },
        setPage: () => {
            const currentPage = get().page;
            set({ page: currentPage + 1 });
        },
    }))
);

useBreweriesStore.getState().fetchDataBreweries();

export default useBreweriesStore;
