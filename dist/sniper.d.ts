export declare function Username_Availability(username: string, customApi?: string): Promise<{
    availability: boolean;
    raw?: any;
    error?: string;
}>;
export declare function check_username(username: string, customApi?: string): Promise<{
    availability: boolean;
    raw?: any;
    error?: string;
}>;
export declare function observe_username(username: string, opts?: {
    api?: string;
    intervalMs?: number;
    timeoutMs?: number;
}): Promise<{
    availability: boolean;
    raw?: any;
    error?: string;
}>;
