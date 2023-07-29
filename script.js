const animationContainer = document.getElementById("animation-container");
const fileInput = document.getElementById("fileInput");
let characters = [];


function openFileInput() {
  fileInput.click();
}


fileInput.addEventListener("change", () => {
  const files = fileInput.files;
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const character = createCharacter(event.target.result);
      animationContainer.appendChild(character);
      characters.push(character);
    };
    reader.readAsDataURL(file);
  }
});


function createCharacter(imageData) {
  const character = document.createElement("img");
  character.src = imageData;
  character.classList.add("character");
  character.style.left = getRandomPosition(animationContainer.offsetWidth - 100) + "px";
  character.style.top = getRandomPosition(animationContainer.offsetHeight - 100) + "px";
  character.style.border = "2px solid black"
  character.addEventListener("click", () => focusCharacter(character));
  return character;
}


function addCharacter() {
  const character = createCharacter();
  animationContainer.appendChild(character);
  characters.push(character);
}

// this function may be used if we wanted to import the image with url (from the internet). we may need to slightly change the rest of the code
// function createCharacter() {
//   const character = document.createElement("img");
//   character.src = prompt("Enter the URL of the character's image:");
//   character.classList.add("character");
//   character.style.left = getRandomPosition(animationContainer.offsetWidth - 100) + "px";
//   character.style.top = getRandomPosition(animationContainer.offsetHeight - 100) + "px";
//   character.addEventListener("click", () => focusCharacter(character));
//   return character;
// }


function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}


let focusedCharacter = null;


function focusCharacter(character) {
  if (focusedCharacter != null){
    focusedCharacter.style.border = "2px solid black"
  }
  focusedCharacter = character;
  character.style.border = "2px solid red";
  animationContainer.focus();
}


function moveCharacter(event) {
  if (focusedCharacter) {
    const step = 10;
    switch (event.key) {
      case "ArrowUp":
        focusedCharacter.style.top = (parseInt(focusedCharacter.style.top) - step) + "px";
        break;
      case "ArrowDown":
        focusedCharacter.style.top = (parseInt(focusedCharacter.style.top) + step) + "px";
        break;
      case "ArrowLeft":
        focusedCharacter.style.left = (parseInt(focusedCharacter.style.left) - step) + "px";
        break;
      case "ArrowRight":
        focusedCharacter.style.left = (parseInt(focusedCharacter.style.left) + step) + "px";
        break;
    }
  }
}
