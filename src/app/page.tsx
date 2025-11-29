'use client';

import Map from '@/components/Map';
import useBreweriesStore from '@/store/breweryStore';
import { useEffect } from 'react';

export default function BreweryPage() {
    const breweries = useBreweriesStore((state) => state.breweries);
    const fetchDataBreweries = useBreweriesStore((state) => state.fetchDataBreweries);

    useEffect(() => {
        fetchDataBreweries();
    }, []);

    console.log(breweries);

    return (
        <>
            <Map latitude={35.25738891} longitude={-97.46818222} />
            {breweries.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </>
    );
}
