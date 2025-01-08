import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, '이메일을 입력해주세요')
        .email('올바른 이메일 형식이 아닙니다'),
    password: z
        .string()
        .min(1, '비밀번호를 입력해주세요')
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
})

export type LoginInput = z.infer<typeof loginSchema> 

export const signupSchema = z.object({
    email: z
        .string()
        .min(1, '이메일을 입력해주세요')
        .email('올바른 이메일 형식이 아닙니다'),
    password: z
        .string()
        .min(1, '비밀번호를 입력해주세요')
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, "비밀번호는 최소 하나의 특수문자를 포함해야 합니다")
        .regex(/^(?=.*[a-z]).*$/, "비밀번호는 최소 하나의 소문자를 포함해야 합니다")
        .regex(/^(?=.*[A-Z]).*$/, "비밀번호는 최소 하나의 대문자를 포함해야 합니다")
        .regex(/^(?=.*[0-9]).*$/, "비밀번호는 최소 하나의 숫자를 포함해야 합니다"),
    passwordConfirm: z
        .string()
        .min(1, '비밀번호 확인을 입력해주세요'),
    name: z
        .string()
        .min(1, '별명을 입력해주세요')
        .min(2, '별명은 최소 2자 이상이어야 합니다')
        .max(20, '별명은 최대 20자까지 가능합니다')
}).refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"]
})

export type SignupInput = z.infer<typeof signupSchema> 

export const passwordChangeSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "현재 비밀번호를 입력해주세요"),

    newPassword: z
        .string()
        .min(8, "비밀번호는 8자 이상이어야 합니다")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            "영문, 숫자, 특수문자를 포함해야 합니다"
        ),

    confirmPassword: z
        .string()
        .min(1, "비밀번호 확인을 입력해주세요")
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "새 비밀번호가 일치하지 않습니다",
        path: ["confirmPassword"]
    }
)

export type PasswordChangeInput = z.infer<typeof passwordChangeSchema> 