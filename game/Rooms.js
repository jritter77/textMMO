import { Encounter } from "./Encounters";
import { Bandit, Goblin, Sprite, Wolf } from "./Enemies";
import {
  addToInventory,
  clearButtons,
  displayStatus,
  gameButton,
  getPlayer,
  logEntry,
  showInventory,
  updatePlayer,
} from "./Game";
import { Items } from "./Items";

export function Town() {
  clearButtons();
  displayStatus();

  logEntry(
    "You are currently in Town.<br><br>What would you like to do?",
    "gold"
  );

  gameButton("Travel", Forest);
  gameButton("Shop", Shop);
  gameButton("Inventory", () => showInventory(Town));
  gameButton("Rest (50g)", () => {
    const { hp_max, mp_max, ap_max, gold } = getPlayer();
    if (gold >= 50) {
      updatePlayer({ hp: hp_max, mp: mp_max, ap: ap_max, gold: gold - 50 });
      logEntry(
        "You rest at the nearby inn and wake up feeling refreshed!",
        "pink"
      );
      Town();
    } else {
      logEntry("Not enough gold...");
    }
  });
}

export function Forest() {
  clearButtons();
  displayStatus();

  const encounterList = [Goblin, Wolf, Sprite, Bandit];

  logEntry(
    "You are in dense forest where monsters often lurk in the trees...<br><br>What would you like to do?",
    "lightgreen"
  );

  gameButton("Explore", () => Encounter(encounterList));
  gameButton("Return to Town", Town);
  gameButton("Inventory", () => showInventory(Town));
}

export function Shop() {
  clearButtons();
  displayStatus();

  const shopList = ["hpPotion"];

  logEntry(
    "You enter into a shop with various wares.<br><br>What would you like to buy?",
    "cyan"
  );

  gameButton("Exit Shop", Town);

  for (let item of shopList) {
    gameButton(Items[item].title + "(" + Items[item].price + "g)", () => {
      clearButtons();
      logEntry(
        Items[item].title +
          ": " +
          Items[item].description +
          "<br><br>Would you like to buy for " +
          Items[item].price +
          "g?"
      );
      gameButton("Cancel", Shop);
      gameButton("Buy", () => {
        const { gold, inventory } = getPlayer();
        if (gold >= Items[item].price) {
          updatePlayer({ gold: gold - Items[item].price });
          addToInventory(item);
          logEntry("You bought 1 HP Potion for 50g!");
          Shop();
        }
      });
    });
  }
}
