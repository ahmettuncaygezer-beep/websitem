import type { RoomDimensions } from '../types/planner.types';

export interface RoomPreset {
    id: string;
    name: string;
    icon: string;
    room: RoomDimensions;
}

export const ROOM_PRESETS: RoomPreset[] = [
    { id: 'salon', name: 'Salon', icon: '🛋', room: { width: 5, depth: 4, height: 2.6, wallColor: '#F5F0EB', floorType: 'parquet', floorColor: '#C4A882' } },
    { id: 'yatak', name: 'Yatak Odası', icon: '🛏', room: { width: 4, depth: 3, height: 2.6, wallColor: '#E8E3DC', floorType: 'parquet', floorColor: '#C4A882' } },
    { id: 'yemek', name: 'Yemek Odası', icon: '🍽', room: { width: 4, depth: 3.5, height: 2.6, wallColor: '#FFFFFF', floorType: 'marble', floorColor: '#F0EDE8' } },
    { id: 'calisma', name: 'Çalışma Odası', icon: '💻', room: { width: 3, depth: 3, height: 2.6, wallColor: '#F5F0EB', floorType: 'parquet', floorColor: '#C4A882' } },
    { id: 'genc', name: 'Genç Odası', icon: '🎮', room: { width: 3, depth: 3.5, height: 2.6, wallColor: '#F0F4F8', floorType: 'carpet', floorColor: '#999' } },
    { id: 'custom', name: 'Özel Boyut', icon: '📐', room: { width: 5, depth: 4, height: 2.6, wallColor: '#F5F0EB', floorType: 'parquet', floorColor: '#C4A882' } },
];
