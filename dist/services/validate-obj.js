"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNote(obj, keysObj, isEditing = false) {
    if (typeof obj !== "object")
        throw new Error("Sent data is not an object");
    if (Object.keys(obj).length !== Object.keys(keysObj).length && !isEditing)
        throw new Error(`Wrong fields provided, fields must be: ${Object.keys(keysObj).join(", ")}`);
    for (const key in obj) {
        if (keysObj[key] === undefined) {
            throw new Error(`${key} is not a valid property`);
        }
        if (typeof obj[key] !== typeof keysObj[key]) {
            throw new Error(`${key} value must be ${typeof keysObj[key]}`);
        }
    }
    return true;
}
exports.default = isNote;
//# sourceMappingURL=validate-obj.js.map