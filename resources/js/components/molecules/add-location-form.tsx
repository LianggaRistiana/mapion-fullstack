import { useForm } from '@inertiajs/react';
import { router, usePage } from '@inertiajs/react';



interface AddLocationFormProps {
    latlng?: [number, number];
    onCancel: () => void; // Menambahkan prop onCancel untuk menutup atau membatalkan form
    onSave: () => void; // Menambahkan prop onCancel untuk menutup atau membatalkan form
}

export default function AddLocationForm({ latlng, onCancel, onSave }: AddLocationFormProps) {
    // Inisialisasi form menggunakan useForm dari Inertia
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        desc: '',
        lat: latlng ? latlng[0] : 0,
        lng: latlng ? latlng[1] : 0,
    });

    // Handle submit form
    const handleSubmit = (e: React.FormEvent) => {
        onSave();
        e.preventDefault();
        post(route('locations.store'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title input */}
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="border p-2 w-full mt-1"
                />
                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
            </div>

            {/* Description input */}
            <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                    type="text"
                    value={data.desc}
                    onChange={(e) => setData('desc', e.target.value)}
                    className="border p-2 w-full mt-1"
                />
                {errors.desc && <div className="text-red-500 text-xs mt-1">{errors.desc}</div>}
            </div>

            {/* Latitude input */}
            <div>
                <label className="block text-sm font-medium">Latitude</label>
                <input
                    type="number"
                    value={data.lat}
                    disabled
                    className="border p-2 w-full mt-1"
                />
            </div>

            {/* Longitude input */}
            <div>
                <label className="block text-sm font-medium">Longitude</label>
                <input
                    type="number"
                    value={data.lng}
                    disabled
                    className="border p-2 w-full mt-1"
                />
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full disabled:bg-blue-300"
            >
                {processing ? 'Saving...' : 'Submit'}
            </button>

        </form>
    );
}
