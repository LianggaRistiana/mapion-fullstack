
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

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="MAP" />
            <Map></Map>
        </AppLayout>
    );
}
