'use server';

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createProperty } from '@/lib/api/properties';
import { uploadPropertyImages } from '@/lib/api/uploads';

/**
 * Server Action for creating a new property listing.
 * Handles validation, image uploading via Cloudinary pipeline, and property creation.
 *
 * @param {Object} prevState - State from useActionState hook
 * @param {FormData} formData - Incoming form data
 * @returns {Promise<{ success: boolean, message?: string, errors?: Record<string, string> }>}
 */
export async function createPropertyAction(prevState, formData) {
  try {
    // ── Step 1: Extract image files ──────────────────────────────────────────
    const rawImages = formData.getAll('images');
    const imageFiles = rawImages.filter(
      (file) => file instanceof File && file.size > 0 && file.name
    );

    // ── Step 2: Validate text fields before making network uploads ───────────
    const title = formData.get('title')?.toString().trim();
    const propertyType = formData.get('propertyType')?.toString().trim();
    const status = formData.get('status')?.toString().trim();
    const priceStr = formData.get('price')?.toString().trim();
    const areaStr = formData.get('area')?.toString().trim();
    const bedroomsStr = formData.get('bedrooms')?.toString().trim();
    const bathroomsStr = formData.get('bathrooms')?.toString().trim();
    const address = formData.get('address')?.toString().trim();
    const city = formData.get('city')?.toString().trim();
    const country = formData.get('country')?.toString().trim() || 'UAE';
    const description = formData.get('description')?.toString().trim();
    const isFeatured = formData.get('isFeatured') === 'true' || formData.get('isFeatured') === 'on';
    const featuresStr = formData.get('features')?.toString().trim() || '';

    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!propertyType) errors.propertyType = 'Property type is required.';
    if (!status) errors.status = 'Status is required.';
    if (!priceStr || isNaN(Number(priceStr)) || Number(priceStr) <= 0) {
      errors.price = 'A valid price greater than 0 is required.';
    }
    if (!areaStr || isNaN(Number(areaStr)) || Number(areaStr) <= 0) {
      errors.area = 'A valid area in sqft greater than 0 is required.';
    }
    if (!address) errors.address = 'Address is required.';
    if (!city) errors.city = 'City is required.';
    if (!description) errors.description = 'Description is required.';

    // Return early if basic text field validation fails
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please resolve the validation errors below.',
        errors,
      };
    }

    // ── Step 3: Validate image presence ──────────────────────────────────────
    if (imageFiles.length === 0) {
      return {
        success: false,
        message: 'At least one property image is required.',
        errors: { images: 'Please select at least one image file.' },
      };
    }

    // ── Step 4: Extract auth cookie for backend authentication ───────────────
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    // ── Step 5: Upload images to Cloudinary via Express backend ──────────────
    const imageFormData = new FormData();
    imageFiles.forEach((file) => {
      imageFormData.append('images', file);
    });

    const uploadRes = await uploadPropertyImages(imageFormData, {
      headers: { Cookie: cookieHeader },
    });

    const imageUrls = uploadRes.urls || [];
    if (imageUrls.length === 0) {
      return {
        success: false,
        message: 'Image upload failed. No URLs were returned.',
        errors: { images: 'Failed to process uploaded images.' },
      };
    }

    // ── Step 6: Create property document in database ─────────────────────────
    const featuresArray = featuresStr
      ? featuresStr.split(',').map((f) => f.trim()).filter(Boolean)
      : [];

    const propertyPayload = {
      title,
      propertyType,
      status,
      price: Number(priceStr),
      area: Number(areaStr),
      bedrooms: Number(bedroomsStr) || 0,
      bathrooms: Number(bathroomsStr) || 0,
      location: {
        address,
        city,
        country,
      },
      description,
      isFeatured,
      features: featuresArray,
      images: imageUrls,
      featuredImage: imageUrls[0] || '',
    };

    await createProperty(propertyPayload, {
      headers: { Cookie: cookieHeader },
    });

    // ── Step 7: Revalidate caches & return success ───────────────────────────
    revalidateTag('properties');
    revalidatePath('/admin/properties');

    return {
      success: true,
      message: 'Property created successfully!',
    };
  } catch (error) {
    console.error('[createPropertyAction error]:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred while creating the property.',
      errors: error.fieldErrors || {},
    };
  }
}
