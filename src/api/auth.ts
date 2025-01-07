import { createClient } from '@supabase/supabase-js'
import { loginSchema, type LoginInput, signupSchema, type SignupInput } from './schemas/auth'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface LoginResult {
    data: {
        token: string | undefined;
        user: {
            id: string | undefined;
            email: string | undefined;
        } | null;
    } | null;
    error: string | null;
    validationError?: {
        email?: string[];
        password?: string[];
    };
}

export async function loginUser(credentials: LoginInput): Promise<LoginResult> {
    const validation = loginSchema.safeParse(credentials)

    if (!validation.success) {
        return {
            data: null,
            error: null,
            validationError: validation.error.flatten().fieldErrors
        }
    }

    const { data, error } = await supabase.auth.signInWithPassword(validation.data)

    if (error) {
        return {
            data: null,
            error: error.message || '이메일 또는 비밀번호가 일치하지 않습니다',
            validationError: undefined
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
        error: null,
        validationError: undefined
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

interface SignupResult {
    data: {
        token: string | undefined;
        user: {
            id: string | undefined;
            email: string | undefined;
        } | null;
    } | null;
    error: string | null;
    validationError?: {
        email?: string[];
        password?: string[];
        name?: string[];
    };
}

export async function signupUser({ email, password, name, passwordConfirm: _ }: SignupInput): Promise<SignupResult> {
    const validation = signupSchema.safeParse({ email, password, passwordConfirm: _, name })

    if (!validation.success) {
        return {
            data: null,
            error: null,
            validationError: validation.error.flatten().fieldErrors
        }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name
            }
        }
    })

    if (error) {
        return {
            data: null,
            error: error.message || '회원가입에 실패했습니다',
            validationError: undefined
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
        error: null,
        validationError: undefined
    }
} 