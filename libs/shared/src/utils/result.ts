
export interface ResultError {
    readonly status?: number;
    readonly code: string;
    readonly message: string;
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

    public static fail<U>(error: ResultError): Result<U> {
        return new Result<U>(false, error);
    }
}

