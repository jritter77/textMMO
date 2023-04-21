import { Encounter } from "./Encounters";
import {
  clearButtons,
  displayStatus,
  gameButton,
  getPlayer,
  logEntry,
  updatePlayer,
} from "./Game";

export function Town() {
  clearButtons();
  displayStatus();

  logEntry("You are currently in Town. What would you like to do?", "gold");
  gameButton("Travel", Forest);
  gameButton("Shop");
  gameButton("Rest", () => {
    const { hp_max, mp_max, ap_max } = getPlayer();
    updatePlayer({ hp: hp_max, mp: mp_max, ap: ap_max });
    logEntry(
      "You rest at the nearby inn and wake up feeling refreshed!",
      "pink"
    );
    Town();
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
