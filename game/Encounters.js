import { attack, fireblast, mend } from "./Abilities";
import {
  clearButtons,
  displayStatus,
  gameButton,
  getPlayer,
  logEntry,
  updatePlayer,
} from "./Game";
import { Forest, Town } from "./Rooms";

export function Encounter(encounterList) {
  displayStatus();

  const r = Math.floor(Math.random() * encounterList.length);

  const enemy = encounterList[r]();

  logEntry("You encounter a " + enemy.name + "!", "yellow");

  playerTurn(enemy);
}

export function playerTurn(enemy) {
  if (getPlayer().hp < 1) {
    logEntry("You have collapsed...");
    logEntry("You have been revived and restored by the medics in town.");
    const { hp_max, mp_max, ap_max } = getPlayer();
    updatePlayer({ hp: hp_max, mp: mp_max, ap: ap_max });
    Town();
    return;
  }

  clearButtons();
  displayStatus();

  logEntry("What will you do?");

  gameButton("Attack", () => attack(enemy));
  gameButton("Fireblast", () => fireblast(enemy));
  gameButton("Mend", () => mend(enemy));
  gameButton("Use Item", () => {});
}

export function enemyTurn(enemy) {
  logEntry(enemy.name + " HP: " + enemy.hp, "yellow");

  if (enemy.hp < 1) {
    logEntry("You defeated " + enemy.name + "!", "gold");
    Forest();
    return;
  }
  clearButtons();
  displayStatus();

  const r = Math.floor(Math.random() * enemy.abilities.length);
  enemy.abilities[r](enemy);

  setTimeout(() => playerTurn(enemy), 1000);
}
