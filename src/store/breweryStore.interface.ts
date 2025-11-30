export interface Brewery {
    id: string;
    name: string | null;
    brewery_type: string | null;
    address_1: string | null;
    address_2: string | null;
    address_3: string | null;
    city: string | null;
    state_province: string | null;
    country: string | null;
    postal_code: string | null;
    longitude: number | null;
    latitude: number | null;
    phone: string | null;
    website_url: string | null;
    street: string | null;
}

export interface BreweryState {
    breweries: Brewery[];
    selected: string[];
    visible: Brewery[];
    page: number;
    loading: boolean;
    errorMsg: string;
    fetchDataBreweries: () => Promise<void>;
    toggleSelect: (id: string) => void;
    clearSelect: () => void;
    deleteSelectItems: () => void;
    setPage: () => void;
}
