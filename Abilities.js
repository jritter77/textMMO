import { enemyTurn } from "./Encounters";
import { clearButtons, getPlayer, logEntry, updatePlayer } from "./Game";

export function attack(enemy) {
  clearButtons();
  logEntry("You attack " + enemy.name + " for 1 normal damage!");
  enemy.hp -= 1;
  setTimeout(() => enemyTurn(enemy), 1000);
}

export function fireblast(enemy) {
  if (getPlayer().mp >= 5) {
    clearButtons();
    logEntry("You attack " + enemy.name + " for 3 fire damage!", "orange");
    enemy.hp -= 3;
    updatePlayer({ mp: getPlayer().mp - 5 < 0 ? 0 : getPlayer().mp - 5 });
    setTimeout(() => enemyTurn(enemy), 1000);
  } else {
    logEntry("Not enough MP...");
  }
}

export function mend(enemy) {
  clearButtons();
  const { hp, hp_max } = getPlayer();
  updatePlayer({ hp: hp + 5 > hp_max ? hp_max : hp + 5 });
  logEntry("You recover 5 HP!", "pink");
  setTimeout(() => enemyTurn(enemy), 1000);
}
