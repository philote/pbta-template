export const configSheet = async () => {
    // Pass module sheet object to sheetConfig
    game.pbta.sheetConfig = {
        // skipAttributeGrant: true,
        rollFormula: "2d6",
        rollShifting: true,
        statShifting: {
            label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.shiftStats.label"),
            img: "systems/pbta/assets/icons/svg/back-forth.svg",
            value: 1,
            labels: {
                stat: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.shiftStats.statLabel"),
                stats: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.shiftStats.statsLabel"),
            },
        },
        statToggle: {
            label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.statToggle"),
            modifier: 0
        },
        minMod: -3,
        maxMod: 4,
        rollResults: {
            failure: {
                start: -Infinity,
                end: 6,
                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.rollResults.complications")
            },
            partial: {
                start: 7,
                end: 9,
                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.rollResults.partialSuccess")
            },
            success: {
                start: 10,
                end: 12,
                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.rollResults.success")
            },
            critical: {
                start: 13,
                end: Infinity,
                label: game.i18n.localize('PBTA_TEMPLATE.CharacterSheets.rollResults.critical'),
            }
        },
        actorTypes: {
            character: {
                stats: {
                    one: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.stats.one"),
                        value: 0
                    },
                    two: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.stats.two"),
                        value: 0
                    },
                    three: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.stats.three"),
                        value: 0
                    }
                },
                attributes: {
                    xp: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.xpLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "Xp",
                        value: 0,
                        max: 5,
                        steps: Array(5).fill(false),
                        position: "Top"
                    },
                    injury: {
                        label: game.i18n.localize('PBTA_TEMPLATE.CharacterSheets.attr.injuryLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: 'Clock',
                        value: 0,
                        max: 4,
                        steps: Array(4).fill(false),
                        position: 'Top',
                      },
                    coin: {
                        label: game.i18n.localize('PBTA_TEMPLATE.CharacterSheets.attr.coinLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: 'Number',
                        value: 0,
                        playbook: true,
                        position: 'Top',
                    },
                    conditions: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.conditions.label"),
                        description: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.conditions.description"),
                        customLabel: false,
                        userLabel: false,
                        type: "ListMany",
                        condition: true,
                        position: "Left",
                        options: {
                            0: {
                                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.conditions.options.0"),
                                value: false,
                            },
                            1: {
                                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.conditions.options.1"),
                                value: false,
                            },
                            2: {
                                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.conditions.options.2"),
                                value: false,
                            },
                            3: {
                                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.conditions.options.3"),
                                value: false,
                            },
                            4: {
                                label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.attr.conditions.options.4"),
                                value: false,
                            },
                        },
                    },
                },
                details: {
                    looks: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.details.looksLabel"),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: "LongText",
                        playbook: true,
                    },
                    biography: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.details.biographyLabel"),
                        value: ""
                    },
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.moveTypes.basicLabel"),
                        moves: [],
                        creation: true
                    },
                    playbook: {
                        label: game.i18n.localize("PBTA_TEMPLATE.CharacterSheets.moveTypes.playbookLabel"),
                        moves: [],
                        playbook: true
                    }
                },
                equipmentTypes: {
                  equipment: {
                    label: game.i18n.localize('PBTA_TEMPLATE.CharacterSheets.equipmentLabel'),
                  },
                },
            },
            npc: {
                attributes: {
                    fly: {
                        label: game.i18n.localize('PBTA_TEMPLATE.NPCSheets.attr.flyLabel'),
                        description: null,
                        customLabel: null,
                        userLabel: null,
                        type: 'checkbox',
                        default: false,
                        position: 'Top',
                    },
                    injury: {
                        label: game.i18n.localize('PBTA_TEMPLATE.NPCSheets.attr.injuryLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        type: 'Clock',
                        value: 0,
                        max: 4,
                        steps: [false, false, false, false],
                        position: 'Top',
                    },
                    faction: {
                        type: 'Text',
                        label: game.i18n.localize('PBTA_TEMPLATE.NPCSheets.attr.factionLabel'),
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: 'Left',
                    },
                    age: {
                        label: game.i18n.localize('PBTA_TEMPLATE.NPCSheets.attr.ageLabel'),
                        description: null,
                        customLabel: null,
                        userLabel: false,
                        type: 'Number',
                        default: 1,
                        position: 'Left',
                    },
                },
                details: {
                    biography: {
                        label: game.i18n.localize("PBTA_TEMPLATE.NPCSheets.details.biographyLabel"),
                        value: ""
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("PBTA_TEMPLATE.NPCSheets.moveTypes.basicLabel"),
                        moves: []
                    }
                },
                equipmentTypes: {
                    loot: {
                        label: game.i18n.localize('PBTA_TEMPLATE.NPCSheets.lootLabel'),
                    },
                },
            }
        }
    }
};

/**
 * Settings for the PbtA system
 */
export function pbtaSettings() {
    game.settings.set('pbta', 'hideForward', false);
    game.settings.set('pbta', 'hideOngoing', false);
    game.settings.set('pbta', 'hideUses', true);
    game.settings.set('pbta', 'hideRollFormula', true);
    game.settings.set('pbta', 'hideRollMode', true);
    game.settings.set('pbta', 'advForward', false);
    if (game.settings.settings.has('pbta.hideAdvancement')) {
      game.settings.set('pbta', 'hideAdvancement', false);
    }
};

/**
 * Tag configuration for the PbtA system
 */
export const tagConfig = {
      // Tags available to any actor and item
      actor: {
        // Tags available to all actors
        all: '',
        // Tags available to a specific actor type set up on game.pbta.sheetConfig.actorTypes (e.g. "character", "npc")
        character: '',
        npc: ''
    },
    item: {
        // Tags available to all actors
        all: '',
        // Tags available to a specific item type (e.g. "equipment", "move")
        equipment:
            '[{"value":"PBTA_TEMPLATE.Tags.equipment.strong.value", "editable":false, "description":"PBTA_TEMPLATE.Tags.equipment.strong.description"}, ' +
            '{"value":"PBTA_TEMPLATE.Tags.equipment.weak.value", "editable":false, "description":"PBTA_TEMPLATE.Tags.equipment.weak.description"}, ' +
            '{"value":"PBTA_TEMPLATE.Tags.equipment.glows.value", "editable":false, "description":"PBTA_TEMPLATE.Tags.equipment.glows.description"}]',
    },
};  