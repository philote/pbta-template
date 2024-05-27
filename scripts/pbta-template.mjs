import { configSheet } from "./helpers/config-sheet.mjs";

Hooks.once('pbtaSheetConfig', () => {
    // https://github.com/asacolips-projects/pbta?tab=readme-ov-file#overriding-sheet-config-in-a-module
    // Disable the PbtA sheet config form.
    game.settings.set('pbta', 'sheetConfigOverride', true);

    // Replace the game.pbta.sheetConfig with your own version.
    configSheet();

    // PBTA Settings
    game.settings.set('pbta', 'advForward', true);
    game.settings.set('pbta', 'hideRollFormula', false);
    game.settings.set('pbta', 'hideForward', false);
    game.settings.set('pbta', 'hideOngoing', false);
    game.settings.set('pbta', 'hideRollMode', false);
    game.settings.set('pbta', 'hideUses', false);

    // Define custom PbtA system tags.
    game.pbta.tagConfigOverride = {
        // Tags available to any actor and item
        general: '[{"value":"fire"},{"value":"water"},{"value":"earth"},{"value":"air"}]',
        actor: {
            // Tags available to all actors
            all: '[{"value":"person"}]',
            // Tags available to a specific actor type set up on game.pbta.sheetConfig.actorTypes (e.g. "character", "npc")
            character: '[{"value":"mook"}]'
        },
        item: {
            // Tags available to all actors
            all: '[{"value":"consumable"}]',
            // Tags available to a specific item type (e.g. "equipment", "move")
            move: '[{"value":"sword"}]',
            gear: '[{"value":"Ammo"}, {"value":"Brace"}, {"value":"Close"}, {"value":"Fragile"}, {"value":"Grazing"}, {"value":"Heirloom"}, {"value":"Painful"}, {"value":"Reload"}, {"value":"Thrown"}, {"value":"Unstable"}, {"value":"Cleave"}, {"value":"Flexible"}, {"value":"Hefty"}, {"value":"Holy"}, {"value":"Lingering"}, {"value":"Piercing"}, {"value":"Ranged"}, {"value":"Stun"}, {"value":"Tether"}]'
        }
    }
});