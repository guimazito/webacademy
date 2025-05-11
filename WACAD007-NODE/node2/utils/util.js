export function createLink(filename) {
    return `<a href="${filename}">${filename}</a><br>\n`;
}

export function goHome() {
    return `<a href='/'>Voltar</a><br>`;
}

export default {
    createLink,
    goHome
};