"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ramdom = ramdom;
function ramdom(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}
exports.default = {
    ramdom
};
