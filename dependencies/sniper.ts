import { sleep, error, info, log } from "./utils";


// creating a endpoint fetch function initially
async function getFetch() {
    if (typeof globalThis.fetch === "function") { return globalThis.fetch.bind(globalThis); }

    try {
        const nf = await import("node-fetch");
        return nf.default;
    }
    catch (e) {
        try {
            const ud = await import("undici");
            return ud.fetch;
        } catch (error) {
            throw new Error("no fetch available, please use node 18+ or install node-fetch/unidici");
        }
    }
}

export async function Username_Availability(username: string, customApi?: string)
    : Promise<{ availability: boolean; raw?: any; error?: string }> {
    const f = await getFetch();
    if (!username) { return { availability: false, error: "empty username" }; }

    if (customApi) {
        const url = `${customApi}${customApi.includes('?') ? "&" : "?"}username=${encodeURIComponent(username)}`;
        try {
            const response = await f(url, { method: "GET" });
            if (!response.ok && response.status === 404) { return { availability: true, raw: { status: 404 } }; }

            const json = await response.json().catch(() => null);

            if (json && typeof json.taken === "boolean") {
                return { availability: !json.taken, raw: json };
            }
            if (json && typeof json.code === "number") {
                return { availability: json.code === 0, raw: json };
            }
            return { availability: !!(json && json.availability), raw: json };
        } catch (error: any) {
            return { availability: false, error: String(error) };
        }
    }

    try {
        const url = `https://auth.roblox.com/v1/usernames/validate?request.username=${encodeURIComponent(username)}&request.birthday=2000-01-01&request.context=Signup`;
        const response = await f(url, { method: "GET" });
        const json = await response.json().catch(() => null);

        if (json && typeof json.code === "number") {
            return { availability: json.code === 0, raw: json };
        }
        return { availability: false, raw: json };
    } catch (error: any) {
        return { availability: false, error: String(error) };
    }
}

export async function check_username(username: string, customApi?: string) {
    log(`checking "${username}"...`);
    const result = await Username_Availability(username, customApi);

    if (result.error) {
        error(`error "${username}" : ${result.error}`);
        return result;
    }

    if (result.availability) {
        console.log(`vailable: ${username}`);
    }
    else {
        console.log(`${username} - taken`);
    }
    return result;
}

export async function observe_username(username: string, opts?:
    { api?: string; intervalMs?: number; timeoutMs?: number }) {
    const api = opts?.api;
    const interval = opts?.intervalMs ?? 2000;
    const timeout = opts?.timeoutMs ?? 0;

    info(`cbserving: ${username} every ${interval}ms${api ? `using api ${api}` : ""}...`);

    const start = Date.now();
    // looping until the username becomes avail
    while (true) {
        const r = await Username_Availability(username, api);
        if (r.error) {
            error(`check error ${r.error}`);
        }
        else if (r.availability) {
            console.log(`${username} is available.`);
            return r;
        }
        else {
            console.log(`${username} not available yet...`);
        }

        if (timeout > 0 && Date.now() - start >= timeout) {
            error(`timeout reached (${timeout}ms). stopped observing.`);
            return { availability: false, raw: null, error: "timeout" };
        }

        await sleep(interval);
    }
}

export async function snipe_recent_4() {
    const base = 100;
    const length = 4;
    const chars = "abcdefghijklmnopqrstuvwxyz";

    for (let j = 0; j < base; j++) {
        let username = "";
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            username += chars[index];
        }
        try {
            const result = await Username_Availability(username);
            if (result.availability) {
                console.log(`${username} is available.`);
                return result;
            } else {
                console.log(`${username} is taken`);
            }
        } catch (error: any) {
            console.log(`error checking ${username}`);
        }
    }
    console.log("no available usernames found in this batch.");
    return null;
}

export async function snipe_recent_5() {
    const chars = "abcdefghiklmnopqrstuvwxyz";
    const base = 100;
    const length = 5;

    for (let j = 0; j < base; j++) {
        let username = "";
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            username += chars[index];
        }

        try {
            const result = await Username_Availability(username);
            if (result.availability) {
                console.log(`${username} is available`);
                return result;
            }
            else {
                console.log(`${username} is not available`);
            }
        } catch (error: any) {
            console.log(`error checking ${username}`);
        }
    }
}