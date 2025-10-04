export function log(msg: string) {
    return console.log(`[sniper] ${msg}`);
}

export function error(msg: string) {
    return console.error(`[sniper] ${msg}`);
}

export function info(msg: string) {
    return console.log(`[sniper] ${msg}`);
}

export function sleep(ms = 1000): Promise<void> {
    return new Promise((resolve) => { setTimeout(resolve, ms) });
}