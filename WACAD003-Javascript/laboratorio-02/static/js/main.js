const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const imageDescriptions = [
  'Necrópole de Gizé [Gizé, Egito]',
  'Taj Mahal [Agra, Índia]',
  'Cristo Redentor [Rio de Janeiro, Brasil]',
  'Machu Picchu [Cusco, Peru]',
  'Coliseu [Roma, Itália]',
];

/* Looping through images */
for (let i = 0 ; i < imageFilenames.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `static/images/${imageFilenames[i]}`);
    newImage.setAttribute('alt', imageDescriptions[i]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', function(e) {
        displayedImage.setAttribute('src', e.target.getAttribute('src'));
        displayedImage.setAttribute('alt', e.target.getAttribute('alt'));
    });

    newImage.addEventListener('mouseover', function(e) {
        const tooltip = document.createElement('div');
        tooltip.textContent = e.target.getAttribute('alt');
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.zIndex = '1000';
        tooltip.classList.add('tooltip');
        document.body.appendChild(tooltip);
    
        newImage.addEventListener('mouseout', function() {
            const existingTooltip = document.querySelector('.tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
        });
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function() {
    if (btn.getAttribute('class') === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});