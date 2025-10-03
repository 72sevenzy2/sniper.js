"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
exports.error = error;
exports.info = info;
exports.sleep = sleep;
function log(msg) {
    return console.log(`[sniper] ${msg}`);
}
function error(msg) {
    return console.error(`[sniper] ${msg}`);
}
function info(msg) {
    return console.log(`[sniper] ${msg}`);
}
function sleep(ms = 1000) {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}
