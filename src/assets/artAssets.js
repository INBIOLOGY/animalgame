import lionArt from './art/art_lion_1787487205543.jpg';
import tigerArt from './art/art_tiger_1787487223352.jpg';
import eagleArt from './art/art_eagle_1787487244397.jpg';
import sharkArt from './art/art_shark_1787487260226.jpg';
import owlArt from './art/art_owl_1787487284297.jpg';
import wolfArt from './art/art_wolf_1787487301696.jpg';
import elephantArt from './art/art_elephant_1787487324119.jpg';
import frogArt from './art/art_frog_1787487341744.jpg';
import butterflyArt from './art/art_butterfly_1787487365880.jpg';
import penguinArt from './art/art_penguin_1787487381729.jpg';

import arenaBackdrop from './art/tcg_arena_backdrop_1787487159716.jpg';
import gameLogo from './art/tcg_game_logo_1787487174655.jpg';
import cardBack from './art/tcg_card_back_1787487189162.jpg';

export const TCG_ARENA_BACKDROP = arenaBackdrop;
export const TCG_GAME_LOGO = gameLogo;
export const TCG_CARD_BACK = cardBack;

export const ANIMAL_ART_MAP = {
  lion: lionArt,
  tiger: tigerArt,
  eagle: eagleArt,
  shark: sharkArt,
  owl: owlArt,
  wolf: wolfArt,
  elephant: elephantArt,
  frog: frogArt,
  butterfly: butterflyArt,
  penguin: penguinArt,
  // Additional mappings / fallbacks
  cheetah: tigerArt,
  dolphin: sharkArt,
  whale: sharkArt,
  blue_whale: sharkArt,
  turtle: frogArt,
  sea_turtle: frogArt,
  octopus: sharkArt,
  kangaroo: lionArt,
  koala: wolfArt,
  chimp: elephantArt,
  polar_bear: wolfArt,
  falcon: eagleArt,
  ostrich: eagleArt,
  bee: butterflyArt,
  bat: owlArt,
  beaver: wolfArt,
  otter: wolfArt,
  crab: frogArt,
  salmon: sharkArt,
  snake: frogArt,
  chameleon: frogArt,
  crocodile: sharkArt,
  komodo: sharkArt,
  platypus: frogArt,
};

export function getAnimalArt(id) {
  return ANIMAL_ART_MAP[id] || lionArt;
}
