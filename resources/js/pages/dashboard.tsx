
import Map from '@/components/organisms/map';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'dashboard',
        href: '/dashboard',
    },
];

type Location = {
    id: number;
    created_at: string;
    title: string;
    desc: string;
    lat: number;
    lng: number;
};

type Props = {
    locations: Location[]; // Declare the locations prop
};


export default function Dashboard({ locations }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="MAP" />
            <Map locations={locations} addMode={true} center={[locations[locations.length - 1].lat, locations[locations.length - 1].lng]}
            />
            <div>
                {locations.map((location) => (
                    <div key={location.id}>
                        {location.title}
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}