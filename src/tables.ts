// prettier-ignore

// This is a complete representation of the database schema.
// It is based on Veekun's pokedex at
// https://github.com/veekun/pokedex/blob/master/pokedex/db/tables.py, except it does
// not include the unused "summaries" tables or any Conquest-related tables .
//
// It uses a simple free-form 'list' of tags or attributes to specify each column,
// rather than setting individual properties like "type". It doesn't actually use
// lists/arrays, but instead uses objects with ES6 shorthand syntax to simulate the
// simplicity and succinctness of lists, while also allowing each tag/attribute to have
// an associated value when necessary (like comments or foreign key references).
//

// Column types (exactly one of)
const integer = true;
const boolean = true;
const string = [79];
const text = true;

// Constraints (any/optional)
const primary = true;
const notNull = true; // columns are nullable by default
const unique = true;

// Create an index on this column (optional)
const index = true;

// Tags that describe strings (any/optional)
const official = true; // If not specified, the string is fan-written
const markdown = true; // Allows text to have links
const plaintext = true;
const latex = true; // LaTex math syntax
const ripped = true; // Pulled directly from game ROMs
const gametext = true; // Exact representation from the games, including linebreaks

// Re-usable columns
const id = {integer, primary, notNull, comment: 'A numeric ID'};
const identifier = {
    string,
    notNull,
    unique,
    index,
    comment:
        'A unique textual ID that is ideal for showing in URLs, etc. Not intended for use as a translation.',
};
const local_language_id = {
    integer,
    primary,
    notNull,
    references: 'languages.id',
    comment: 'The language the translation is in',
};

export interface Table {
    name: string;
    comment?: string;
    columns: {
        [columnName: string]: {
            comment?: string;

            integer?: any[] | boolean;
            boolean?: any[] | boolean;
            string?: any[] | boolean;
            text?: any[] | boolean;

            primary?: boolean;
            notNull?: boolean;
            unique?: boolean;
            index?: boolean;

            official?: boolean;
            markdown?: boolean;
            plaintext?: boolean;
            latex?: boolean;
            ripped?: boolean;
            gametext?: boolean;

            [t: string]: any;
        };
    };
}

//
// All database tables, in order of increasing dependencies on the tables before it.
// Insertions are done in this order to prevent breaking foreign key constraints.
// Table deletions/drops are done in this order reversed, for the same reason.
//
export const tables: Table[] = [
    {
        name: 'languages',
        comment: 'A language the Pokémon games have been translated into.',
        columns: {
            id, identifier,
            iso639: {
                string, notNull,
                comment: 'The two-letter code of the country where this language is spoken. Note that it is not unique.',
            },
            iso3166: {
                string, notNull,
                comment: 'The two-letter code of the language. Note that it is not unique.',
            },
            official: {
                boolean, index, notNull,
                comment: 'True iff games are produced in the language.',
            },
            order: {integer, comment: 'Order for sorting in foreign name lists.'},
        },
    },
    {
        name: 'language_names',
        columns: {
            language_id: {integer, primary, notNull, references: 'languages.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext},
        },
    },
    {
        name: 'regions',
        comment: 'Major areas of the world: Kanto, Johto, etc.',
        columns: {id, identifier},
    },
    {
        name: 'region_names',
        columns: {
            region_id: {integer, primary, notNull, references: 'regions.id'},
            local_language_id,
            name: {string, notNull, index, official, plaintext},
        },
    },
    {
        name: 'locations',
        comment: 'A place in the Pokémon world.',
        columns: {
            id,
            identifier,
            region_id: {
                integer, references: 'regions_id',
                comment: 'ID of the region this location is in',
            },
        },
    },
    {
        name: 'location_names',
        columns: {
            location_id: {integer, primary, notNull, references: 'locations.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext},
            subtitle: {
                string, index, notNull, official, plaintext,
                comment: 'A subtitle for the location, if any. This may be an alternate name for the locaton, as in the Kalos routes, or the name of a subarea of the location, as in Alola.',
            },
        },
    },
    {
        name: 'location_areas',
        comment: 'A sub-area of a location.',
        columns: {
            id,
            identifier: {string},
            location_id: {
                integer, references: 'locations.id',
                comment: 'ID of the location this area is part of',
            },
            game_index: {integer, notNull, comment: 'ID the games use for this area'},
        },
    },
    {
        name: 'location_area_prose',
        columns: {
            location_area_id: {
                integer, primary, notNull, references: 'location_areas.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'encounter_methods',
        comment:
            'A way the player can enter a wild encounter. For example, surfing, fishing, or walking through tall grass.',
        columns: {
            id, identifier,
            order: {integer, notNull, unique, comment: 'A good column for sorting on'},
        },
    },
    {
        name: 'encounter_method_prose',
        columns: {
            encounter_method_id: {
                integer, primary, notNull, references: 'encounter_methods.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'generations',
        comment: 'A Generation of the Pokémon franchise.',
        columns: {
            id,
            identifier,
            main_region_id: {
                integer, notNull, references: 'regions.id',
                comment: "ID of the region this generation's main games take place in",
            },
        },
    },
    {
        name: 'generation_names',
        columns: {
            generation_id: {integer, primary, notNull, references: 'generations.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext},
        },
    },
    {
        name: 'move_damage_classes',
        comment: 'Any of the damage classes moves can have, i.e. physical, special, or non-damaging.',
        columns: {id, identifier},
    },
    {
        name: 'move_damage_class_prose',
        columns: {
            move_damage_class_id: {
                integer, primary, notNull, references: 'move_damage_classes.id',
            },
            local_language_id,
            name: {string, index, plaintext},
            description: {text, index, plaintext},
        },
    },
    {
        name: 'pokedexes',
        comment: 'A collection of Pokémon species ordered in a particular way.',
        columns: {
            id,
            identifier,
            region_id: {
                integer, regernces: 'regions.id',
                comment: 'ID of the region this Pokédex is used in, or null if its global',
            },
            is_main_series: {
                boolean, notNull,
                comment: 'True if this Pokédex appears in the main series.',
            },
        },
    },
    {
        name: 'pokedex_prose',
        columns: {
            pokedex_id: {integer, primary, notNull, references: 'pokedexes.id'},
            local_language_id,
            name: {string, index, plaintext},
            description: {
                text, plaintext, comment: 'A longer description of the Pokédex',
            },
        },
    },
    {
        name: 'pokemon_colors',
        comment: 'The "Pokédex color" of a Pokémon species. Usually based on the Pokémon\'s color.',
        columns: {id, identifier},
    },
    {
        name: 'pokemon_color_names',
        columns: {
            pokemon_color_id: {
                integer, primary, notNull, references: 'pokemon_colors.id',
            },
            local_language_id,
            name: {string, index, official, plaintext},
        },
    },
    {
        name: 'pokemon_habitats',
        comment: 'The habitat of a Pokémon, as given in the FireRed/LeafGreen version Pokédex.',
        columns: {id, identifier},
    },
    {
        name: 'pokemon_habitat_names',
        columns: {
            pokemon_habitat_id: {
                integer, primary, notNull, references: 'pokemon_habitats.id',
            },
            local_language_id,
            name: {string, index, official, plaintext},
        },
    },
    {
        name: 'pokemon_move_methods',
        comment: 'A method a move can be learned by, such as "Level up" or "Tutor".',
        columns: {id, identifier},
    },
    {
        name: 'pokemon_move_method_prose',
        columns: {
            pokemon_move_method_id: {
                integer, primary, notNull, references: 'pokemon_move_methods.id',
            },
            local_language_id,
            name: {string, index, plaintext},
            description: {
                text, index, plaintext,
                comment: 'A detailed description of how the method works',
            },
        },
    },
    {
        name: 'pokemon_shapes',
        comment:
            "The shape of a Pokémon's body. Used for flavor in generation IV and V Pokédexes.",
        columns: {id, identifier},
    },
    {
        name: 'pokemon_shape_prose',
        columns: {
            pokemon_shape_id: {
                integer, primary, notNull, references: 'pokemon_shapes.id',
            },
            local_language_id,
            name: {string, index, plaintext},
            awesome_name: {
                string, index, plaintext,
                comment: 'A splendiferous name of the body shape',
            },
            description: {
                text, index, plaintext,
                comment: 'A detailed description of the body shape',
            },
        },
    },
    {
        name: 'stats',
        comment: 'A Stat, such as Attack or Speed.',
        columns: {
            id,
            identifier,
            damage_class_id: {integer, references: 'move_damage_classes.id'},
            is_battle_only: {
                boolean, notNull,
                comment: 'Whether this stat only exists within a battle',
            },
            game_index: {
                integer,
                comment: 'The stat order the games use internally for the persistent stats. NULL for battle-only stats.',
            },
        },
    },
    {
        name: 'stat_names',
        columns: {
            stat_id: {integer, primary, notNull, references: 'stats.id'},
            local_language_id,
            name: {string, notNull, index, official, plaintext},
        },
    },
    {
        name: 'types',
        comment: 'Any of the elemental types Pokémon and moves can have.',
        columns: {
            id,
            identifier,
            generation_id: {
                integer, notNull, references: 'generations.id',
                comment: 'The ID of the generation this type first appeared in.',
            },
            damage_class_id: {
                integer, references: 'move_damage_classes.id',
                comment: 'The ID of the damage class this types moves had before Generation IV, null if not applicable',
            },
        },
    },
    {
        name: 'type_names',
        columns: {
            type_id: {integer, primary, notNull, references: 'types.id'},
            local_language_id,
            name: {string, notNull, index, official, plaintext},
        },
    },
    {
        name: 'type_efficacy',
        comment:
            'The damage multiplier used when a move of a particular type damages a Pokémon of a particular other type.',
        columns: {
            damage_type_id: {integer, primary, notNull, references: 'types.id'},
            target_type_id: {integer, primary, notNull, references: 'types.id'},
            damage_factor: {
                integer, notNull,
                comment: 'The multiplier, as a percentage of damage inflicted.',
            },
        },
    },
    {
        name: 'type_game_indices',
        comment: 'The internal ID number a game uses for a type.',
        columns: {
            type_id: {integer, primary, notNull, references: 'types.id'},
            generation_id: {
                integer, primary, notNull,
                references: 'generations.id',
            },
            game_index: {
                integer, notNull,
                comment: 'Internal ID of the type in this generation',
            },
        },
    },
    {
        name: 'version_groups',
        comment:
            'A group of versions, containing either two paired versions (such as Red and Blue) or a single game (such as Yellow).',
        columns: {
            id,
            identifier,
            generation_id: {
                integer, notNull, references: 'generations.id',
                comment: 'The ID of the generation the games in this group belong to.',
            },
            order: {
                integer,
                comment: 'Order for sorting. Almost by date of release, except similar versions are grouped together.',
            },
        },
    },
    {
        name: 'version_group_regions',
        comment: 'Maps a version group to a region that appears in it.',
        columns: {
            version_group_id: {
                integer, primary, notNull,
                references: 'version_groups.id',
            },
            region_id: {integer, primary, notNull, references: 'regions.id'},
        },
    },
    {
        name: 'versions',
        comment: 'An individual main-series Pokémon game.',
        columns: {
            id, identifier,
            version_group_id: {
                integer, notNull, references: 'version_groups.id',
                comment: 'The ID of the version group this game belongs to.',
            },
        },
    },
    {
        name: 'version_names',
        columns: {
            version_id: {integer, primary, notNull, references: 'versions.id'},
            local_language_id,
            name: {string, notNull, index, official, plaintext},
        },
    },
    {
        name: 'abilities',
        comment:
            'An ability a Pokémon can have, such as Static or Pressure. IDs below 10000 match the internal ID in the games. IDs above 10000 are reserved for Conquest-only abilities.',
        columns: {
            id,
            identifier,
            generation_id: {
                integer, notNull, references: 'generations.id',
                comment: 'The ID of the generation this ability was introduced in',
            },
            is_main_series: {
                boolean, index, notNull,
                comment: 'True iff the ability exists in the main series.',
            },
        },
    },
    {
        name: 'ability_names',
        columns: {
            ability_id: {integer, primary, notNull, references: 'abilities.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext},
        },
    },
    {
        name: 'ability_prose',
        columns: {
            ability_id: {integer, primary, notNull, references: 'abilities.id'},
            local_language_id,
            short_effect: {
                text, index, notNull, markdown,
                comment: "A short summary of this ability's effect",
            },
            effect: {
                text, index, notNull, markdown,
                comment: "A detailed description of this ability's effect",
            },
        },
    },
    {
        name: 'ability_changelog',
        comment: 'History of changes to abilities across main game versions.',
        columns: {
            id,
            ability_id: {integer, notNull, references: 'abilities.id'},
            changed_in_version_group_id: {
                integer, notNull, references: 'version_groups.id',
                comment: 'The ID of the version group in which the ability changed',
            },
        },
    },
    {
        name: 'ability_changelog_prose',
        columns: {
            ability_changelog_id: {
                integer, primary, notNull, references: 'ability_changelog.id',
            },
            local_language_id,
            effect: {
                text, index, notNull, markdown,
                comment: 'A description of the old behavior',
            },
        },
    },
    {
        name: 'ability_flavor_text',
        columns: {
            ability_id: {integer, primary, notNull, references: 'abilities.id'},
            version_group_id: {
                integer, primary, notNull, references: 'version_groups.id',
                comment: 'The ID of the version group this flavor text is taken from',
            },
            language_id: {integer, primary, references: 'languages.id'},
            flavor_text: {text, notNull, official, gametext},
        },
    },
    {
        name: 'berry_firmness',
        comment: 'A Berry firmness, such as "hard" or "very soft".',
        columns: {id, identifier},
    },
    {
        name: 'berry_firmness_names',
        columns: {
            berry_firmness_id: {
                integer, primary, notNull, references: 'berry_firmness.id',
            },
            local_language_id,
            name: {string, index, notNull, official, plaintext},
        },
    },
    {
        name: 'characteristics',
        comment: "Flavor text hinting at genes that appears in a Pokémon's summary.",
        columns: {
            id,
            stat_id: {
                integer, notNull, references: 'stats.id',
                comment: 'ID of the stat with the highest gene',
            },
            gene_mod_5: {
                integer,notNull, index, comment: 'Value of the highest gene modulo 5',
            },
        },
    },
    {
        name: 'characteristic_text',
        columns: {
            characteristic_id: {
                integer, primary, notNull, references: 'characteristics.id',
            },
            local_language_id,
            message: {
                string, index, notNull, official, plaintext,
                comment: 'The text displayed',
            },
        },
    },
    {
        name: 'contest_effects',
        comment: 'Effect of a move when used in a Contest.',
        columns: {
            id,
            appeal: {
                integer, notNull,
                comment: 'The base number of hearts the user of this move gets',
            },
            jam: {
                integer, notNull,
                comment: "The base number of hearts the user's opponent loses",
            },
        },
    },
    {
        name: 'contest_effect_prose',
        columns: {
            contest_effect_id: {
                integer, primary, notNull,
                references: 'contest_effects.id',
            },
            local_language_id,
            flavor_text: {
                text, index, notNull, official, gametext,
                comment: 'The in-game description of this effect',
            },
            effect: {
                text, index, notNull, plaintext,
                comment: 'A detailed description of the effect',
            },
        },
    },
    {
        name: 'super_contest_effects',
        comment: 'An effect a move can have when used in the Super Contest.',
        columns: {
            id,
            appeal: {integer, notNull, comment: 'The number of hearts the user gains.'},
        },
    },
    {
        name: 'super_contest_effect_prose',
        columns: {
            super_contest_effect_id: {
                integer, primary, notNull,
                references: 'super_contest_effects.id',
            },
            local_language_id,
            flavor_text: {
                text, notNull, official, plaintext,
                comment: 'A description of the effect.',
            },
        },
    },
    {
        name: 'contest_types',
        comment: 'A Contest type, such as "cool" or "smart", and their associated Berry flavors and Pokéblock colors.',
        columns: {id, identifier},
    },
    {
        name: 'contest_type_names',
        columns: {
            contest_type_id: {integer, primary, notNull, references: 'contest_types.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext},
            flavor: {
                text, index, notNull, official, plaintext,
                comment: 'The name of the corresponding Berry flavor',
            },
            color: {
                text, notNull, official, plaintext,
                comment: 'The name of the corresponding Pokéblock color',
            },
        },
    },
    {
        name: 'egg_groups',
        comment: `An Egg group. Usually, two Pokémon can breed if they share an Egg Group. Exceptions:
* Pokémon in the No Eggs group cannot breed.
* Pokemon in the Ditto group can breed with any pokemon except those in the Ditto or No Eggs groups.

ID matches to the internal ID used in the games.`,
        columns: {id, identifier},
    },
    {
        name: 'egg_group_prose',
        columns: {
            egg_group_id: {integer, primary, notNull, references: 'egg_groups.id'},
            local_language_id,
            name: {string, index, official, plaintext},
        },
    },
    {
        name: 'encounter_conditions',
        comment: 'A condition in the game world that affects Pokémon encounters, such as time of day.',
        columns: {id, identifier},
    },
    {
        name: 'encounter_condition_prose',
        columns: {
            encounter_condition_id: {
                integer, primary, notNull,
                references: 'encounter_conditions.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'encounter_condition_values',
        comment:
            'A possible state for a condition. For example, the state of "swarm" could be "swarm" or "no swarm".',
        columns: {
            id, identifier,
            encounter_condition_id: {
                integer, notNull,
                references: 'encounter_conditions.id',
            },
            is_default: {
                boolean, notNull,
                comment: 'Set if this value is the default state for the condition',
            },
        },
    },
    {
        name: 'encounter_condition_value_prose',
        columns: {
            encounter_condition_value_id: {
                integer, primary, notNull,
                references: 'encounter_condition_values.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'evolution_triggers',
        comment: 'An evolution type, such as "level" or "trade".',
        columns: {id, identifier},
    },
    {
        name: 'evolution_trigger_prose',
        columns: {
            evolution_trigger_id: {
                integer, primary, notNull,
                references: 'evolution_triggers.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'genders',
        columns: {id, identifier},
    },
    {
        name: 'growth_rates',
        comment: 'Growth rate of a Pokémon, i.e. the EXP → level function.',
        columns: {
            id, identifier,
            formula: {text, notNull, latex},
        },
    },
    {
        name: 'growth_rate_prose',
        columns: {
            growth_rate_id: {integer, primary, notNull, references: 'growth_rates.id'},
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'experience',
        comment: 'EXP needed for a certain level with a certain growth rate.',
        columns: {
            growth_rate_id: {integer, notNull, primary, references: 'growth_rates.id'},
            level: {integer, primary, notNull},
            experience: {
                integer, notNull,
                comment: 'The number of EXP points needed to get to that level',
            },
        },
    },
    {
        name: 'item_pockets',
        comment: 'A pocket that categorizes items. Semi-official.',
        columns: {id, identifier},
    },
    {
        name: 'item_fling_effects',
        comment: 'An effect of the move Fling when used with a specific item.',
        columns: {id, identifier},
    },
    {
        name: 'item_fling_effect_prose',
        columns: {
            item_fling_effect_id: {
                integer, primary, notNull,
                references: 'item_fling_effects.id',
            },
            local_language_id,
            effect: {
                text, index, notNull, plaintext,
                comment: 'Description of the effect',
            },
        },
    },
    {
        name: 'item_pocket_names',
        columns: {
            item_pocket_id: {integer, primary, notNull, references: 'item_pockets.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext},
        },
    },
    {
        name: 'item_categories',
        comment: 'An item category. Not official.',
        columns: {
            id, identifier,
            pocket_id: {
                integer, notNull,
                references: 'item_pockets.id',
                comment: 'ID of the pocket these items go to',
            },
        },
    },
    {
        name: 'item_category_prose',
        columns: {
            item_category_id: {
                integer, primary, notNull,
                references: 'item_categories.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'items',
        comment: 'An Item from the games, like "Poké Ball" or "Bicycle". IDs do not mean anything; see item_game_indices for the IDs used in the games.',
        columns: {
            id,
            identifier,
            category_id: {
                integer, notNull,
                references: 'item_categories.id',
                comment: 'ID of a category this item belongs to',
            },
            cost: {
                integer, notNull,
                comment: 'Cost of the item when bought. Items sell for half this price.',
            },
            fling_power: {
                integer,
                comment: 'Power of the move Fling when used with this item.',
            },
            fling_effect_id: {
                integer, references: 'item_fling_effects.id',
                comment:
                    'ID of the fling-effect of the move Fling when used with this item. Note that these are different from move effects.',
            },
        },
    },
    {
        name: 'item_names',
        columns: {
            item_id: {integer, primary, notNull, references: 'items.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext, ripped},
        },
    },
    {
        name: 'item_prose',
        columns: {
            item_id: {integer, primary, notNull, references: 'items.id'},
            local_language_id,
            short_effect: {
                text, index, notNull, markdown,
                comment: 'A short summary of the effect',
            },
            effect: {
                text, index, notNull, markdown,
                comment: 'Detailed description of the items effect',
            },
        },
    },
    {
        name: 'item_flavor_text',
        comment: 'An in-game description of an item.',
        columns: {
            item_id: {integer, primary, notNull, references: 'items.id'},
            version_group_id: {
                integer, primary, notNull,
                references: 'version_groups.id',
            },
            language_id: {integer, primary, notNull, references: 'languages.id'},
            flavor_text: {text, notNull, official, gametext},
        },
    },
    {
        name: 'berries',
        comment:
            'A Berry, consumable item that grows on trees. For data common to all items, such as the name, see the corresponding item entry. ID matches the in-game berry number.',
        columns: {
            id: {integer, notNull, primary},
            item_id: {
                integer, notNull, references: 'items.id',
                comment: 'The ID of the item that represents this Berry',
            },
            firmness_id: {
                integer, notNull, references: 'berry_firmness.id',
                comment: 'The ID of this Berrys firmness category',
            },
            natural_gift_power: {
                integer,
                comment: 'Natural Gifts power when used with this Berry',
            },
            natural_gift_type_id: {
                integer, references: 'types.id',
                comment: 'The ID of the Type that Natural Gift has when used with this Berry',
            },
            size: {integer, notNull, comment: 'The size of this Berry, in millimeters'},
            max_harvest: {
                integer, notNull,
                comment: 'The maximum number of these berries that can grow on one tree in Generation IV',
            },
            growth_time: {
                integer, notNull,
                comment: 'Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked.',
            },
            soil_dryness: {
                integer, notNull,
                comment: 'The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly.',
            },
            smoothness: {
                integer, notNull,
                comment: 'The smoothness of this Berry, used in making Pokéblocks or Poffins',
            },
        },
    },
    {
        name: 'berry_flavors',
        comment: 'A Berry flavor level.',
        columns: {
            berry_id: {integer, primary, notNull, references: 'berries.id'},
            contest_type_id: {
                integer, primary, notNull, references: 'contest_types.id',
            },
            flavor: {integer, notNull, comment: 'The level of the flavor in the berry'},
        },
    },
    {
        name: 'evolution_chains',
        comment: 'A family of Pokémon that are linked by evolution.',
        columns: {
            id,
            baby_trigger_item_id: {
                integer, references: 'items.id',
                comment: 'Item that a parent must hold while breeding to produce a baby',
            },
        },
    },
    {
        name: 'item_flags',
        comment: 'An item attribute such as "consumable" or "holdable". Not official.',
        columns: {id, identifier},
    },
    {
        name: 'item_flag_prose',
        columns: {
            item_flag_id: {integer, primary, notNull, references: 'item_flags.id'},
            local_language_id,
            name: {string, index, plaintext},
            description: {
                text, index, notNull, plaintext,
                comment: 'Short description of the flag',
            },
        },
    },
    {
        name: 'item_flag_map',
        comment: 'Maps an item flag to its item.',
        columns: {
            item_id: {integer, primary, notNull, references: 'items.id'},
            item_flag_id: {integer, primary, notNull, references: 'item_flags.id'},
        },
    },
    {
        name: 'item_game_indices',
        comment: 'The internal ID number a game uses for an item.',
        columns: {
            item_id: {
                integer, primary, notNull, references: 'items.id',
                comment: 'The database ID of the item',
            },
            generation_id: {integer, primary, notNull, references: 'generations.id'},
            game_index: {
                integer, notNull,
                comment: 'Internal ID of the item in the generation',
            },
        },
    },
    {
        name: 'location_area_encounter_rates',
        comment:
            'The chance of encountering a wild Pokémon in an area. In other words, how likely a step in tall grass is to trigger a wild battle. The exact meaning of the rate varies across versions but generally higher is more likely.',
        columns: {
            location_area_id: {
                integer, primary, notNull, references: 'location_areas.id',
            },
            encounter_method_id: {
                integer, primary, notNull, references: 'encounter_methods.id',
            },
            version_id: {integer, primary, notNull, references: 'versions.id'},
            rate: {integer, comment: 'The base encounter rate'},
        },
    },
    {
        name: 'location_game_indices',
        comment: 'IDs the games use internally for locations.',
        columns: {
            location_id: {
                integer, primary, notNull, references: 'locations.id',
                comment: 'Database ID of the location',
            },
            generation_id: {
                integer, notNull, primary, references: 'generations.id',
                comment: 'ID of the generation this entry applies to',
            },
            game_index: {
                integer, primary, notNull, comment: 'Internal game ID of the location',
            },
        },
    },
    {
        name: 'move_effects',
        comment: 'An effect of a move.',
        columns: {id},
    },
    {
        name: 'move_effect_prose',
        columns: {
            move_effect_id: {integer, primary, notNull, references: 'move_effects.id'},
            local_language_id,
            short_effect: {
                text, index, markdown, comment: 'A short summary of the effect',
            },
            effect: {
                text, index, markdown, comment: 'A detailed description of the effect',
            },
        },
    },
    {
        name: 'move_effect_changelog',
        comment: 'History of changes to move effects across main game versions.',
        columns: {
            id,
            effect_id: {integer, notNull, references: 'move_effects.id'},
            changed_in_version_group_id: {
                integer, notNull, references: 'version_groups.id',
                comment: 'The ID of the version group in which the effect changed',
            },
        },
    },
    {
        name: 'move_effect_changelog_prose',
        columns: {
            move_effect_changelog_id: {
                integer, primary, notNull, references: 'move_effect_changelog.id',
            },
            local_language_id,
            effect: {
                text, notNull, markdown, comment: 'A description of the old behavior',
            },
        },
    },
    {
        name: 'move_targets',
        comment: 'Targeting or "range" of a move, e.g. "Affects all opponents" or "Affects user".',
        columns: {id, identifier},
    },
    {
        name: 'move_target_prose',
        columns: {
            move_target_id: {integer, primary, notNull, references: 'move_targets.id'},
            local_language_id,
            name: {string, index, notNull, plaintext},
            description: {text, index, notNull, plaintext},
        },
    },
    {
        name: 'moves',
        comment: 'A Move: technique or attack a Pokémon can learn to use. IDs below 10000 match the internal IDs used in the games. IDs above 10000 are reserved for Shadow moves from Colosseum and XD.',
        columns: {
            id,
            identifier,
            generation_id: {
                integer, notNull, references: 'generations.id',
                comment: 'ID of the generation this move first appeared in',
            },
            type_id: {
                integer, notNull, references: 'types.id',
                comment: "ID of the move's elemental type",
            },
            power: {
                integer,
                comment: 'Base power of the move, null if it does not have a set base power.',
            },
            pp: {
                integer,
                comment: 'Base PP (Power Points) of the move, null if not applicable (e.g. Struggle and Shadow moves).',
            },
            accuracy: {
                integer, comment: 'Accuracy of the move; NULL means it never misses',
            },
            priority: {integer, notNull, comment: "The move's priority bracket"},
            target_id: {
                integer, notNull, references: 'move_targets.id',
                comment: 'ID of the target (range) of the move',
            },
            damage_class_id: {
                integer, notNull, references: 'move_damage_classes.id',
                comment: 'ID of the damage class (physical/special) of the move',
            },
            effect_id: {integer, notNull, references: 'move_effects.id'},
            effect_chance: {
                integer,
                comment: "The chance for a secondary effect. What this is a chance of is specified by the move's effect.",
            },
            contest_type_id: {
                integer, references: 'contest_types.id',
                comment: "ID of the move's Contest type (e.g. cool or smart)",
            },
            contest_effect_id: {integer, references: 'contest_effects.id'},
            super_contest_effect_id: {integer, references: 'super_contest_effects.id'},
        },
    },
    {
        name: 'move_names',
        columns: {
            move_id: {integer, primary, notNull, references: 'moves.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext, ripped},
        },
    },
    {
        name: 'move_flavor_text',
        comment: 'In-game description of a move.',
        columns: {
            move_id: {integer, primary, notNull, references: 'moves.id'},
            version_group_id: {
                integer, primary, notNull, references: 'version_groups.id',
                comment: 'ID of the version group this text appears in',
            },
            language_id: {integer, primary, notNull, references: 'languages.id'},
            flavor_text: {text, notNull, official, gametext},
        },
    },
    {
        name: 'machines',
        comment: 'A TM or HM; numbered item that can teach a move to a Pokémon.',
        columns: {
            machine_number: {
                integer, primary, notNull,
                comment: 'Number of the machine for TMs, or 100 + the number for HMs',
            },
            version_group_id: {
                integer, primary, notNull, references: 'version_groups.id',
                comment: 'Versions this entry applies to',
            },
            item_id: {
                integer, notNull, references: 'items.id',
                comment: 'ID of the corresponding item',
            },
            move_id: {
                integer, notNull, references: 'moves.id',
                comment: 'ID of the taught move',
            },
        },
    },
    {
        name: 'move_battle_styles',
        comment: 'Battle Palace style. See nature_battle_style_preferences.',
        columns: {id, identifier},
    },
    {
        name: 'move_battle_style_prose',
        columns: {
            move_battle_style_id: {
                integer, primary, notNull, references: 'move_battle_styles.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'move_changelog',
        comment: 'History of changes to moves across main game versions.',
        columns: {
            move_id: {
                integer, primary, notNull, references: 'moves.id',
                comment: 'ID of the move that changed',
            },
            changed_in_version_group_id: {
                integer, primary, notNull, references: 'version_groups.id',
                comment: 'ID of the version group in which the move changed',
            },
            type_id: {
                integer, references: 'types.id',
                comment: 'Prior type of the move, or NULL if unchanged',
            },
            power: {
                integer, comment: 'Prior base power of the move, or NULL if unchanged',
            },
            pp: {
                integer, comment: 'Prior base PP of the move, or NULL if unchanged',
            },
            accuracy: {
                integer, comment: 'Prior accuracy of the move, or NULL if unchanged',
            },
            priority: {
                integer, comment: 'Prior priority of the move, or NULL if unchanged',
            },
            target_id: {
                integer, references: 'move_targets.id',
                comment: 'Prior ID of the target, or NULL if unchanged',
            },
            effect_id: {
                integer, references: 'move_effects.id',
                comment: 'Prior ID of the effect, or NULL if unchanged',
            },
            effect_chance: {
                integer, comment: 'Prior effect chance, or NULL if unchanged',
            },
        },
    },
    {
        name: 'move_flags',
        comment: 'A Move attribute such as "snatchable" or "contact".',
        columns: {id, identifier},
    },
    {
        name: 'move_flag_prose',
        columns: {
            move_flag_id: {integer, primary, notNull, references: 'move_flags.id'},
            local_language_id,
            name: {string, index, plaintext},
            description: {
                text, index, markdown, comment: 'A short description of the flag',
            },
        },
    },
    {
        name: 'move_flag_map',
        comment: 'Maps a move flag to a move.',
        columns: {
            move_id: {integer, primary, notNull, references: 'moves.id'},
            move_flag_id: {integer, primary, notNull, references: 'move_flags.id'},
        },
    },
    {
        name: 'move_meta_ailments',
        comment: 'Common status ailments moves can inflict on a single Pokémon, including major ailments like paralysis and minor ailments like trapping.',
        columns: {id, identifier},
    },
    {
        name: 'move_meta_ailment_names',
        columns: {
            move_meta_ailment_id: {
                integer, primary, notNull, references: 'move_meta_ailments.id',
            },
            local_language_id,
            name: {string, index, notNull, official, plaintext},
        },
    },
    {
        name: 'move_meta_categories',
        comment: 'Very general categories that loosely group move effects.',
        columns: {id, identifier},
    },
    {
        name: 'move_meta_category_prose',
        columns: {
            move_meta_category_id: {
                integer, primary, notNull, references: 'move_meta_categories.id',
            },
            local_language_id,
            description: {
                text, index, notNull, plaintext,
                comment: 'A description of the category',
            },
        },
    },
    {
        name: 'move_meta',
        comment: 'Metadata for move effects, sorta-kinda ripped straight from the game.',
        columns: {
            move_id: {integer, primary, notNull, references: 'moves.id'},
            meta_category_id: {
                integer, notNull, references: 'move_meta_categories.id',
            },
            meta_ailment_id: {
                integer, notNull, references: 'move_meta_ailments.id',
                comment: 'ID of the caused ailment',
            },
            min_hits: {integer, index, comment: 'Minimum number of hits per use'},
            max_hits: {integer, index, comment: 'Maximum number of hits per use'},
            min_turns: {
                integer, index,
                comment: 'Minimum number of turns the user is forced to use the move',
            },
            max_turns: {
                integer, index,
                comment: 'Maximum number of turns the user is forced to use the move',
            },
            drain: {
                integer, notNull, index,
                comment: 'HP drain (if positive) or Recoil damage (if negative), in percent of damage done',
            },
            healing: {
                integer, notNull, index,
                comment: "Healing, in percent of user's max HP",
            },
            crit_rate: {integer, notNull, index, comment: 'Critical hit rate bonus'},
            ailment_chance: {
                integer, notNull, index,
                comment: 'Chance to cause an ailment, in percent',
            },
            flinch_chance: {
                integer, notNull, index,
                comment: 'Chance to cause flinching, in percent',
            },
            stat_chance: {
                integer, notNull, index,
                comment: 'Chance to cause a stat change, in percent',
            },
        },
    },
    {
        name: 'move_meta_stat_changes',
        comment: 'Stat changes moves (may) make.',
        columns: {
            move_id: {integer, primary, notNull, references: 'moves.id'},
            stat_id: {integer, primary, notNull, references: 'stats.id'},
            change: {
                integer, notNull, index,
                comment: 'Amount of increase/decrease, in stages',
            },
        },
    },
    {
        name: 'contest_combos',
        comment: 'Combo of two moves in a Contest.',
        columns: {
            first_move_id: {
                integer, primary, notNull, references: 'moves.id',
                comment: 'The ID of the first move in the combo',
            },
            second_move_id: {
                integer, primary, notNull, references: 'moves.id',
                comment: 'The ID of the second and final move in the combo',
            },
        },
    },
    {
        name: 'super_contest_combos',
        comment: 'Combo of two moves in a Super Contest.',
        columns: {
            first_move_id: {
                integer, primary, notNull, references: 'moves.id',
                comment: 'The ID of the first move in the combo',
            },
            second_move_id: {
                integer, primary, notNull, references: 'moves.id',
                comment: 'The ID of the second and final move in the combo',
            },
        },
    },
    {
        name: 'natures',
        comment: 'A nature a Pokémon can have, such as Calm or Brave.',
        columns: {
            id,
            identifier,
            decreased_stat_id: {
                integer, notNull, references: 'stats.id',
                comment:
                    'ID of the stat that this nature decreases by 10% (if increased_stat_id is the same, the effects cancel out)',
            },
            increased_stat_id: {
                integer, notNull, references: 'stats.id',
                comment:
                    'ID of the stat that this nature increases by 10% (if decreased_stat_id is the same, the effects cancel out)',
            },
            hates_flavor_id: {
                integer, notNull, references: 'contest_types.id',
                comment:
                    'ID of the Berry flavor the Pokémon hates (if hates_flavor_id is the same, the effects cancel out)',
            },
            likes_flavor_id: {
                integer, notNull, references: 'contest_types.id',
                comment:
                    'ID of the Berry flavor the Pokémon likes (if likes_flavor_id is the same, the effects cancel out)',
            },
            game_index: {
                integer, notNull, unique, comment: 'This natures internal ID in the games',
            },
        },
    },
    {
        name: 'nature_names',
        columns: {
            nature_id: {integer, primary, notNull, references: 'natures.id'},
            local_language_id,
            name: {string, index, notNull, official, plaintext, ripped},
        },
    },
    {
        name: 'nature_battle_style_preferences',
        comment:
            'Battle Palace move preference. Specifies how likely a Pokémon with a specific Nature is to use a move of a particular battle style in Battle Palace or Battle Tent.',
        columns: {
            nature_id: {integer, primary, notNull, references: 'natures.id'},
            move_battle_style_id: {
                integer, primary, notNull, references: 'move_battle_styles.id',
            },
            low_hp_preference: {
                integer, notNull,
                comment: 'Chance of using the move, in percent, if HP is under ½',
            },
            high_hp_preference: {
                integer, notNull,
                comment: 'Chance of using the move, in percent, if HP is over ½',
            },
        },
    },
    {
        name: 'pal_park_areas',
        comment: 'A distinct area of Pal Park in which Pokémon appear.',
        columns: {id, identifier},
    },
    {
        name: 'pal_park_area_names',
        columns: {
            pal_park_area_id: {
                integer, primary, notNull, references: 'pal_park_areas.id',
            },
            local_language_id,
            name: {string, index, notNull, plaintext},
        },
    },
    {
        name: 'pokeathlon_stats',
        comment: 'A Pokéathlon stat, such as "Stamina" or "Jump".',
        columns: {id, identifier},
    },
    {
        name: 'pokeathlon_stat_names',
        columns: {
            pokeathlon_stat_id: {
                integer, primary, notNull, references: 'pokeathlon_stats.id',
            },
            local_language_id,
            name: {string, index, notNull, official, plaintext},
        },
    },
    {
        name: 'nature_pokeathlon_stats',
        comment: 'Specifies how a Nature affects a Pokéathlon stat.',
        columns: {
            nature_id: {integer, primary, notNull, references: 'natures.id'},
            pokeathlon_stat_id: {
                integer, primary, notNull, references: 'pokeathlon_stats.id',
            },
            max_change: {integer, notNull, comment: 'Maximum change'},
        },
    },
    {
        name: 'pokedex_version_groups',
        comment:
            'A mapping from Pokédexes to version groups in which they appear as the regional dex.',
        columns: {
            pokedex_id: {integer, primary, references: 'pokedexes.id'},
            version_group_id: {integer, primary, references: 'version_groups.id'},
        },
    },
    {
        name: 'pokemon_species',
        comment:
            'A Pokémon species: the standard 1–151. Or 649. Whatever. ID matches the National Pokédex number of the species.',
        columns: {
            id,
            identifier,
            generation_id: {
                integer, references: 'generations.id',
                comment: 'ID of the generation this species first appeared in',
            },
            evolves_from_species_id: {
                integer, references: 'id',
                comment: 'The species from which this one evolves',
            },
            evolution_chain_id: {
                integer, references: 'evolution_chains.id',
                comment: "ID of the species' evolution chain (a.k.a. family)",
            },
            color_id: {
                integer, notNull, references: 'pokemon_colors.id',
                comment: 'ID of this Pokémons Pokédex color, as used for a gimmick search function in the games.',
            },
            shape_id: {
                integer, notNull, references: 'pokemon_shapes.id',
                comment: "ID of this Pokémon's body shape, as used for a gimmick search function in the games",
            },
            habitat_id: {
                integer, references: 'pokemon_habitats.id',
                comment: "ID of this Pokémon's habitat, as used for a gimmick search function in the games.",
            },
            gender_rate: {
                integer, notNull,
                comment: 'The chance of this Pokémon being female, in eighths; or -1 for genderless"',
            },
            capture_rate: {
                integer, notNull, comment: 'The base capture rate; up to 255',
            },
            base_happiness: {
                integer, notNull, comment: 'The tameness when caught by a normal ball',
            },
            is_baby: {
                boolean, notNull,
                comment: 'True iff the Pokémon is a baby, i.e. a lowest-stage Pokémon that cannot breed but whose evolved form can.',
            },
            hatch_counter: {
                integer, notNull,
                comment: 'Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémons egg hatches, unless utilizing bonuses like Flame Bodies',
            },
            has_gender_differences: {
                boolean, notNull,
                comment: 'Set iff the species exhibits enough sexual dimorphism to have separate sets of sprites in Gen IV and beyond.',
            },
            growth_rate_id: {
                integer, notNull, references: 'growth_rates.id',
                comment: 'ID of the growth rate for this family',
            },
            forms_switchable: {
                boolean, notNull,
                comment: 'True iff a particular individual of this species can switch between its different forms.',
            },
            order: {
                integer, notNull, index,
                comment: 'The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage.',
            },
            conquest_order: {
                integer, index,
                comment: 'The order in which species should be sorted for Pokémon Conquest-related tables. Matches gallery order.',
            },
        },
    },
    {
        name: 'pokemon_species_names',
        columns: {
            pokemon_species_id: {
                integer, primary, notNull, references: 'pokemon_species.id',
            },
            local_language_id,
            name: {string, index, official, plaintext, ripped},
            genus: {
                text, index, official, plaintext,
                comment: 'The short flavor text, such as "Seed" or "Lizard"; usually affixed with the word "Pokémon"',
            },
        },
    },
    {
        name: 'pokemon_species_prose',
        columns: {
            pokemon_species_id: {
                integer, primary, notNull, references: 'pokemon_species.id',
            },
            local_language_id,
            form_description: {
                text, markdown,
                comment: 'Description of how the forms work',
            },
        },
    },
    {
        name: 'pokemon_species_flavor_text',
        comment: 'In-game Pokédex description of a Pokémon.',
        columns: {
            species_id: {integer, primary, notNull, references: 'pokemon_species.id'},
            version_id: {
                integer, primary, notNull, references: 'versions.id',
                comment: 'ID of the version that has this flavor text',
            },
            language_id: {integer, primary, notNull, references: 'languages.id'},
            flavor_text: {text, notNull, official, gametext},
        },
    },
    {
        name: 'pokemon',
        comment: `A Pokémon. The core to this whole mess.

This table defines "Pokémon" the same way the games do: a form with different types, moves, or other game-changing properties counts as a
different Pokémon. For example, this table contains four rows for Deoxys, but only one for Unown.

Non-default forms have IDs above 10000. IDs below 10000 match the species_id column, for convenience.`,
        columns: {
            id,
            identifier: {
                string, notNull, unique,
                comment: 'An identifier, including form iff this row corresponds to a single, named form',
            },
            species_id: {
                integer,
                references: 'pokemon_species.id',
                comment: 'ID of the species this Pokémon belongs to',
            },
            height: {
                integer, notNull,
                comment: 'The height of the Pokémon, in tenths of a meter (decimeters)',
            },
            weight: {
                integer, notNull,
                comment: 'The weight of the Pokémon, in tenths of a kilogram (hectograms)',
            },
            base_experience: {
                integer, notNull,
                comment: 'The base EXP gained when defeating this Pokémon',
            },
            order: {
                integer, notNull, index,
                comment: 'Order for sorting. Almost national order, except families are grouped together.',
            },
            is_default: {
                boolean, notNull, index,
                comment: 'Set for exactly one pokemon used as the default for each species.',
            },
        },
    },
    {
        name: 'pokemon_abilities',
        comment: 'Maps an ability to a Pokémon that can have it.',
        columns: {
            pokemon_id: {integer, primary, notNull, references: 'pokemon.id'},
            ability_id: {integer, primary, notNull, references: 'abilities.id'},
            is_hidden: {
                boolean, notNull, index,
                comment: 'Whether this is a hidden ability',
            },
            slot: {
                integer, primary, notNull,
                comment: 'The ability slot, i.e. 1 or 2 for gen. IV',
            },
        },
    },
    {
        name: 'pokemon_dex_numbers',
        comment: "The number of a species in a particular Pokédex (e.g. Jigglypuff is #138 in Hoenn's 'dex).",
        columns: {
            species_id: {integer, primary, references: 'pokemon_species.id'},
            pokedex_id: {integer, primary, references: 'pokedexes.id'},
            pokedex_number: {
                integer, notNull,
                comment: 'Number of the Pokémon in that the Pokédex',
            },
        },
    },
    {
        name: 'pokemon_egg_groups',
        comment: 'Maps an Egg group to a species; each species belongs to one or two egg groups.',
        columns: {
            species_id: {integer, primary, references: 'pokemon_species.id'},
            egg_group_id: {integer, primary, references: 'egg_groups.id'},
        },
    },
    {
        name: 'pokemon_evolution',
        comment: 'A required action ("trigger") and the conditions under which the trigger must occur to cause a Pokémon to evolve. Any condition may be null if it does not apply for a particular Pokémon.',
        columns: {
            id,
            evolved_species_id: {
                integer, notNull, references: 'pokemon_species.id',
                comment: 'The ID of the post-evolution species.',
            },
            evolution_trigger_id: {
                integer, notNull, references: 'pokemon_species.id',
                comment: 'The ID of the post-evolution species.',
            },
            trigger_item_id: {
                integer, references: 'items.id',
                comment: 'The ID of the item that must be used on the Pokémon.',
            },
            minimum_level: {integer, comment: 'The minimum level for the Pokémon.'},
            gender_id: {
                integer, references: 'genders.id',
                comment: "The ID of the Pokémons required gender, or None if gender doesn't matter",
            },
            location_id: {
                integer, references: 'locations.id',
                comment: 'The ID of the location the evolution must be triggered at.',
            },
            held_item_id: {
                integer, references: 'items.id',
                comment: 'The ID of the item the Pokémon must hold.',
            },
            time_of_day: {
                enum: [['day', 'night'], {enumName: 'pokemon_evolution_time_of_day'}],
                comment: 'The required time of day',
            },
            known_move_id: {
                integer, references: 'moves.id',
                comment: 'The ID of the move the Pokémon must know.',
            },
            known_move_type_id: {
                integer, references: 'types.id',
                comment: 'The ID of the type the Pokémon must know a move of.',
            },
            minimum_happiness: {
                integer, comment: 'The minimum happiness value the Pokémon must have.',
            },
            minimum_beauty: {
                integer,comment: 'The minimum Beauty value the Pokémon must have.',
            },
            minimum_affection: {
                integer,
                comment: 'The minimum number of "affection" hearts the Pokémon must have in Pokémon-Amie.',
            },
            relative_physical_stats: {
                integer,
                comment: "The required relation between the Pokémon's Attack and Defense stats, as sgn(atk-def).",
            },
            party_species_id: {
                integer, references: 'pokemon_species.id',
                comment: 'The ID of the species that must be present in the party.',
            },
            party_type_id: {
                integer, references: 'types.id',
                comment: 'The ID of a type that at least one party member must have.',
            },
            trade_species_id: {
                integer, references: 'pokemon_species.id',
                comment: 'The ID of the species for which this one must be traded.',
            },
            needs_overworld_rain: {
                boolean,
                comment: 'True iff it needs to be raining outside of battle.',
            },
            turn_upside_down: {
                boolean,
                comment: 'True iff the 3DS needs to be turned upside-down as this Pokémon levels up.',
            },
        },
    },
    {
        name: 'pokemon_forms',
        comment: 'An individual form of a Pokémon. This includes *every* variant (except color differences) of every Pokémon, regardless of how the games treat them. Even Pokémon with no alternate forms have one row in this table, to represent their lone "normal" form. Forms which are not the default for their species have IDs above 10000. IDs below 10000 correspond to ID of the species for convenience, but this should not be relied upon. To get the species ID of a form, join with the pokemon table.',
        columns: {
            id,
            identifier: {
                string, notNull, unique,
                comment: 'A unique identifier for this form among all forms of all Pokémon',
            },
            form_identifier: {
                string,
                comment: 'An identifier of the form, unique among a species. May be null for the default form of the species.',
            },
            pokemon_id: {
                integer, notNull, references: 'pokemon.id',
                comment: 'The ID of the base Pokémon for this form.',
            },
            introduced_in_version_group_id: {
                integer, references: 'version_groups.id',
                comment: 'The ID of the version group in which this form first appeared.',
            },
            is_default: {
                boolean, notNull,
                comment: 'Set for exactly one form used as the default for each pokemon (not necessarily species).',
            },
            is_battle_only: {
                boolean, notNull,
                comment: 'Set iff the form can only appear in battle.',
            },
            is_mega: {
                boolean, notNull,
                comment: 'Records whether this form is a Mega Evolution.',
            },
            form_order: {
                integer, notNull,
                comment: 'The order in which forms should be sorted within a species forms. Multiple forms may have equal order, in which case they should fall back on sorting by name. Used in generating `pokemon_forms.order` and `pokemon.order`.',
            },
            order: {
                integer, notNull,
                comment: 'The order in which forms should be sorted within all forms. Multiple forms may have equal order, in which case they should fall back on sorting by name.',
            },
        },
    },
    {
        name: 'pokemon_form_names',
        columns: {
            pokemon_form_id: {
                integer, primary, notNull, references: 'pokemon_forms.id',
            },
            local_language_id,
            pokemon_name: {
                string, index, official, plaintext,
                comment: 'The full pokémon name, e.g. "Sky Shaymin", for pokémon with different forms',
            },
            form_name: {
                string, index, official, plaintext,
                comment: 'The full form name, e.g. "Sky Forme", for pokémon with different forms',
            },
        },
    },
    {
        name: 'pokemon_form_generations',
        comment: 'Links Pokémon forms to the generations they exist in.',
        columns: {
            pokemon_form_id: {
                integer, primary, notNull, references: 'pokemon_forms.id',
            },
            generation_id: {integer, primary, notNull, references: 'generations.id'},
            game_index: {
                integer, notNull,
                comment: 'The internal ID the games use for this form.',
            },
        },
    },
    {
        name: 'pokemon_form_pokeathlon_stats',
        comment: "A Pokémon form's performance in one Pokéathlon stat.",
        columns: {
            pokemon_form_id: {
                integer, primary, notNull, references: 'pokemon_forms.id',
            },
            pokeathlon_stat_id: {
                integer, primary, notNull, references: 'pokeathlon_stats.id',
            },
            minimum_stat: {
                integer, notNull,
                comment: 'The minimum value for this stat for this Pokémon form.',
            },
            base_stat: {
                integer, notNull,
                comment: 'The maximum value for this stat for this Pokémon form.',
            },
            maximum_stat: {
                integer, notNull,
                comment: 'The maximum value for this stat for this Pokémon form.',
            },
        },
    },
    {
        name: 'pokemon_game_indices',
        comment: 'The number of a Pokémon a game uses internally.',
        columns: {
            pokemon_id: {integer, primary, notNull, references: 'pokemon.id'},
            version_id: {integer, primary, notNull, references: 'versions.id'},
            game_index: {
                integer, notNull,
                comment: 'Internal ID the versions games use for the Pokémon',
            },
        },
    },
    {
        name: 'pokemon_items',
        comment: 'Record of an item a Pokémon can hold in the wild.',
        columns: {
            pokemon_id: {integer, primary, notNull, references: 'pokemon.id'},
            version_id: {integer, primary, notNull, references: 'versions.id'},
            item_id: {integer, primary, notNull, references: 'items.id'},
            rarity: {
                integer, notNull,
                comment: 'Chance of the Pokémon holding the item, in percent',
            },
        },
    },
    {
        name: 'pokemon_moves',
        comment: 'Record of a move a Pokémon can learn.',
        columns: {
            pokemon_id: {integer, primary, notNull, references: 'pokemon.id'},
            version_group_id: {
                integer, primary, notNull,
                references: 'version_groups.id',
            },
            move_id: {integer, primary, notNull, references: 'moves.id'},
            pokemon_move_method_id: {
                integer, primary, notNull, index, references: 'pokemon_move_methods.id',
                comment: 'ID of the method this move is learned by',
            },
            level: {
                integer, primary, index,
                comment: 'Level the move is learned at, if applicable',
            },
            order: {
                integer,
                comment: 'The order which moves learned at the same level are learned in',
            },
        },
    },
    {
        name: 'pokemon_stats',
        comment: 'A stat value of a Pokémon.',
        columns: {
            pokemon_id: {integer, primary, notNull, references: 'pokemon.id'},
            stat_id: {integer, primary, notNull, references: 'stats.id'},
            base_stat: {integer, notNull, comment: 'The base stat'},
            effort: {
                integer, notNull,
                comment: 'The effort increase in this stat gained when this Pokémon is defeated',
            },
        },
    },
    {
        name: 'pokemon_types',
        comment: 'Maps a type to a Pokémon. Each Pokémon has 1 or 2 types.',
        columns: {
            pokemon_id: {integer, primary, notNull, references: 'pokemon.id'},
            type_id: {integer, notNull, references: 'types.id'},
            slot: {
                integer, primary, notNull,
                comment: "The type's slot, 1 or 2, used to sort types if there are two of them",
            },
        },
    },
    {
        name: 'pal_park',
        comment: 'Data for the Pal Park mini-game in Generation IV.',
        columns: {
            species_id: {
                integer, primary, references: 'pokemon_species.id',
                comment: 'The Pokémon species this data pertains to',
            },
            area_id: {
                integer, notNull, references: 'pal_park_areas.id',
                comment: 'The area in which this Pokémon is found',
            },
            base_score: {
                integer, notNull,
                comment: "Used in calculating the player's score at the end of a Pal Park run",
            },
            rate: {
                integer, notNull,
                comment: 'Base rate for encountering this Pokémon',
            },
        },
    },
    {
        name: 'encounter_slots',
        comment: 'An abstract "slot" within a method, associated with both some set of conditions and a rarity.',
        columns: {
            id,
            version_group_id: {
                integer, notNull, references: 'version_groups.id',
                comment: 'The ID of the version group this slot is in',
            },
            encounter_method_id: {
                integer, notNull, references: 'encounter_methods.id',
            },
            slot: {integer, comment: "This slot's order for the location and method"},
            rarity: {integer, comment: 'The chance of the encounter as a percentage'},
        },
    },
    {
        name: 'encounters',
        comment: `Encounters with wild Pokémon.

Within a given area in a given game, encounters are differentiated by the
"slot" they are in and the state of the game world.

What the player is doing to get an encounter, such as surfing or walking
through tall grass, is called a method. Each method has its own set of
encounter slots.

Within a method, slots are defined primarily by rarity. Each slot can
also be affected by world conditions; for example, the 20% slot for walking
in tall grass is affected by whether a swarm is in effect in that area.
"Is there a swarm?" is a condition; "there is a swarm" and "there is not a
swarm" are the possible values of this condition.

A slot (20% walking in grass) and any appropriate world conditions (no
swarm) are thus enough to define a specific encounter.`,
        columns: {
            id,
            version_id: {integer, notNull, references: 'versions.id'},
            location_area_id: {integer, notNull, references: 'location_areas.id'},
            encounter_slot_id: {
                integer, notNull, references: 'encounter_slots.id',
                comment: 'The ID of the encounter slot, which determines method and rarity',
            },
            pokemon_id: {integer, notNull, references: 'pokemon.id'},
            min_level: {
                integer, notNull, comment: 'The minimum level of the encountered Pokémon',
            },
            max_level: {
                integer, notNull, comment: 'The maximum level of the encountered Pokémon',
            },
        },
    },
    {
        name: 'encounter_condition_value_map',
        comment: 'Maps encounters to the specific conditions under which they occur.',
        columns: {
            encounter_id: {integer, primary, notNull, references: 'encounters.id'},
            encounter_condition_value_id: {
                integer, primary, notNull, references: 'encounter_condition_values.id',
            },
        },
    },
    {
        name: 'version_group_pokemon_move_methods',
        comment:
            'Maps a version group to a move learn methods it supports. "Supporting" means simply that the method appears in the game. For example, Breeding didn\'t exist in Gen.I, so it\'s not in this table.',
        columns: {
            version_group_id: {
                integer, primary, notNull, references: 'version_groups.id',
            },
            pokemon_move_method_id: {
                integer, primary, notNull, references: 'pokemon_move_methods.id',
            },
        },
    },
];
