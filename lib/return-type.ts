export type ReturnTypeWrapper<TInput, TOutput> = {
    error?: string | null;
    data?: TOutput;
}