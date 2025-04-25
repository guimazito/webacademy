const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "Estava fazendo 94 fahrenheit lá fora quando :insertx: decidiu dar uma volta. Assim que chegou :inserty:, parou, arregalou os olhos e então se transformou em uma nuvem de vapor de 300 libras e flutuou lentamente para o céu. Bob assistiu à cena com um gole de :insertz:, sem esboçar reação — :insertx: sempre disse que o calor o fazia 'evaporar', e naquele dia, realmente estava insuportável."

const insertX = [
  "o King Kong",
  "o Touro de Wall Street",
  "o Hulk",
];

const insertY = [
  "no Cristo Redentor",
  "no Machu Picchu",
  "na Grande Muralha da China",
];

const insertZ = [
  "água de coco",
  "coca-cola",
  "capirinha",
];

randomize.addEventListener('click', result);

  function result() {
    var newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(':insertx:', `<strong style="color: orange;">${xItem}</strong>`);
    newStory = newStory.replace(':inserty:', `<strong style="color: green;">${yItem}</strong>`);
    newStory = newStory.replace(':insertz:', `<strong style="color: brown;">${zItem}</strong>`);

    if(customName.value !== '') {
      const name = customName.value;
      newStory = newStory.replace('Bob', name);
    }

    if(document.getElementById("uk").checked) {
      const weightInPounds = 300;
      const weight = Math.round(weightInPounds / 14) + ' stone';
      const temperature = Math.round((94 - 32) * (5 / 9)) + ' centígrados';
      newStory = newStory.replace('300 libras', weight);
      newStory = newStory.replace('94 fahrenheit', temperature);
    }

    story.innerHTML = newStory;
    story.style.visibility = 'visible';
  }