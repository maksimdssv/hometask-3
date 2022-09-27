export default function isNote(obj: object, keysObj: object, isEditing = false) {
    if (typeof obj !== "object") throw new Error("Sent data is not an object");
    if (Object.keys(obj).length !== Object.keys(keysObj).length && !isEditing) throw new Error(`Wrong fields provided, fields must be: ${Object.keys(keysObj).join(", ")}`);
    for (const key in obj) {
        if (keysObj[key as keyof {}] === undefined) {
            throw new Error(`${key} is not a valid property`);
        }
        if (typeof obj[key as keyof {}] !== typeof keysObj[key as keyof {}]) {
            throw new Error(`${key} value must be ${typeof keysObj[key as keyof {}]}`)
        }
    }
    return true;
}