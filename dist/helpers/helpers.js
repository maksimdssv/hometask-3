"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrDate = void 0;
const monthNumToStr = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};
function getCurrDate() {
    const currDate = new Date();
    return `${monthNumToStr[currDate.getMonth()]} ${currDate.getDate()}, ${currDate.getFullYear()}`;
}
exports.getCurrDate = getCurrDate;
