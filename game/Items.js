import { enemyTurn } from "./Encounters";
import {
  clearButtons,
  gameButton,
  getPlayer,
  logEntry,
  removeFromInventory,
  showInventory,
  updatePlayer,
} from "./Game";

export const itemOptions = (item, room, enemy) => {
  clearButtons();
  if (item.type === "consumable") {
    logEntry(item.title + ": " + item.description);
    gameButton("Use", () => item.effect(room, enemy));
    gameButton("Cancel", () => showInventory(room));
  }
};

export const hpPotion = {
  type: "consumable",
  title: "HP Potion",
  description: "Use to recover 30 HP",
  price: 50,
  effect: (room, enemy) => {
    const { hp, hp_max } = getPlayer();
    updatePlayer({ hp: hp + 30 > hp_max ? hp_max : hp + 30 });
    logEntry("You drink HP Potion and recover 30 HP!", "pink");
    removeFromInventory("hpPotion");
    if (enemy) {
      enemyTurn(enemy);
    } else {
      room();
    }
  },
};

export const Items = {
  hpPotion,
};
