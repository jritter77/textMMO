import { attack, fireblast, mend } from "./Abilities";
import { Goblin } from "./Enemies";
import {
  clearButtons,
  displayStatus,
  gameButton,
  getPlayer,
  logEntry,
  updatePlayer,
} from "./Game";
import { Forest, Town } from "./Rooms";

export function Encounter() {
  displayStatus();

  const enemy = Goblin();

  logEntry("You encounter a " + enemy.name + "!", "yellow");

  playerTurn(enemy);
}

export function playerTurn(enemy) {
  if (getPlayer().hp < 1) {
    logEntry("You have feinted...");
    logEntry("You have been revived and restored by the medics in town.");
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

  logEntry("Enemy attacks for 1 normal damage!");
  updatePlayer({ hp: getPlayer().hp - 1 });
  setTimeout(() => playerTurn(enemy), 1000);
}
