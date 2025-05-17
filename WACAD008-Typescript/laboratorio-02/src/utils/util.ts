export function ramdom(min: number, max: number): number {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

export default {
    ramdom
}