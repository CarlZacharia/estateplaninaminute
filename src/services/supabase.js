import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Bypass the SDK's navigatorLock entirely — it uses AbortController + setTimeout
    // that causes "signal is aborted without reason" errors, and navigator.locks
    // without a timeout causes deadlocks (non-reentrant locks).
    lock: async (_name, _acquireTimeout, fn) => await fn(),
  },
  global: {
    fetch: (url, options = {}) => {
      const { signal, ...rest } = options;
      return fetch(url, rest);
    },
  },
});
