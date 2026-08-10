'use client';
// 'use client' justification: Manages modal keyboard accessibility (ESC key to close), backdrop clicks, and portal/dialog positioning.

import { useEffect } from 'react';
import { X } from 'lucide-react';
import AddPropertyForm from './AddPropertyForm';

export default function AddPropertyModal({ isOpen, onClose }) {
  // ESC key handler to close modal
  useEffect(() => {
    // Rule justification: useEffect handles global keydown listener for keyboard accessibility (ESC to close).
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto border border-neutral-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
          <div>
            <h2 className="text-xl font-serif font-bold text-neutral-900">
              Add New Property
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Fill in the property details and upload high-resolution listing images.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <AddPropertyForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
