export type ReturnType<TOutput> = {
    error?: string | null;
    data?: TOutput;
}