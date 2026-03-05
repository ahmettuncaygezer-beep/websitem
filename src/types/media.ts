export type MediaType = 'image' | 'video' | 'pdf' | 'document' | 'other';

export interface MediaFolder {
    id: string;
    name: string;
    parentId: string | null;
    children?: MediaFolder[];
    fileCount: number;
    createdAt: string;
}

export interface MediaFile {
    id: string;
    name: string;
    originalName: string;
    type: MediaType;
    mimeType: string;
    url: string;
    thumbnailUrl?: string;
    size: number; // bytes
    width?: number; // for images
    height?: number; // for images
    duration?: number; // for video (seconds)
    pages?: number; // for pdf
    folderId: string;
    altText: string;
    tags: string[];
    uploadedBy: {
        id: string;
        name: string;
        avatar: string;
    };
    usages: MediaUsage[];
    createdAt: string;
    updatedAt: string;
}

export interface MediaUsage {
    type: 'product' | 'blog' | 'page' | 'category';
    id: string;
    name: string;
    url: string;
}

// Empty defaults — media components should fetch from Supabase storage
export const mockMediaFiles: MediaFile[] = [];
export const mockMediaFolders: MediaFolder[] = [];

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
