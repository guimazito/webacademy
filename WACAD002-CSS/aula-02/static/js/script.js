function testeFuncao() {
    alert('oi');
}

(function () {
    const buttons = document.getElementsByTagName("button");
    const paragraph = document.getElementById("paragraph2")

    for (let i = 0; buttons.length; i++) {
        buttons[i].onclick = function(e) {
            // paragraph.style.display = e.target.innerHTML;
            if (e.target.innerHTML === 'None') {
                paragraph.className = 'escondido';
            } else {
                paragraph.className = 'paragraph2';
                // paragraph.removeAttribute('class');
            }
        }
    }
/* adicionando () ao final da função, ele é envocada 
automaticamente ao final da execução*/
})()

