export default function MakeDialog({ onClose, children }: { onClose: () => void, children: React.ReactNode }) {
    return (
        <div 
            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}