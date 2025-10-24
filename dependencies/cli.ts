#!/usr/bin/env node

import { Username_Availability, observe_username, snipe_recent_4, snipe_recent_5 } from "./sniper";
import arg from "arg";

function parseArgs(argv: string[]) {
    return arg(
        {
            "--help": Boolean,
            "--api": String,
            "--interval": Number,
            "--timeout": Number,
            "-a": "--api",
            "-i": "--interval",
            "-t": "--timeout"
        },
        { argv }
    );
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const cmd = args._[0];
    const username = args._[1];

    if (!cmd || args["--help"]) {
        console.log(`
Usage:
  sniper check <username> [-a apiUrl]
  sniper observe <username> [-a apiUrl] [-i intervalMs] [-t timeoutMs]
  sniper snipe4 start (this is to snipe 4 letter usernames. (batch of 100 users))
  sniper snipe5 start (this is to snipe 5 letter usernames. (batch of 100 users))

Options:
  -a, --api       Custom API base (e.g. http://localhost:8000/check)
  -i, --interval  Poll interval in ms (default 2000)
  -t, --timeout   Timeout in ms (0 = no timeout)
`);

        process.exit(0);
    }
    if (!username) {
        console.error("please provide a username");
        process.exit(1);
    }

    const api = args["--api"] as string | undefined;
    const interval = args["--interval"] as number | undefined;
    const timeout = args["--timeout"] as number | undefined;


    if (cmd === "check") {
        try {
            const result = await Username_Availability(username, api);

            if (typeof result === "boolean") {
                console.log(
                    result ? `${username} is available`
                        : `Unavailable`
                );
            }
            else if (result?.availability !== undefined) {
                console.log(
                    result.availability ? `${username} is available`
                        : `Unavailable`
                );
            }
            else {
                console.log(`Could not determine the status of ${username}`);
            }
        } catch (error) {
            console.log(error);
        }
        process.exit(0);
    }
    else if (cmd === "observe") {
        console.log(`Observing ${username}`);
        try {
            await observe_username(username, { api, intervalMs: interval, timeoutMs: timeout });
        } catch (error) {
            console.log(`Fatal error: ${error}`);
        }
        process.exit(0);
    }
    else if (cmd === "snipe4") {
        console.log("successfully executed.");
        try {
            await snipe_recent_4();
        } catch (error: any) {
            console.log("something went wrong");
        }
    }
    else if (cmd === "snipe5") {
        console.log("successfully executed");
        try {
            await snipe_recent_5();
        } catch (error: any) {
            console.log("something went wrong");
        }
    }
    else {
        console.log("cmd not found");
        process.exit(1);
    }
}

main().catch((error) => {
    console.log(`Fatal: ${error}`);
    process.exit(1);
})