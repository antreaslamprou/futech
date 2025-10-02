'use client';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/90">
      <div className="bg-futech-black rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{title || "Are you sure?"}</h2>
        <p className="mb-6">{message || "Do you really want to proceed?"}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
