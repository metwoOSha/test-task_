import Map from '@/components/Map';

import cls from './SelectedBreweryPage.module.css';

export default async function SelectedBreweryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/breweries/${id}`);
    const brewery = await res.json();

    return (
        <div className={cls.wrapper}>
            <div className={cls.card}>
                <h2 className={cls.title}>{brewery.name}</h2>

                <span className={cls.type}>{brewery.brewery_type.toUpperCase()}</span>

                <div className={cls.infoBlock}>
                    <p className={cls.label}>Address:</p>
                    <p className={cls.text}>
                        {brewery.address_1}, {brewery.city}, {brewery.state_province},{' '}
                        {brewery.postal_code}
                    </p>
                </div>

                <div className={cls.infoBlock}>
                    <p className={cls.label}>Country:</p>
                    <p className={cls.text}>{brewery.country}</p>
                </div>

                <div className={cls.infoBlock}>
                    <p className={cls.label}>Coordinates:</p>
                    <p className={cls.text}>
                        {brewery.latitude}, {brewery.longitude}
                    </p>
                </div>

                {brewery.phone && (
                    <div className={cls.infoBlock}>
                        <p className={cls.label}>Phone:</p>
                        <a href={`tel:${brewery.phone}`} className={cls.link}>
                            {brewery.phone}
                        </a>
                    </div>
                )}

                {brewery.website_url && (
                    <div className={cls.infoBlock}>
                        <p className={cls.label}>WebSite:</p>
                        <a href={brewery.website_url} target="_blank" className={cls.link}>
                            {brewery.website_url}
                        </a>
                    </div>
                )}
            </div>
            {brewery.latitude && brewery.longitude ? (
                <div className={cls.map}>
                    <p>Our location:</p>
                    <div className={cls.mapBlock}>
                        <Map latitude={brewery.latitude} longitude={brewery.longitude} />
                    </div>
                </div>
            ) : (
                <div>No data location</div>
            )}
        </div>
    );
}
