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
        // Return a proxy that can be called or accessed further
        const noop = () => { };
        return new Proxy(noop, mockHandler);
    },
    apply: (target, thisArg, args) => {
        // If it's a function call, return another proxy to allow chaining
        // or a Promise if it looks like an execution call
        const result = { data: null, error: { message: 'Supabase URL eksik veya geçersiz.' } };

        // This is a bit of a hack to make it "awaitable"
        // Most supabase calls like .from().select() eventually get awaited
        const targetObj = new Proxy(() => { }, mockHandler);
        (targetObj as any).then = (resolve: any) => resolve(result);
        (targetObj as any).catch = (reject: any) => reject(result.error);

        return targetObj;
    }
};

export const supabase = isUrlValid(supabaseUrl)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (new Proxy({}, mockHandler) as any);
