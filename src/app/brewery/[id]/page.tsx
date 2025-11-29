export default async function SelectedBreweryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <div>{id}</div>;
}
