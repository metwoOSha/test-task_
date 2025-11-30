'use client';

import { useEffect } from 'react';
import cn from 'classnames';
import Card from '@/components/Card/Card';
import DeleteButton from '@/components/DeleteButton/DeleteButton';
import useBreweriesStore from '@/store/breweryStore';
import cls from './page.module.css';
import { useRouter } from 'next/navigation';

export default function BreweryPage() {
    const router = useRouter();

    const visibleBreweries = useBreweriesStore((state) => state.visibleBreweries);
    const loading = useBreweriesStore((state) => state.loading);
    const shiftBreweries = useBreweriesStore((state) => state.shiftBreweries);
    const clearSelect = useBreweriesStore((state) => state.clearSelect);

    useEffect(() => {
        clearSelect();
    }, []);

    function handleScroll() {
        const scrolled = window.innerHeight + window.scrollY;
        const total = document.documentElement.scrollHeight;

        if (Math.ceil(scrolled) >= total) {
            shiftBreweries();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cls.list}>
            <div className={cls.grid}>
                {visibleBreweries.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(cls.card, {
                            [cls.fullWidth]: index === 4 || index === 9 || index === 14,
                        })}
                        onClick={(e) => {
                            if (e.button === 0) {
                                router.push(`/brewery/${item.id}`);
                            }
                        }}
                    >
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
    );
}
