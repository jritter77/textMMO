import { Encounter } from "./Encounters";
import {
  clearButtons,
  displayStatus,
  gameButton,
  getPlayer,
  logEntry,
  showInventory,
  updatePlayer,
} from "./Game";

export function Town() {
  clearButtons();
  displayStatus();

  logEntry("You are currently in Town. What would you like to do?", "gold");
  gameButton("Travel", Forest);
  gameButton("Shop");
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

  logEntry(
    "You are in dense forest where monsters often lurk in the trees... What would you like to do?",
    "lightgreen"
  );

  gameButton("Explore", Encounter);
  gameButton("Return to Town", Town);
}
