import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isUrlValid = (url: string) => {
    try {
        return url.startsWith('http');
    } catch {
        return false;
    }
};

const mockHandler: ProxyHandler<any> = {
    get: (target, prop) => {
        if (prop === 'then') {
            return (resolve: any) => resolve({ data: null, error: { message: 'Supabase URL eksik.' } });
        }
        if (prop === 'catch') {
            return (reject: any) => reject({ message: 'Supabase URL eksik.' });
        }
        const noop = () => { };
        return new Proxy(noop, mockHandler);
    },
    apply: (target, thisArg, args) => {
        const noop = () => { };
        return new Proxy(noop, mockHandler);
    }
};

export const supabase = isUrlValid(supabaseUrl)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (new Proxy({}, mockHandler) as any);
