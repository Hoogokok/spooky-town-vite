import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResult {
    data: {
        token: string | undefined;
        user: {
            id: string | undefined;
            email: string | undefined;
        } | null;
    } | null;
    error: string | null;
}

export async function loginUser({ email, password }: LoginCredentials): Promise<LoginResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return {
            data: null,
            error: error.message || '이메일 또는 비밀번호가 일치하지 않습니다'
        }
    }

    return {
        data: {
            token: data.session?.access_token,
            user: {
                id: data.user?.id,
                email: data.user?.email,
            }
        },
        error: null
    }
}

export function getSession() {
    return supabase.auth.getSession();
}

export function onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
} 