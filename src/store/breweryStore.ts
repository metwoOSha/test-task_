import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Brewery, BreweryState } from './breweryStore.interface';

export const useBreweriesStore = create<BreweryState>()(
    devtools((set, get) => ({
        visibleBreweries: [],
        bufferBreweries: [],
        selected: [],
        page: 1,
        loading: false,
        errorMsg: '',
        fetchDataBreweries: async () => {
            set({ loading: true });
            const { page, bufferBreweries } = get();
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/breweries?per_page=15&page=${page}`
                );
                if (!res.ok) throw new Error('Error fetch data');
                const data: Brewery[] = await res.json();
                set({
                    bufferBreweries: [...bufferBreweries, ...data],
                    page: page + 1,
                });
            } catch (err) {
                set({ errorMsg: `${err}` });
            } finally {
                set({ loading: false });
            }
        },
        toggleSelect: (id) => {
            const { selected } = get();
            if (selected.includes(id)) {
                set({ selected: selected.filter((item) => item !== id) });
            } else {
                set({ selected: [...selected, id] });
            }
        },
        clearSelect: () => {
            if (get().selected.length > 0) {
                set({ selected: [] });
            }
        },
        deleteSelected: async () => {
            const { visibleBreweries, selected } = get();
            const filtered = visibleBreweries.filter((item) => !selected.includes(item.id));
            set({ visibleBreweries: filtered, selected: [] });
            await get().refillVisible();
        },
        refillVisible: async () => {
            const { visibleBreweries, bufferBreweries } = get();
            const missing = 15 - visibleBreweries.length;

            if (missing > 0) {
                if (bufferBreweries.length < missing) {
                    await get().fetchDataBreweries();
                }
                const next = get().bufferBreweries.slice(0, missing);

                set({
                    visibleBreweries: [...visibleBreweries, ...next],
                    bufferBreweries: get().bufferBreweries.slice(missing),
                });
            }
        },
        shiftBreweries: async () => {
            const { visibleBreweries, bufferBreweries } = get();
            const trimmed = visibleBreweries.slice(5);
            if (bufferBreweries.length < 5) {
                await get().fetchDataBreweries();
            }

            const next = get().bufferBreweries.slice(0, 5);
            set({
                visibleBreweries: [...trimmed, ...next],
                bufferBreweries: get().bufferBreweries.slice(5),
            });
        },
    }))
);

useBreweriesStore.getState().fetchDataBreweries();
useBreweriesStore.getState().refillVisible();

export default useBreweriesStore;
