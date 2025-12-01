import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';

const geistUbuntu = Ubuntu({
    variable: '--font-ubuntu',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
    title: 'Brewery Explorer',
    description:
        'Interactive brewery list with multi‑selection, deletion, and lazy scroll. Discover and explore breweries easily.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistUbuntu.variable}`}>
                <header className="header">
                    <Header />
                </header>
                <main>
                    <div className="container">{children}</div>
                </main>
            </body>
        </html>
    );
}
