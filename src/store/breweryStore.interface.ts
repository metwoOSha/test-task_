export interface Brewery {
    id: string;
    name: string;
    brewery_type: string;
    address_1: string;
    address_2: string | null;
    address_3: string | null;
    city: string;
    state_province: string;
    country: string;
    postal_code: string;
    longitude: number;
    latitude: number;
    phone: string;
    website_url: string;
    street: string;
}

export interface BreweryState {
    breweries: Brewery[];
    page: number;
    loading: boolean;
    fetchDataBreweries: () => void;
}
