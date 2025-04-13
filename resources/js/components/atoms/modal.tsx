export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">&times;</button>
                {children}
            </div>
        </div>
    );
}
