'use client';

import Link from 'next/link';
import Image from 'next/image';
import cls from './Card.module.css';
import { CardProps } from './Card.interface';
import { useState } from 'react';
import useBreweriesStore from '@/store/breweryStore';

import cn from 'classnames';

export default function Card({ id, name, country, city }: CardProps) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const toggleSelect = useBreweriesStore((state) => state.toggleSelect);

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(e.target.checked);
        toggleSelect(id);
    }

    function handleRightClick(e: React.MouseEvent) {
        e.preventDefault();
        setIsChecked((prevState) => !prevState);
        toggleSelect(id);
    }

    return (
        <div
            className={cn(cls.card, {
                [cls.selected]: isChecked === true,
            })}
            onContextMenu={handleRightClick}
        >
            <p className={cls.name}>{name}</p>
            <p className={cls.city}>
                {country}, {city}
            </p>
            <Image src="/beerCard.png" alt="beer-card" width={150} height={150} />
            <Link href={`/brewery/${id}`} className={cls.link}>
                <span className={cls.more}>More details ➜</span>
            </Link>
            {isChecked && (
                <input
                    type="checkbox"
                    className={cls.input}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            )}
        </div>
    );
}
