function createLink(filename) {
    return `<a href="${filename}">${filename}</a><br>\n`;
}

function goHome() {
    return `<a href='/'>Voltar</a><br>`;
}

module.exports = {
    createLink,
    goHome
};