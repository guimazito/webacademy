// confirm('Deseja continuar?');
// console.log(prompt('Qual o seu nome?'));

document.writeln('oi')

// window: tela do navegador que exibe o site
// document: objeto que representa o documento HTML

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'pie', // Tipo de gráfico (pode ser 'line', 'pie', etc.)
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], // Rótulos do eixo X
        datasets: [{
            label: 'Vendas',
            data: [12, 19, 3, 5, 2], // Dados do gráfico
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Começa o eixo Y no zero
            }
        }
    }
});

const image = document.querySelector('img');
image.addEventListener('mouseover', function() {
    image.title = 'Você passou o mouse sobre a imagem!';
    image.style.transform = 'scale(1.1)';
});

image.addEventListener('mouseout', function() {
    image.style.transform = 'scale(1.0)';
});