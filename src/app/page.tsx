'use client';

import Card from '@/components/Card/Card';
import useBreweriesStore from '@/store/breweryStore';

import cls from './page.module.css';
import DeleteButton from '@/components/DeleteButton/DeleteButton';
import { useEffect } from 'react';

export default function BreweryPage() {
    const breweries = useBreweriesStore((state) => state.breweries);
    const clearSelect = useBreweriesStore((state) => state.clearSelect);

    useEffect(() => {
        clearSelect();
    }, [clearSelect]);

    return (
        <>
            <div className="conteiner">
                <div className={cls.list}>
                    <div className={cls.grid}>
                        {breweries.slice(0, 5).map((item) => (
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
                    <div className={cls.deleteBtn}>
                        <DeleteButton />
                    </div>
                </div>
            </div>
        </>
    );
}
