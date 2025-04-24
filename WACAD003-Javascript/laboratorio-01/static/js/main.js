const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day."
const storyText = "Estava fazendo 94 fahrenheit lá fora quando :insertx: decidiu dar uma volta. Assim que chegou à orla de Copacabana, parou, arregalou os olhos e então se transformou em uma nuvem de vapor e flutuou lentamente para o céu. Bob assistiu à cena com um gole de água de coco, sem esboçar reação — :insertx: sempre disse que o calor a fazia 'evaporar', e naquele dia, realmente estava insuportável."

const insertX = [
  "King Kong",
  "Touro de Wall Street",
  "Estátua da Liberdade",
];

const insertY = [
  "Parque Ibirapuera",
  "Ponte do Morumbi",
  "a Avenida Paulista"
];

const insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away"
];

randomize.addEventListener('click', result);

  function result() {
    var newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);

    if(customName.value !== '') {
      const name = customName.value;
      newStory = newStory.replace('Bob', name);
    }

    if(document.getElementById("uk").checked) {
      const weightInPounds = 300;
      const weight = Math.round(weightInPounds / 14) + ' stone';
      const temperature = Math.round((94 - 32) * (5 / 9)) + ' centigrade';
      newStory = newStory.replace('300 pounds', weight);
      newStory = newStory.replace('94 fahrenheit', temperature);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
  }