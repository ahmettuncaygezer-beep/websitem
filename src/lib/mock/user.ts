// lib/mock/user.ts

export interface MockUser {
    id: string;
    name: string;
    email: string;
    role: string;
    initials: string;
    avatar?: string;
}

export const mockUser: MockUser = {
    id: 'usr_01',
    name: 'Admin',
    email: 'admin@selishome.com',
    role: 'Administrator',
    initials: 'AD',
};
