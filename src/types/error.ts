export class AppError {
    readonly _tag = 'AppError'
    constructor(
        readonly code: string,
        readonly message: string,
        readonly retry?: () => void
    ) { }
}

export class ApiError extends AppError {
    constructor(message: string, retry?: () => void) {
        super('API_ERROR', message, retry)
    }
}

export class NetworkError extends AppError {
    constructor(message: string, retry?: () => void) {
        super('NETWORK_ERROR', message, retry)
    }
} 