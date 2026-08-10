'use client';
// 'use client' justification: Uses React 19 useActionState and useFormStatus hooks for form state & pending UI, plus client-side file thumbnail previews.

import { useState, useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Upload, X, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import { createPropertyAction } from '@/app/admin/properties/actions';

/**
 * Subcomponent for submit button that uses useFormStatus() to reactively reflect pending state.
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-accent w-full sm:w-auto py-2.5 px-6 font-medium text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading & Creating Property...
        </>
      ) : (
        'Create Property Listing'
      )}
    </button>
  );
}

export default function AddPropertyForm({ onSuccess }) {
  const [state, formAction] = useActionState(createPropertyAction, { success: false });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  // Rule justification: useEffect used solely for revoking object URLs to prevent browser memory leaks on unmount/file updates.
  useEffect(() => {
    return () => {
      previews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    };
  }, [previews]);

  // Rule justification: useEffect used solely to trigger modal close callback when Server Action returns success: true.
  useEffect(() => {
    if (state.success && typeof onSuccess === 'function') {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  /**
   * Updates native file input files list using DataTransfer object
   * so FormData extracts the exact selectedFiles list on submission.
   */
  const updateFileInput = (files) => {
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  /**
   * Handle image file selection with 6 max files cap & preview generation
   */
  const handleFileChange = (e) => {
    setImageError('');
    const newFiles = Array.from(e.target.files || []);

    if (newFiles.length === 0) return;

    const totalFiles = [...selectedFiles, ...newFiles];

    if (totalFiles.length > 6) {
      setImageError('You can upload a maximum of 6 images per property.');
    }

    const cappedFiles = totalFiles.slice(0, 6);

    // Revoke old previews
    previews.forEach((url) => URL.revokeObjectURL(url));

    // Create new preview object URLs
    const newPreviews = cappedFiles.map((file) => URL.createObjectURL(file));

    setSelectedFiles(cappedFiles);
    setPreviews(newPreviews);
    updateFileInput(cappedFiles);
  };

  /**
   * Remove individual image from selection
   */
  const removeImage = (indexToRemove) => {
    URL.revokeObjectURL(previews[indexToRemove]);

    const updatedFiles = selectedFiles.filter((_, idx) => idx !== indexToRemove);
    const updatedPreviews = previews.filter((_, idx) => idx !== indexToRemove);

    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setImageError('');
    updateFileInput(updatedFiles);
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Top-level Success / Error Banner */}
      {state.message && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${
            state.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-semibold">{state.success ? 'Success' : 'Error'}</p>
            <p className="text-xs mt-0.5">{state.message}</p>
          </div>
        </div>
      )}

      {/* Grid: Basic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Property Title *
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Skyline Penthouse Suite"
            required
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
          {state.errors?.title && (
            <p className="text-xs text-rose-600 mt-1">{state.errors.title}</p>
          )}
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Property Type *
          </label>
          <select
            name="propertyType"
            defaultValue="Apartment"
            required
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          >
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
            <option value="Townhouse">Townhouse</option>
          </select>
          {state.errors?.propertyType && (
            <p className="text-xs text-rose-600 mt-1">{state.errors.propertyType}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Listing Status *
          </label>
          <select
            name="status"
            defaultValue="For Sale"
            required
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          >
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Off-Plan">Off-Plan</option>
          </select>
          {state.errors?.status && (
            <p className="text-xs text-rose-600 mt-1">{state.errors.status}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            min="1"
            placeholder="e.g. 2500000"
            required
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
          {state.errors?.price && (
            <p className="text-xs text-rose-600 mt-1">{state.errors.price}</p>
          )}
        </div>

        {/* Area */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Area (Sq Ft) *
          </label>
          <input
            type="number"
            name="area"
            min="1"
            placeholder="e.g. 4500"
            required
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
          {state.errors?.area && (
            <p className="text-xs text-rose-600 mt-1">{state.errors.area}</p>
          )}
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            min="0"
            defaultValue="0"
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            name="bathrooms"
            min="0"
            defaultValue="0"
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
        </div>

        {/* Location Address */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Address *
          </label>
          <input
            type="text"
            name="address"
            placeholder="e.g. 12 Marina Walk"
            required
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
          {state.errors?.address && (
            <p className="text-xs text-rose-600 mt-1">{state.errors.address}</p>
          )}
        </div>

        {/* Location City */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            City *
          </label>
          <input
            type="text"
            name="city"
            placeholder="e.g. Dubai"
            required
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
          {state.errors?.city && (
            <p className="text-xs text-rose-600 mt-1">{state.errors.city}</p>
          )}
        </div>

        {/* Country */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            defaultValue="UAE"
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
          Property Description *
        </label>
        <textarea
          name="description"
          rows="4"
          placeholder="Describe the property's key selling points, layout, amenities, and surroundings..."
          required
          className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
        />
        {state.errors?.description && (
          <p className="text-xs text-rose-600 mt-1">{state.errors.description}</p>
        )}
      </div>

      {/* Features */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
          Features (Comma Separated)
        </label>
        <input
          type="text"
          name="features"
          placeholder="e.g. Private Pool, Sea View, Gym, Balcony, Covered Parking"
          className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
        />
      </div>

      {/* Image Upload Area */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-neutral-700 uppercase">
          Property Images (Max 6) *
        </label>

        {/* File Dropzone / Input */}
        <div className="border-2 border-dashed border-neutral-300 hover:border-accent rounded-xl p-6 text-center transition-all bg-neutral-50/50 hover:bg-white relative">
          <input
            type="file"
            name="images"
            ref={fileInputRef}
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
            <div className="p-3 bg-neutral-100 rounded-full text-neutral-600">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-neutral-800">
              Click or drag image files here to upload
            </p>
            <p className="text-xs text-neutral-500">
              Supports PNG, JPG, or WEBP (up to 5MB each, max 6 images)
            </p>
          </div>
        </div>

        {/* Image Error Messages */}
        {(imageError || state.errors?.images) && (
          <p className="text-xs text-rose-600 font-medium">
            {imageError || state.errors.images}
          </p>
        )}

        {/* Selected Image Previews Grid */}
        {previews.length > 0 && (
          <div className="pt-2">
            <p className="text-xs text-neutral-500 mb-2">
              Selected ({previews.length}/6 images):
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-neutral-900/75 hover:bg-rose-600 text-white rounded-full transition-all shadow"
                    title="Remove image"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[10px] bg-neutral-900/60 text-white px-1.5 py-0.5 rounded font-mono">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Is Featured Checkbox */}
      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          value="true"
          className="h-4 w-4 text-accent border-neutral-300 rounded focus:ring-accent"
        />
        <label htmlFor="isFeatured" className="text-xs text-neutral-700 font-medium cursor-pointer">
          Feature this listing on the homepage showcase
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end border-t border-neutral-100 pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
