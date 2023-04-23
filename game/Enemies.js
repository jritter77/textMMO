import { getPlayer, logEntry, updatePlayer } from "./Game";

export function Goblin() {
  const slice = (enemy) => {
    const damage = enemy.power + 2;
    logEntry(
      "Goblin slices you with a rusty knife causing " +
        damage +
        " normal damage!"
    );
    const { hp } = getPlayer();
    updatePlayer({ hp: hp - damage < 0 ? 0 : hp - damage });
  };

  const punch = (enemy) => {
    const damage = enemy.power;
    logEntry(
      "Goblin punches you in the gut causing " + damage + " normal damage!"
    );
    const { hp } = getPlayer();
    updatePlayer({ hp: hp - damage < 0 ? 0 : hp - damage });
  };

  const rally = (enemy) => {
    logEntry("Goblin uses rally and raises it's power by 1!");
    enemy.power += 1;
  };

  return {
    name: "Goblin",

    hp: 6,
    hp_max: 6,

    power: 1,
    wisdom: 1,
    cunning: 1,

    abilities: [slice, punch, rally],
  };
}

export function Wolf() {
  const howl = (enemy) => {
    logEntry("Wolf howls piercingly, lowering your power by 1!");
  };

  const bite = (enemy) => {
    const damage = enemy.power;
    logEntry(
      "Wolf bites into your flesh causing " + damage + " normal damage!"
    );
    const { hp } = getPlayer();
    updatePlayer({ hp: hp - damage < 0 ? 0 : hp - damage });
  };

  return {
    name: "Wolf",

    hp: 4,
    hp_max: 4,

    power: 2,
    wisdom: 1,
    cunning: 1,

    abilities: [howl, bite],
  };
}

export function Sprite() {
  const shimmer = (enemy) => {
    logEntry("Sprite uses Shimmer to decrease your cunning by 1!");
  };

  const spores = (enemy) => {
    const damage = enemy.power;
    logEntry(
      "Sprite uses Spores, causing " + damage + " nature damage!",
      "lightgreen"
    );
    const { hp } = getPlayer();
    updatePlayer({ hp: hp - damage < 0 ? 0 : hp - damage });
  };

  return {
    name: "Sprite",

    hp: 3,
    hp_max: 3,

    power: 1,
    wisdom: 1,
    cunning: 1,

    abilities: [shimmer, spores],
  };
}

export function Bandit() {
  const mug = (enemy) => {
    const { hp, gold } = getPlayer();
    const damage = enemy.cunning;
    logEntry(
      "Bandit mugs you, stealing 20g and causing " + damage + " normal damage!"
    );
    updatePlayer({
      hp: hp - damage < 0 ? 0 : hp - damage,
      gold: gold - 20 < 0 ? 0 : gold - 20,
    });
  };

  const reflexes = (enemy) => {
    logEntry("Bandit uses Reflexes, increasing it's cunning by 1!");
    enemy.cunning += 1;
  };

  return {
    name: "Bandit",

    hp: 8,
    hp_max: 8,

    power: 1,
    wisdom: 1,
    cunning: 2,

    abilities: [mug, reflexes],
  };
}
