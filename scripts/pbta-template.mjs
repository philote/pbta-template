import { configSheet } from "./helpers/config-sheet.mjs";

Hooks.once('pbtaSheetConfig', () => {
    // Disable the sheet config form.
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

    // Define custom tags.
    game.pbta.tagConfigOverride = {
        item: {
            // Tags available to a specific item type (e.g. "equipment", "move")
            gear: '[{"value":"Ammo"}, {"value":"Brace"}, {"value":"Close"}, {"value":"Fragile"}, {"value":"Grazing"}, {"value":"Heirloom"}, {"value":"Painful"}, {"value":"Reload"}, {"value":"Thrown"}, {"value":"Unstable"}, {"value":"Cleave"}, {"value":"Flexible"}, {"value":"Hefty"}, {"value":"Holy"}, {"value":"Lingering"}, {"value":"Piercing"}, {"value":"Ranged"}, {"value":"Stun"}, {"value":"Tether"}]'
        }
    }
});