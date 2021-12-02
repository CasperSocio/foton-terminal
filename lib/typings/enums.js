"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EUtilities = exports.EForeground = exports.EBackground = void 0;
var EBackground;
(function (EBackground) {
    EBackground["black"] = "\u001B[40m";
    EBackground["blue"] = "\u001B[44m";
    EBackground["green"] = "\u001B[42m";
    EBackground["red"] = "\u001B[41m";
    EBackground["white"] = "\u001B[47m";
    EBackground["yellow"] = "\u001B[43m";
})(EBackground = exports.EBackground || (exports.EBackground = {}));
var EForeground;
(function (EForeground) {
    EForeground["black"] = "\u001B[30m";
    EForeground["blue"] = "\u001B[34m";
    EForeground["green"] = "\u001B[32m";
    EForeground["red"] = "\u001B[31m";
    EForeground["white"] = "\u001B[37m";
    EForeground["yellow"] = "\u001B[33m";
})(EForeground = exports.EForeground || (exports.EForeground = {}));
var EUtilities;
(function (EUtilities) {
    EUtilities["blink"] = "\u001B[5m";
    EUtilities["dim"] = "\u001B[2m";
    EUtilities["hidden"] = "\u001B[8m";
    EUtilities["italic"] = "\u001B[3m";
    EUtilities["reset"] = "\u001B[0m";
    EUtilities["reverse"] = "\u001B[7m";
    EUtilities["strong"] = "\u001B[1m";
    EUtilities["underline"] = "\u001B[4m";
})(EUtilities = exports.EUtilities || (exports.EUtilities = {}));
