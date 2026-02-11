
export interface ResultError {
    readonly status?: number;
    readonly code: string;
    readonly message: string;
    readonly details?: any;
};

export const ErrorNone: ResultError = {
    code: "",
    message: ""
};


export class Result<T> {
    private readonly _isSuccess: boolean;
    private readonly _error?: ResultError;
    private readonly _value?: T | null;

    private constructor(isSuccess: boolean, error?: ResultError, value: T | null = null) {
        this._isSuccess = isSuccess;
        this._error = error;
        this._value = value;

        Object.freeze(this);
    }

    public get isSuccess(): boolean {
        return this._isSuccess;
    }

    get value(): T | null {
        if (!this.isSuccess) {
            throw new Error("Can't get the value from an error result.");
        }
        return this._value as T;
    }

    get error(): ResultError {
        if (this.isSuccess) {
            throw new Error("Can't get the error from a success result.");
        }
        return this._error as ResultError;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, ErrorNone, value);
    }

    //With data
    public static success<U>(message: string, data: U): Result<{ message: string; data: U }>;
    // Without data (message only)
    public static success(message: string): Result<{ message: string }>;
    // Implementation
    public static success<U>(message: string, data?: U): Result<{ message: string; data?: U }> {
        if (data !== undefined) {
            return new Result<{ message: string; data: U }>(true, ErrorNone, { message, data });
        }
        return new Result<{ message: string }>(true, ErrorNone, { message });
    }

    public static fail<U>(error: ResultError): Result<U> {
        return new Result<U>(false, error);
    }

    public toJSON() {
        return {
            ...this._error,
        };
    }
}

