import { supabaseAdmin } from './server';

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || 'portfolio-images';

export interface UploadResult {
    url: string;
    path: string;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
    file: File,
    folder: 'services' | 'projects' | 'skills' = 'projects'
): Promise<UploadResult> {
    try {
        // Generate unique filename
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // Upload to Supabase Storage
        const { data, error } = await supabaseAdmin.storage
            .from(BUCKET_NAME)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error('Supabase storage upload error:', error);
            throw new Error(`Failed to upload file: ${error.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        return {
            url: publicUrl,
            path: filePath,
        };
    } catch (error) {
        console.error('Upload file error:', error);
        throw error;
    }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(filePath: string): Promise<void> {
    try {
        // Extract path from URL if full URL is provided
        let path = filePath;
        if (filePath.includes(BUCKET_NAME)) {
            const urlParts = filePath.split(`${BUCKET_NAME}/`);
            path = urlParts[1] || filePath;
        }

        const { error } = await supabaseAdmin.storage
            .from(BUCKET_NAME)
            .remove([path]);

        if (error) {
            console.error('Supabase storage delete error:', error);
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    } catch (error) {
        console.error('Delete file error:', error);
        // Don't throw error for delete failures - file might not exist
    }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(filePath: string): string {
    const { data } = supabaseAdmin.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return data.publicUrl;
}
