import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface LoginCredentials {
    email: string;
    password: string;
}

export async function loginUser({ email, password }: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        throw new Error(error.message || '이메일 또는 비밀번호가 일치하지 않습니다');
    }

    return {
        token: data.session?.access_token,
        user: {
            id: data.user?.id,
            email: data.user?.email,
        }
    };
}

export function getSession() {
    return supabase.auth.getSession();
}

export function onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
} 