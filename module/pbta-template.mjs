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
  // --- Setting Module Configuration
  const MODULE_CONFIG = {
    headingKey: "PBTA_TEMPLATE.Settings.game.heading",
    sectionClass: "PBTA_TEMPLATE-doc",
    buttonsData: [
      {
        action: (ev) => {
          ev.preventDefault();
          window.open("https://<publisher url>/", "_blank");
        },
        iconClasses: ["fa-solid", "fa-book"],
        labelKey: "PBTA_TEMPLATE.Settings.game.publisher.title",
      },
      {
        action: (ev) => {
          ev.preventDefault();
          window.open(
            "https://github.com/philote/pbta-template",
            "_blank"
          );
        },
        iconClasses: ["fab", "fa-github"],
        labelKey: "PBTA_TEMPLATE.Settings.game.github.title",
      },
    ],
  };

  // --- Button Creation Logic
  const buttons = MODULE_CONFIG.buttonsData.map(
    ({ action, iconClasses, labelKey }) => {
      const button = document.createElement("button");
      button.type = "button";

      const icon = document.createElement("i");
      icon.classList.add(...iconClasses);

      // Append icon and localized text node
      button.append(
        icon,
        document.createTextNode(` ${game.i18n.localize(labelKey)}`)
      );

      button.addEventListener("click", action);
      return button;
    }
  );

  // --- Version Specific Logic (Reusable) ---
  if (game.release.generation >= 13) {
    // V13+ Logic: Insert after the "Documentation" section
    const documentationSection = html.querySelector("section.documentation");
    if (documentationSection) {
      // Create section wrapper
      const section = document.createElement("section");
      section.classList.add(MODULE_CONFIG.sectionClass, "flexcol");

      const divider = document.createElement("h4");
      divider.classList.add("divider");
      divider.textContent = game.i18n.localize(MODULE_CONFIG.headingKey);

      // Append divider and buttons to section
      section.append(divider, ...buttons);

      // Insert section before documentation
      documentationSection.before(section);
    } else {
      console.warn(
        `${game.i18n.localize(
          MODULE_CONFIG.headingKey
        )} | Could not find 'section.documentation' in V13 settings panel.`
      );
    }
  } else {
    // V12 Logic: Insert after the "Game Settings" section
    const gameSettingsSection = html[0].querySelector("#settings-game");
    if (gameSettingsSection) {
      const header = document.createElement("h2");
      header.innerText = game.i18n.localize(MODULE_CONFIG.headingKey);

      const settingsDiv = document.createElement("div");
      settingsDiv.append(...buttons);

      // Insert the header and the div containing buttons after the game settings section
      gameSettingsSection.after(header, settingsDiv);
    } else {
      console.warn(
        `${game.i18n.localize(
          MODULE_CONFIG.headingKey
        )} | Could not find '#settings-game' section in V12 settings panel.`
      );
    }
  }
});