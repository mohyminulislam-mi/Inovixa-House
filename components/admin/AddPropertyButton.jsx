'use client';
// 'use client' justification: Manages local open/close boolean state for the modal dialog (pure UI interactivity, not data fetching).

import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddPropertyModal from './AddPropertyModal';

export default function AddPropertyButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-accent text-sm py-2 px-4 whitespace-nowrap flex items-center gap-1.5 transition-all shadow-sm hover:shadow"
      >
        <Plus className="h-4 w-4" />
        Add Property
      </button>

      {isOpen && (
        <AddPropertyModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
