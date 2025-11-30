import Image from 'next/image';

import cls from './Header.module.css';

export default function Header() {
    return (
        <div className={cls.header}>
            <div className="conteiner">
                <div className={cls.wrapper}>
                    <div className={cls.pos}>
                        <h1>Where Good Beer Lives</h1>
                        <div className={cls.img}>
                            <Image src="/beer.png" alt="beer" width={45} height={45} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
