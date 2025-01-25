import * as pbtaConfig from './helpers/pbta-config.mjs';

Hooks.once('init', () => {
    // Register settings
    game.settings.register('pbta-template', 'firstTime', {
        name: game.i18n.localize('PBTA_TEMPLATE.Settings.startup.name'),
        scope: 'world',
        config: false,
        type: Boolean,
        default: true
    });

    game.settings.register('pbta-template', 'enableLoginImg', {
        name: game.i18n.localize('PBTA_TEMPLATE.Settings.img.name'),
        hint: game.i18n.localize('PBTA_TEMPLATE.Settings.img.hint'),
        scope: 'world',
        config: true,
        type: Boolean,
        default: false
      });
});

// PbtA configuration hook
Hooks.once('pbtaSheetConfig', () => {
    // https://github.com/asacolips-projects/pbta?tab=readme-ov-file#overriding-sheet-config-in-a-module
    // Disable the PbtA sheet config form.
    if (game.settings.settings.get('pbta.sheetConfigOverride')) game.settings.set('pbta', 'sheetConfigOverride', true);

    // Replace the game.pbta.sheetConfig with this module's version.
    pbtaConfig.configSheet();

    // PBTA Settings
    pbtaConfig.pbtaSettings();

    // Defines custom PbtA system tags.
    game.pbta.tagConfigOverride = pbtaConfig.tagConfig;
});

Hooks.once('ready', async function () {
    // This allows the module to set a custom image to the login screen
    if (!game.user.isGM) return;
    if (game.settings.get('pbta-template', 'firstTime')) {
        game.settings.set('pbta-template', 'firstTime', false);
    
        const callback = async () => {
            game.settings.set('pbta-template', 'enableLoginImg', true);
            const worldData = {
                id: game.world.id,
                action: 'editWorld',
                background: `modules/pbta-template/assets/cover.webp`,
            };
            let response;
            try {
                response = await foundry.utils.fetchJsonWithTimeout(foundry.utils.getRoute('setup'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(worldData),
            });
            if (response.error) {
                ui.notifications.error(response.error);
            } else if (!response) {
                game.world.updateSource(response);
            }
            } catch (e) {
                return ui.notifications.error(e);
            }
        };
  
        foundry.applications.api.DialogV2.confirm({
            window: { title: game.i18n.localize('PBTA_TEMPLATE.Settings.startup.dialog.title') },
            content: game.i18n.localize('PBTA_TEMPLATE.Settings.startup.dialog.content'),
            rejectClose: false,
            modal: true,
            yes: { callback: callback },
        });
    } else {
        if (game.settings.get('pbta-template', 'enableLoginImg')) {
            const worldData = {
                id: game.world.id,
                action: 'editWorld',
                background: `modules/pbta-template/assets/cover.webp`,
            };
            let response;
            try {
                response = await foundry.utils.fetchJsonWithTimeout(foundry.utils.getRoute('setup'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(worldData),
            });
            if (response.error) {
                ui.notifications.error(response.error);
            } else if (!response) {
                game.world.updateSource(response);
            }
            } catch (e) {
                return ui.notifications.error(e);
            }
        }
    }
});

// Add buttons to the Game settings menu
Hooks.on("renderSettings", (app, html) => {
    const header = document.createElement("h2");
    header.innerText = game.i18n.localize('PBTA_TEMPLATE.Settings.game.heading');

    const pbtaSettings = document.createElement("div");
    html.find("#settings-game")?.after(header, pbtaSettings);

    const buttons = [
        {
            action: (ev) => {
                ev.preventDefault();
                window.open("https://<publisher url>/", "_blank");
            },
            iconClasses: ["fa-solid", "fa-book"],
            label: game.i18n.localize('PBTA_TEMPLATE.Settings.game.publisher.title')
        },
        {
            action: (ev) => {
                ev.preventDefault();
                window.open("https://github.com/philote/pbta-template", "_blank");
            },
            iconClasses: ["fab", "fa-github"],
            label: game.i18n.localize(`PBTA_TEMPLATE.Settings.game.github.title`)
        },
    ].map(({ action, iconClasses, label }) => {
        const button = document.createElement("button");
        button.type = "button";

        const icon = document.createElement("i");
        icon.classList.add(...iconClasses);

        button.append(icon, game.i18n.localize(label));

        button.addEventListener("click", action);

        return button;
    });

    pbtaSettings.append(...buttons);
});
