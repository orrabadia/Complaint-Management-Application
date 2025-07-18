type Props = {
    isOpen: boolean;
    content: string;
    onClose: () => void;
};

export default function ViewMoreModal({ isOpen, content, onClose }: Props) {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0  z-100 flex items-center justify-center bg-black bg-opacity-10">
      <div className="bg-white rounded-lg p-6 max-w-lg max-h-[80vh] w-full relative shadow-lg overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-blue-600 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Full Complaint</h2>
        <p className="whitespace-pre-wrap break-words text-gray-800">{content}</p>
      </div>
    </div>
  );
}