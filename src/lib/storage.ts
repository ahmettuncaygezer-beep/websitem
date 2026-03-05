import { createSupabaseBrowserClient } from './supabase-browser';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

// Turkish character map for filename sanitization
const trMap: Record<string, string> = {
    'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u', 'ş': 's', 'Ş': 's',
    'ı': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c',
    'â': 'a', 'î': 'i', 'û': 'u', 'Â': 'a', 'Î': 'i', 'Û': 'u',
};

function sanitizeFilename(name: string): string {
    return name
        .split('')
        .map(c => trMap[c] ?? c)
        .join('')
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '-')
        .replace(/-+/g, '-');
}

function generateUniqueFilename(originalName: string): string {
    const ext = originalName.split('.').pop() || 'jpg';
    const rand = Math.random().toString(36).substring(2, 8);
    const ts = Date.now();
    return `${ts}-${rand}.${ext}`;
}

/**
 * Upload an image file to Supabase Storage.
 * Returns the public URL of the uploaded file.
 */
export async function uploadImage(
    file: File,
    bucket: string,
    folder?: string
): Promise<string> {
    const supabase = createSupabaseBrowserClient();
    const filename = generateUniqueFilename(sanitizeFilename(file.name));
    const path = folder ? `${folder}/${filename}` : filename;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw new Error(`Yükleme hatası: ${error.message}`);
    }

    // Return the public URL
    const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return urlData.publicUrl;
}

/**
 * Delete an image from Supabase Storage using its public URL.
 */
export async function deleteImage(url: string, bucket: string): Promise<void> {
    const supabase = createSupabaseBrowserClient();

    // Extract the file path from the public URL
    // URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) {
        throw new Error('Geçersiz dosya URL\'si');
    }
    const filePath = decodeURIComponent(url.substring(idx + marker.length));

    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (error) {
        throw new Error(`Silme hatası: ${error.message}`);
    }
}

/**
 * List all files in a Supabase Storage bucket/folder.
 */
export async function listFiles(
    bucket: string,
    folder?: string
): Promise<{
    name: string;
    url: string;
    size: number;
    createdAt: string;
    mimeType: string;
}[]> {
    const supabase = createSupabaseBrowserClient();

    const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder || '', {
            limit: 200,
            sortBy: { column: 'created_at', order: 'desc' },
        });

    if (error) {
        throw new Error(`Listeleme hatası: ${error.message}`);
    }

    return (data || [])
        .filter(f => f.name && !f.name.startsWith('.'))
        .map(f => {
            const path = folder ? `${folder}/${f.name}` : f.name;
            const { data: urlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(path);

            return {
                name: f.name,
                url: urlData.publicUrl,
                size: (f.metadata as any)?.size || 0,
                createdAt: f.created_at || '',
                mimeType: (f.metadata as any)?.mimetype || 'image/jpeg',
            };
        });
}

/**
 * Get the public URL of a file in a bucket.
 */
export function getPublicUrl(bucket: string, path: string): string {
    const supabase = createSupabaseBrowserClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}

// Allowed image formats
export const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImageFile(file: File): string | null {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return 'Desteklenmeyen format. JPG, PNG, WebP veya AVIF kullanın.';
    }
    if (file.size > MAX_FILE_SIZE) {
        return `Dosya çok büyük (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimum 5MB.`;
    }
    return null;
}
