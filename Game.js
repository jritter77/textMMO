import { Town } from "./Rooms";

const gameWindow = document.getElementById("gameWindow");
const log = document.getElementById("log");
const buttonGroup = document.getElementById("buttonGroup");
const scrollView = document.getElementById("scrollView");

const hp = document.getElementById("hp");
const mp = document.getElementById("mp");
const ap = document.getElementById("ap");

export function newPlayer(name) {
  return {
    name: name,
    hp: 100,
    hp_max: 100,
    mp: 100,
    mp_max: 100,
    ap: 100,
    ap_max: 100,
    power: 1,
    wisdom: 1,
    cunning: 1,
  };
}

export function setPlayer(player) {
  localStorage.setItem("player", JSON.stringify(player));
}

export function updatePlayer(state) {
  const player = getPlayer();
  setPlayer({ ...player, ...state });
  displayStatus();
}

export function getPlayer() {
  return JSON.parse(localStorage.getItem("player"));
}

export function displayStatus() {
  const player = getPlayer();
  hp.innerText = "HP: " + player.hp;
  mp.innerText = "MP: " + player.mp;
  ap.innerText = "AP: " + player.ap;
}

export function logEntry(msg, color = "white") {
  const entry = document.createElement("p");
  entry.innerHTML = msg;
  entry.className = "logEntry";
  entry.style.color = color;
  entry.style.borderColor = color;
  log.appendChild(entry);
  scrollView.scrollTop = scrollView.scrollHeight;
  return entry;
}

export function gameButton(text, onclick) {
  const btn = document.createElement("button");
  btn.innerHTML = text;
  btn.className = "gameButton";
  btn.onclick = onclick;
  buttonGroup.appendChild(btn);
  return btn;
}

export function gameInput(placeholder) {
  const input = document.createElement("input");
  input.placeholder = placeholder;
  input.className = "gameInput";
  buttonGroup.appendChild(input);
  return input;
}

export function clearButtons() {
  buttonGroup.innerHTML = "";
}

export function Intro() {
  logEntry("Welcome to Text MMO Prototype!");

  if (localStorage.getItem("player") === null) {
    logEntry("Please enter a name for your character:");

    const playerName = gameInput("Enter a name for your character");
    gameButton("Confirm", (e) => {
      if (playerName.value !== "") {
        setPlayer(newPlayer(playerName.value));
        logEntry("Welcome " + playerName.value + "!");
        Town();
      } else {
        logEntry("Name cannot be blank...");
      }
    });
  } else {
    logEntry("Welcome " + getPlayer().name + "!");
    Town();
  }
}
