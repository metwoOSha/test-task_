'use client';

import Card from '@/components/Card/Card';
import useBreweriesStore from '@/store/breweryStore';

import cls from './page.module.css';
import { useEffect } from 'react';
import DeleteButton from '@/components/DeleteButton/DeleteButton';

export default function BreweryPage() {
    const breweries = useBreweriesStore((state) => state.breweries);
    const loading = useBreweriesStore((state) => state.loading);
    const clearSelect = useBreweriesStore((state) => state.clearSelect);
    const setPage = useBreweriesStore((state) => state.setPage);
    const fetchDataBreweries = useBreweriesStore((state) => state.fetchDataBreweries);

    useEffect(() => {
        clearSelect();
    }, [clearSelect]);

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight
        ) {
            setPage();
            fetchDataBreweries();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="conteiner">
                <div className={cls.list}>
                    <div className={cls.grid}>
                        {breweries.map((item) => (
                            <div key={item.id}>
                                <Card
                                    id={item.id}
                                    name={item.name}
                                    country={item.country}
                                    city={item.city}
                                />
                            </div>
                        ))}
                    </div>
                    {loading && <p className={cls.loading}>Loading...</p>}
                    <DeleteButton />
                </div>
            </div>
        </>
    );
}
