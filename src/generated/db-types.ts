/* tslint:disable */

export namespace abilitiesFields {
  export type id = number;
  export type identifier = string;
  export type generation_id = number;
  export type is_main_series = boolean;
}

export interface abilities {
  id: abilitiesFields.id;
  identifier: abilitiesFields.identifier;
  generation_id: abilitiesFields.generation_id;
  is_main_series: abilitiesFields.is_main_series;
}

export namespace ability_changelogFields {
  export type id = number;
  export type ability_id = number;
  export type changed_in_version_group_id = number;
}

export interface ability_changelog {
  id: ability_changelogFields.id;
  ability_id: ability_changelogFields.ability_id;
  changed_in_version_group_id: ability_changelogFields.changed_in_version_group_id;
}

export namespace ability_changelog_proseFields {
  export type ability_changelog_id = number;
  export type local_language_id = number;
  export type effect = string;
}

export interface ability_changelog_prose {
  ability_changelog_id: ability_changelog_proseFields.ability_changelog_id;
  local_language_id: ability_changelog_proseFields.local_language_id;
  effect: ability_changelog_proseFields.effect;
}

export namespace ability_flavor_textFields {
  export type ability_id = number;
  export type version_group_id = number;
  export type language_id = number;
  export type flavor_text = string;
}

export interface ability_flavor_text {
  ability_id: ability_flavor_textFields.ability_id;
  version_group_id: ability_flavor_textFields.version_group_id;
  language_id: ability_flavor_textFields.language_id;
  flavor_text: ability_flavor_textFields.flavor_text;
}

export namespace ability_namesFields {
  export type ability_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface ability_names {
  ability_id: ability_namesFields.ability_id;
  local_language_id: ability_namesFields.local_language_id;
  name: ability_namesFields.name;
}

export namespace ability_proseFields {
  export type ability_id = number;
  export type local_language_id = number;
  export type short_effect = string;
  export type effect = string;
}

export interface ability_prose {
  ability_id: ability_proseFields.ability_id;
  local_language_id: ability_proseFields.local_language_id;
  short_effect: ability_proseFields.short_effect;
  effect: ability_proseFields.effect;
}

export namespace berriesFields {
  export type id = number;
  export type item_id = number;
  export type firmness_id = number;
  export type natural_gift_power = number | null;
  export type natural_gift_type_id = number | null;
  export type size = number;
  export type max_harvest = number;
  export type growth_time = number;
  export type soil_dryness = number;
  export type smoothness = number;
}

export interface berries {
  id: berriesFields.id;
  item_id: berriesFields.item_id;
  firmness_id: berriesFields.firmness_id;
  natural_gift_power: berriesFields.natural_gift_power;
  natural_gift_type_id: berriesFields.natural_gift_type_id;
  size: berriesFields.size;
  max_harvest: berriesFields.max_harvest;
  growth_time: berriesFields.growth_time;
  soil_dryness: berriesFields.soil_dryness;
  smoothness: berriesFields.smoothness;
}

export namespace berry_firmnessFields {
  export type id = number;
  export type identifier = string;
}

export interface berry_firmness {
  id: berry_firmnessFields.id;
  identifier: berry_firmnessFields.identifier;
}

export namespace berry_firmness_namesFields {
  export type berry_firmness_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface berry_firmness_names {
  berry_firmness_id: berry_firmness_namesFields.berry_firmness_id;
  local_language_id: berry_firmness_namesFields.local_language_id;
  name: berry_firmness_namesFields.name;
}

export namespace berry_flavorsFields {
  export type berry_id = number;
  export type contest_type_id = number;
  export type flavor = number;
}

export interface berry_flavors {
  berry_id: berry_flavorsFields.berry_id;
  contest_type_id: berry_flavorsFields.contest_type_id;
  flavor: berry_flavorsFields.flavor;
}

export namespace characteristic_textFields {
  export type characteristic_id = number;
  export type local_language_id = number;
  export type message = string;
}

export interface characteristic_text {
  characteristic_id: characteristic_textFields.characteristic_id;
  local_language_id: characteristic_textFields.local_language_id;
  message: characteristic_textFields.message;
}

export namespace characteristicsFields {
  export type id = number;
  export type stat_id = number;
  export type gene_mod_5 = number;
}

export interface characteristics {
  id: characteristicsFields.id;
  stat_id: characteristicsFields.stat_id;
  gene_mod_5: characteristicsFields.gene_mod_5;
}

export namespace contest_combosFields {
  export type first_move_id = number;
  export type second_move_id = number;
}

export interface contest_combos {
  first_move_id: contest_combosFields.first_move_id;
  second_move_id: contest_combosFields.second_move_id;
}

export namespace contest_effect_proseFields {
  export type contest_effect_id = number;
  export type local_language_id = number;
  export type flavor_text = string;
  export type effect = string;
}

export interface contest_effect_prose {
  contest_effect_id: contest_effect_proseFields.contest_effect_id;
  local_language_id: contest_effect_proseFields.local_language_id;
  flavor_text: contest_effect_proseFields.flavor_text;
  effect: contest_effect_proseFields.effect;
}

export namespace contest_effectsFields {
  export type id = number;
  export type appeal = number;
  export type jam = number;
}

export interface contest_effects {
  id: contest_effectsFields.id;
  appeal: contest_effectsFields.appeal;
  jam: contest_effectsFields.jam;
}

export namespace contest_type_namesFields {
  export type contest_type_id = number;
  export type local_language_id = number;
  export type name = string;
  export type flavor = string;
  export type color = string;
}

export interface contest_type_names {
  contest_type_id: contest_type_namesFields.contest_type_id;
  local_language_id: contest_type_namesFields.local_language_id;
  name: contest_type_namesFields.name;
  flavor: contest_type_namesFields.flavor;
  color: contest_type_namesFields.color;
}

export namespace contest_typesFields {
  export type id = number;
  export type identifier = string;
}

export interface contest_types {
  id: contest_typesFields.id;
  identifier: contest_typesFields.identifier;
}

export namespace egg_group_proseFields {
  export type egg_group_id = number;
  export type local_language_id = number;
  export type name = string | null;
}

export interface egg_group_prose {
  egg_group_id: egg_group_proseFields.egg_group_id;
  local_language_id: egg_group_proseFields.local_language_id;
  name: egg_group_proseFields.name;
}

export namespace egg_groupsFields {
  export type id = number;
  export type identifier = string;
}

export interface egg_groups {
  id: egg_groupsFields.id;
  identifier: egg_groupsFields.identifier;
}

export namespace encounter_condition_proseFields {
  export type encounter_condition_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface encounter_condition_prose {
  encounter_condition_id: encounter_condition_proseFields.encounter_condition_id;
  local_language_id: encounter_condition_proseFields.local_language_id;
  name: encounter_condition_proseFields.name;
}

export namespace encounter_condition_value_mapFields {
  export type encounter_id = number;
  export type encounter_condition_value_id = number;
}

export interface encounter_condition_value_map {
  encounter_id: encounter_condition_value_mapFields.encounter_id;
  encounter_condition_value_id: encounter_condition_value_mapFields.encounter_condition_value_id;
}

export namespace encounter_condition_value_proseFields {
  export type encounter_condition_value_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface encounter_condition_value_prose {
  encounter_condition_value_id: encounter_condition_value_proseFields.encounter_condition_value_id;
  local_language_id: encounter_condition_value_proseFields.local_language_id;
  name: encounter_condition_value_proseFields.name;
}

export namespace encounter_condition_valuesFields {
  export type id = number;
  export type identifier = string;
  export type encounter_condition_id = number;
  export type is_default = boolean;
}

export interface encounter_condition_values {
  id: encounter_condition_valuesFields.id;
  identifier: encounter_condition_valuesFields.identifier;
  encounter_condition_id: encounter_condition_valuesFields.encounter_condition_id;
  is_default: encounter_condition_valuesFields.is_default;
}

export namespace encounter_conditionsFields {
  export type id = number;
  export type identifier = string;
}

export interface encounter_conditions {
  id: encounter_conditionsFields.id;
  identifier: encounter_conditionsFields.identifier;
}

export namespace encounter_method_proseFields {
  export type encounter_method_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface encounter_method_prose {
  encounter_method_id: encounter_method_proseFields.encounter_method_id;
  local_language_id: encounter_method_proseFields.local_language_id;
  name: encounter_method_proseFields.name;
}

export namespace encounter_methodsFields {
  export type id = number;
  export type identifier = string;
  export type order = number;
}

export interface encounter_methods {
  id: encounter_methodsFields.id;
  identifier: encounter_methodsFields.identifier;
  order: encounter_methodsFields.order;
}

export namespace encounter_slotsFields {
  export type id = number;
  export type version_group_id = number;
  export type encounter_method_id = number;
  export type slot = number | null;
  export type rarity = number | null;
}

export interface encounter_slots {
  id: encounter_slotsFields.id;
  version_group_id: encounter_slotsFields.version_group_id;
  encounter_method_id: encounter_slotsFields.encounter_method_id;
  slot: encounter_slotsFields.slot;
  rarity: encounter_slotsFields.rarity;
}

export namespace encountersFields {
  export type id = number;
  export type version_id = number;
  export type location_area_id = number;
  export type encounter_slot_id = number;
  export type pokemon_id = number;
  export type min_level = number;
  export type max_level = number;
}

export interface encounters {
  id: encountersFields.id;
  version_id: encountersFields.version_id;
  location_area_id: encountersFields.location_area_id;
  encounter_slot_id: encountersFields.encounter_slot_id;
  pokemon_id: encountersFields.pokemon_id;
  min_level: encountersFields.min_level;
  max_level: encountersFields.max_level;
}

export namespace evolution_chainsFields {
  export type id = number;
  export type baby_trigger_item_id = number | null;
}

export interface evolution_chains {
  id: evolution_chainsFields.id;
  baby_trigger_item_id: evolution_chainsFields.baby_trigger_item_id;
}

export namespace evolution_trigger_proseFields {
  export type evolution_trigger_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface evolution_trigger_prose {
  evolution_trigger_id: evolution_trigger_proseFields.evolution_trigger_id;
  local_language_id: evolution_trigger_proseFields.local_language_id;
  name: evolution_trigger_proseFields.name;
}

export namespace evolution_triggersFields {
  export type id = number;
  export type identifier = string;
}

export interface evolution_triggers {
  id: evolution_triggersFields.id;
  identifier: evolution_triggersFields.identifier;
}

export namespace experienceFields {
  export type growth_rate_id = number;
  export type level = number;
  export type experience = number;
}

export interface experience {
  growth_rate_id: experienceFields.growth_rate_id;
  level: experienceFields.level;
  experience: experienceFields.experience;
}

export namespace gendersFields {
  export type id = number;
  export type identifier = string;
}

export interface genders {
  id: gendersFields.id;
  identifier: gendersFields.identifier;
}

export namespace generation_namesFields {
  export type generation_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface generation_names {
  generation_id: generation_namesFields.generation_id;
  local_language_id: generation_namesFields.local_language_id;
  name: generation_namesFields.name;
}

export namespace generationsFields {
  export type id = number;
  export type identifier = string;
  export type main_region_id = number;
}

export interface generations {
  id: generationsFields.id;
  identifier: generationsFields.identifier;
  main_region_id: generationsFields.main_region_id;
}

export namespace growth_rate_proseFields {
  export type growth_rate_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface growth_rate_prose {
  growth_rate_id: growth_rate_proseFields.growth_rate_id;
  local_language_id: growth_rate_proseFields.local_language_id;
  name: growth_rate_proseFields.name;
}

export namespace growth_ratesFields {
  export type id = number;
  export type identifier = string;
  export type formula = string;
}

export interface growth_rates {
  id: growth_ratesFields.id;
  identifier: growth_ratesFields.identifier;
  formula: growth_ratesFields.formula;
}

export namespace item_categoriesFields {
  export type id = number;
  export type identifier = string;
  export type pocket_id = number;
}

export interface item_categories {
  id: item_categoriesFields.id;
  identifier: item_categoriesFields.identifier;
  pocket_id: item_categoriesFields.pocket_id;
}

export namespace item_category_proseFields {
  export type item_category_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface item_category_prose {
  item_category_id: item_category_proseFields.item_category_id;
  local_language_id: item_category_proseFields.local_language_id;
  name: item_category_proseFields.name;
}

export namespace item_flag_mapFields {
  export type item_id = number;
  export type item_flag_id = number;
}

export interface item_flag_map {
  item_id: item_flag_mapFields.item_id;
  item_flag_id: item_flag_mapFields.item_flag_id;
}

export namespace item_flag_proseFields {
  export type item_flag_id = number;
  export type local_language_id = number;
  export type name = string | null;
  export type description = string;
}

export interface item_flag_prose {
  item_flag_id: item_flag_proseFields.item_flag_id;
  local_language_id: item_flag_proseFields.local_language_id;
  name: item_flag_proseFields.name;
  description: item_flag_proseFields.description;
}

export namespace item_flagsFields {
  export type id = number;
  export type identifier = string;
}

export interface item_flags {
  id: item_flagsFields.id;
  identifier: item_flagsFields.identifier;
}

export namespace item_flavor_textFields {
  export type item_id = number;
  export type version_group_id = number;
  export type language_id = number;
  export type flavor_text = string;
}

export interface item_flavor_text {
  item_id: item_flavor_textFields.item_id;
  version_group_id: item_flavor_textFields.version_group_id;
  language_id: item_flavor_textFields.language_id;
  flavor_text: item_flavor_textFields.flavor_text;
}

export namespace item_fling_effect_proseFields {
  export type item_fling_effect_id = number;
  export type local_language_id = number;
  export type effect = string;
}

export interface item_fling_effect_prose {
  item_fling_effect_id: item_fling_effect_proseFields.item_fling_effect_id;
  local_language_id: item_fling_effect_proseFields.local_language_id;
  effect: item_fling_effect_proseFields.effect;
}

export namespace item_fling_effectsFields {
  export type id = number;
  export type identifier = string;
}

export interface item_fling_effects {
  id: item_fling_effectsFields.id;
  identifier: item_fling_effectsFields.identifier;
}

export namespace item_game_indicesFields {
  export type item_id = number;
  export type generation_id = number;
  export type game_index = number;
}

export interface item_game_indices {
  item_id: item_game_indicesFields.item_id;
  generation_id: item_game_indicesFields.generation_id;
  game_index: item_game_indicesFields.game_index;
}

export namespace item_namesFields {
  export type item_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface item_names {
  item_id: item_namesFields.item_id;
  local_language_id: item_namesFields.local_language_id;
  name: item_namesFields.name;
}

export namespace item_pocket_namesFields {
  export type item_pocket_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface item_pocket_names {
  item_pocket_id: item_pocket_namesFields.item_pocket_id;
  local_language_id: item_pocket_namesFields.local_language_id;
  name: item_pocket_namesFields.name;
}

export namespace item_pocketsFields {
  export type id = number;
  export type identifier = string;
}

export interface item_pockets {
  id: item_pocketsFields.id;
  identifier: item_pocketsFields.identifier;
}

export namespace item_proseFields {
  export type item_id = number;
  export type local_language_id = number;
  export type short_effect = string;
  export type effect = string;
}

export interface item_prose {
  item_id: item_proseFields.item_id;
  local_language_id: item_proseFields.local_language_id;
  short_effect: item_proseFields.short_effect;
  effect: item_proseFields.effect;
}

export namespace itemsFields {
  export type id = number;
  export type identifier = string;
  export type category_id = number;
  export type cost = number;
  export type fling_power = number | null;
  export type fling_effect_id = number | null;
}

export interface items {
  id: itemsFields.id;
  identifier: itemsFields.identifier;
  category_id: itemsFields.category_id;
  cost: itemsFields.cost;
  fling_power: itemsFields.fling_power;
  fling_effect_id: itemsFields.fling_effect_id;
}

export namespace language_namesFields {
  export type language_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface language_names {
  language_id: language_namesFields.language_id;
  local_language_id: language_namesFields.local_language_id;
  name: language_namesFields.name;
}

export namespace languagesFields {
  export type id = number;
  export type identifier = string;
  export type iso639 = string;
  export type iso3166 = string;
  export type official = boolean;
  export type order = number | null;
}

export interface languages {
  id: languagesFields.id;
  identifier: languagesFields.identifier;
  iso639: languagesFields.iso639;
  iso3166: languagesFields.iso3166;
  official: languagesFields.official;
  order: languagesFields.order;
}

export namespace location_area_encounter_ratesFields {
  export type location_area_id = number;
  export type encounter_method_id = number;
  export type version_id = number;
  export type rate = number | null;
}

export interface location_area_encounter_rates {
  location_area_id: location_area_encounter_ratesFields.location_area_id;
  encounter_method_id: location_area_encounter_ratesFields.encounter_method_id;
  version_id: location_area_encounter_ratesFields.version_id;
  rate: location_area_encounter_ratesFields.rate;
}

export namespace location_area_proseFields {
  export type location_area_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface location_area_prose {
  location_area_id: location_area_proseFields.location_area_id;
  local_language_id: location_area_proseFields.local_language_id;
  name: location_area_proseFields.name;
}

export namespace location_areasFields {
  export type id = number;
  export type identifier = string | null;
  export type location_id = number | null;
  export type game_index = number;
}

export interface location_areas {
  id: location_areasFields.id;
  identifier: location_areasFields.identifier;
  location_id: location_areasFields.location_id;
  game_index: location_areasFields.game_index;
}

export namespace location_game_indicesFields {
  export type location_id = number;
  export type generation_id = number;
  export type game_index = number;
}

export interface location_game_indices {
  location_id: location_game_indicesFields.location_id;
  generation_id: location_game_indicesFields.generation_id;
  game_index: location_game_indicesFields.game_index;
}

export namespace location_namesFields {
  export type location_id = number;
  export type local_language_id = number;
  export type name = string;
  export type subtitle = string;
}

export interface location_names {
  location_id: location_namesFields.location_id;
  local_language_id: location_namesFields.local_language_id;
  name: location_namesFields.name;
  subtitle: location_namesFields.subtitle;
}

export namespace locationsFields {
  export type id = number;
  export type identifier = string;
  export type region_id = number | null;
}

export interface locations {
  id: locationsFields.id;
  identifier: locationsFields.identifier;
  region_id: locationsFields.region_id;
}

export namespace machinesFields {
  export type machine_number = number;
  export type version_group_id = number;
  export type item_id = number;
  export type move_id = number;
}

export interface machines {
  machine_number: machinesFields.machine_number;
  version_group_id: machinesFields.version_group_id;
  item_id: machinesFields.item_id;
  move_id: machinesFields.move_id;
}

export namespace move_battle_style_proseFields {
  export type move_battle_style_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface move_battle_style_prose {
  move_battle_style_id: move_battle_style_proseFields.move_battle_style_id;
  local_language_id: move_battle_style_proseFields.local_language_id;
  name: move_battle_style_proseFields.name;
}

export namespace move_battle_stylesFields {
  export type id = number;
  export type identifier = string;
}

export interface move_battle_styles {
  id: move_battle_stylesFields.id;
  identifier: move_battle_stylesFields.identifier;
}

export namespace move_changelogFields {
  export type move_id = number;
  export type changed_in_version_group_id = number;
  export type type_id = number | null;
  export type power = number | null;
  export type pp = number | null;
  export type accuracy = number | null;
  export type priority = number | null;
  export type target_id = number | null;
  export type effect_id = number | null;
  export type effect_chance = number | null;
}

export interface move_changelog {
  move_id: move_changelogFields.move_id;
  changed_in_version_group_id: move_changelogFields.changed_in_version_group_id;
  type_id: move_changelogFields.type_id;
  power: move_changelogFields.power;
  pp: move_changelogFields.pp;
  accuracy: move_changelogFields.accuracy;
  priority: move_changelogFields.priority;
  target_id: move_changelogFields.target_id;
  effect_id: move_changelogFields.effect_id;
  effect_chance: move_changelogFields.effect_chance;
}

export namespace move_damage_class_proseFields {
  export type move_damage_class_id = number;
  export type local_language_id = number;
  export type name = string | null;
  export type description = string | null;
}

export interface move_damage_class_prose {
  move_damage_class_id: move_damage_class_proseFields.move_damage_class_id;
  local_language_id: move_damage_class_proseFields.local_language_id;
  name: move_damage_class_proseFields.name;
  description: move_damage_class_proseFields.description;
}

export namespace move_damage_classesFields {
  export type id = number;
  export type identifier = string;
}

export interface move_damage_classes {
  id: move_damage_classesFields.id;
  identifier: move_damage_classesFields.identifier;
}

export namespace move_effect_changelogFields {
  export type id = number;
  export type effect_id = number;
  export type changed_in_version_group_id = number;
}

export interface move_effect_changelog {
  id: move_effect_changelogFields.id;
  effect_id: move_effect_changelogFields.effect_id;
  changed_in_version_group_id: move_effect_changelogFields.changed_in_version_group_id;
}

export namespace move_effect_changelog_proseFields {
  export type move_effect_changelog_id = number;
  export type local_language_id = number;
  export type effect = string;
}

export interface move_effect_changelog_prose {
  move_effect_changelog_id: move_effect_changelog_proseFields.move_effect_changelog_id;
  local_language_id: move_effect_changelog_proseFields.local_language_id;
  effect: move_effect_changelog_proseFields.effect;
}

export namespace move_effect_proseFields {
  export type move_effect_id = number;
  export type local_language_id = number;
  export type short_effect = string | null;
  export type effect = string | null;
}

export interface move_effect_prose {
  move_effect_id: move_effect_proseFields.move_effect_id;
  local_language_id: move_effect_proseFields.local_language_id;
  short_effect: move_effect_proseFields.short_effect;
  effect: move_effect_proseFields.effect;
}

export namespace move_effectsFields {
  export type id = number;
}

export interface move_effects {
  id: move_effectsFields.id;
}

export namespace move_flag_mapFields {
  export type move_id = number;
  export type move_flag_id = number;
}

export interface move_flag_map {
  move_id: move_flag_mapFields.move_id;
  move_flag_id: move_flag_mapFields.move_flag_id;
}

export namespace move_flag_proseFields {
  export type move_flag_id = number;
  export type local_language_id = number;
  export type name = string | null;
  export type description = string | null;
}

export interface move_flag_prose {
  move_flag_id: move_flag_proseFields.move_flag_id;
  local_language_id: move_flag_proseFields.local_language_id;
  name: move_flag_proseFields.name;
  description: move_flag_proseFields.description;
}

export namespace move_flagsFields {
  export type id = number;
  export type identifier = string;
}

export interface move_flags {
  id: move_flagsFields.id;
  identifier: move_flagsFields.identifier;
}

export namespace move_flavor_textFields {
  export type move_id = number;
  export type version_group_id = number;
  export type language_id = number;
  export type flavor_text = string;
}

export interface move_flavor_text {
  move_id: move_flavor_textFields.move_id;
  version_group_id: move_flavor_textFields.version_group_id;
  language_id: move_flavor_textFields.language_id;
  flavor_text: move_flavor_textFields.flavor_text;
}

export namespace move_metaFields {
  export type move_id = number;
  export type meta_category_id = number;
  export type meta_ailment_id = number;
  export type min_hits = number | null;
  export type max_hits = number | null;
  export type min_turns = number | null;
  export type max_turns = number | null;
  export type drain = number;
  export type healing = number;
  export type crit_rate = number;
  export type ailment_chance = number;
  export type flinch_chance = number;
  export type stat_chance = number;
}

export interface move_meta {
  move_id: move_metaFields.move_id;
  meta_category_id: move_metaFields.meta_category_id;
  meta_ailment_id: move_metaFields.meta_ailment_id;
  min_hits: move_metaFields.min_hits;
  max_hits: move_metaFields.max_hits;
  min_turns: move_metaFields.min_turns;
  max_turns: move_metaFields.max_turns;
  drain: move_metaFields.drain;
  healing: move_metaFields.healing;
  crit_rate: move_metaFields.crit_rate;
  ailment_chance: move_metaFields.ailment_chance;
  flinch_chance: move_metaFields.flinch_chance;
  stat_chance: move_metaFields.stat_chance;
}

export namespace move_meta_ailment_namesFields {
  export type move_meta_ailment_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface move_meta_ailment_names {
  move_meta_ailment_id: move_meta_ailment_namesFields.move_meta_ailment_id;
  local_language_id: move_meta_ailment_namesFields.local_language_id;
  name: move_meta_ailment_namesFields.name;
}

export namespace move_meta_ailmentsFields {
  export type id = number;
  export type identifier = string;
}

export interface move_meta_ailments {
  id: move_meta_ailmentsFields.id;
  identifier: move_meta_ailmentsFields.identifier;
}

export namespace move_meta_categoriesFields {
  export type id = number;
  export type identifier = string;
}

export interface move_meta_categories {
  id: move_meta_categoriesFields.id;
  identifier: move_meta_categoriesFields.identifier;
}

export namespace move_meta_category_proseFields {
  export type move_meta_category_id = number;
  export type local_language_id = number;
  export type description = string;
}

export interface move_meta_category_prose {
  move_meta_category_id: move_meta_category_proseFields.move_meta_category_id;
  local_language_id: move_meta_category_proseFields.local_language_id;
  description: move_meta_category_proseFields.description;
}

export namespace move_meta_stat_changesFields {
  export type move_id = number;
  export type stat_id = number;
  export type change = number;
}

export interface move_meta_stat_changes {
  move_id: move_meta_stat_changesFields.move_id;
  stat_id: move_meta_stat_changesFields.stat_id;
  change: move_meta_stat_changesFields.change;
}

export namespace move_namesFields {
  export type move_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface move_names {
  move_id: move_namesFields.move_id;
  local_language_id: move_namesFields.local_language_id;
  name: move_namesFields.name;
}

export namespace move_target_proseFields {
  export type move_target_id = number;
  export type local_language_id = number;
  export type name = string;
  export type description = string;
}

export interface move_target_prose {
  move_target_id: move_target_proseFields.move_target_id;
  local_language_id: move_target_proseFields.local_language_id;
  name: move_target_proseFields.name;
  description: move_target_proseFields.description;
}

export namespace move_targetsFields {
  export type id = number;
  export type identifier = string;
}

export interface move_targets {
  id: move_targetsFields.id;
  identifier: move_targetsFields.identifier;
}

export namespace movesFields {
  export type id = number;
  export type identifier = string;
  export type generation_id = number;
  export type type_id = number;
  export type power = number | null;
  export type pp = number | null;
  export type accuracy = number | null;
  export type priority = number;
  export type target_id = number;
  export type damage_class_id = number;
  export type effect_id = number;
  export type effect_chance = number | null;
  export type contest_type_id = number | null;
  export type contest_effect_id = number | null;
  export type super_contest_effect_id = number | null;
}

export interface moves {
  id: movesFields.id;
  identifier: movesFields.identifier;
  generation_id: movesFields.generation_id;
  type_id: movesFields.type_id;
  power: movesFields.power;
  pp: movesFields.pp;
  accuracy: movesFields.accuracy;
  priority: movesFields.priority;
  target_id: movesFields.target_id;
  damage_class_id: movesFields.damage_class_id;
  effect_id: movesFields.effect_id;
  effect_chance: movesFields.effect_chance;
  contest_type_id: movesFields.contest_type_id;
  contest_effect_id: movesFields.contest_effect_id;
  super_contest_effect_id: movesFields.super_contest_effect_id;
}

export namespace nature_battle_style_preferencesFields {
  export type nature_id = number;
  export type move_battle_style_id = number;
  export type low_hp_preference = number;
  export type high_hp_preference = number;
}

export interface nature_battle_style_preferences {
  nature_id: nature_battle_style_preferencesFields.nature_id;
  move_battle_style_id: nature_battle_style_preferencesFields.move_battle_style_id;
  low_hp_preference: nature_battle_style_preferencesFields.low_hp_preference;
  high_hp_preference: nature_battle_style_preferencesFields.high_hp_preference;
}

export namespace nature_namesFields {
  export type nature_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface nature_names {
  nature_id: nature_namesFields.nature_id;
  local_language_id: nature_namesFields.local_language_id;
  name: nature_namesFields.name;
}

export namespace nature_pokeathlon_statsFields {
  export type nature_id = number;
  export type pokeathlon_stat_id = number;
  export type max_change = number;
}

export interface nature_pokeathlon_stats {
  nature_id: nature_pokeathlon_statsFields.nature_id;
  pokeathlon_stat_id: nature_pokeathlon_statsFields.pokeathlon_stat_id;
  max_change: nature_pokeathlon_statsFields.max_change;
}

export namespace naturesFields {
  export type id = number;
  export type identifier = string;
  export type decreased_stat_id = number;
  export type increased_stat_id = number;
  export type hates_flavor_id = number;
  export type likes_flavor_id = number;
  export type game_index = number;
}

export interface natures {
  id: naturesFields.id;
  identifier: naturesFields.identifier;
  decreased_stat_id: naturesFields.decreased_stat_id;
  increased_stat_id: naturesFields.increased_stat_id;
  hates_flavor_id: naturesFields.hates_flavor_id;
  likes_flavor_id: naturesFields.likes_flavor_id;
  game_index: naturesFields.game_index;
}

export namespace pal_parkFields {
  export type species_id = number;
  export type area_id = number;
  export type base_score = number;
  export type rate = number;
}

export interface pal_park {
  species_id: pal_parkFields.species_id;
  area_id: pal_parkFields.area_id;
  base_score: pal_parkFields.base_score;
  rate: pal_parkFields.rate;
}

export namespace pal_park_area_namesFields {
  export type pal_park_area_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface pal_park_area_names {
  pal_park_area_id: pal_park_area_namesFields.pal_park_area_id;
  local_language_id: pal_park_area_namesFields.local_language_id;
  name: pal_park_area_namesFields.name;
}

export namespace pal_park_areasFields {
  export type id = number;
  export type identifier = string;
}

export interface pal_park_areas {
  id: pal_park_areasFields.id;
  identifier: pal_park_areasFields.identifier;
}

export namespace pokeathlon_stat_namesFields {
  export type pokeathlon_stat_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface pokeathlon_stat_names {
  pokeathlon_stat_id: pokeathlon_stat_namesFields.pokeathlon_stat_id;
  local_language_id: pokeathlon_stat_namesFields.local_language_id;
  name: pokeathlon_stat_namesFields.name;
}

export namespace pokeathlon_statsFields {
  export type id = number;
  export type identifier = string;
}

export interface pokeathlon_stats {
  id: pokeathlon_statsFields.id;
  identifier: pokeathlon_statsFields.identifier;
}

export namespace pokedex_proseFields {
  export type pokedex_id = number;
  export type local_language_id = number;
  export type name = string | null;
  export type description = string | null;
}

export interface pokedex_prose {
  pokedex_id: pokedex_proseFields.pokedex_id;
  local_language_id: pokedex_proseFields.local_language_id;
  name: pokedex_proseFields.name;
  description: pokedex_proseFields.description;
}

export namespace pokedex_version_groupsFields {
  export type pokedex_id = number;
  export type version_group_id = number;
}

export interface pokedex_version_groups {
  pokedex_id: pokedex_version_groupsFields.pokedex_id;
  version_group_id: pokedex_version_groupsFields.version_group_id;
}

export namespace pokedexesFields {
  export type id = number;
  export type identifier = string;
  export type region_id = number | null;
  export type is_main_series = boolean;
}

export interface pokedexes {
  id: pokedexesFields.id;
  identifier: pokedexesFields.identifier;
  region_id: pokedexesFields.region_id;
  is_main_series: pokedexesFields.is_main_series;
}

export namespace pokemonFields {
  export type id = number;
  export type identifier = string;
  export type species_id = number | null;
  export type height = number;
  export type weight = number;
  export type base_experience = number;
  export type order = number;
  export type is_default = boolean;
}

export interface pokemon {
  id: pokemonFields.id;
  identifier: pokemonFields.identifier;
  species_id: pokemonFields.species_id;
  height: pokemonFields.height;
  weight: pokemonFields.weight;
  base_experience: pokemonFields.base_experience;
  order: pokemonFields.order;
  is_default: pokemonFields.is_default;
}

export namespace pokemon_abilitiesFields {
  export type pokemon_id = number;
  export type ability_id = number;
  export type is_hidden = boolean;
  export type slot = number;
}

export interface pokemon_abilities {
  pokemon_id: pokemon_abilitiesFields.pokemon_id;
  ability_id: pokemon_abilitiesFields.ability_id;
  is_hidden: pokemon_abilitiesFields.is_hidden;
  slot: pokemon_abilitiesFields.slot;
}

export namespace pokemon_color_namesFields {
  export type pokemon_color_id = number;
  export type local_language_id = number;
  export type name = string | null;
}

export interface pokemon_color_names {
  pokemon_color_id: pokemon_color_namesFields.pokemon_color_id;
  local_language_id: pokemon_color_namesFields.local_language_id;
  name: pokemon_color_namesFields.name;
}

export namespace pokemon_colorsFields {
  export type id = number;
  export type identifier = string;
}

export interface pokemon_colors {
  id: pokemon_colorsFields.id;
  identifier: pokemon_colorsFields.identifier;
}

export namespace pokemon_dex_numbersFields {
  export type species_id = number;
  export type pokedex_id = number;
  export type pokedex_number = number;
}

export interface pokemon_dex_numbers {
  species_id: pokemon_dex_numbersFields.species_id;
  pokedex_id: pokemon_dex_numbersFields.pokedex_id;
  pokedex_number: pokemon_dex_numbersFields.pokedex_number;
}

export namespace pokemon_egg_groupsFields {
  export type species_id = number;
  export type egg_group_id = number;
}

export interface pokemon_egg_groups {
  species_id: pokemon_egg_groupsFields.species_id;
  egg_group_id: pokemon_egg_groupsFields.egg_group_id;
}

export namespace pokemon_evolutionFields {
  export type id = number;
  export type evolved_species_id = number;
  export type evolution_trigger_id = number;
  export type trigger_item_id = number | null;
  export type minimum_level = number | null;
  export type gender_id = number | null;
  export type location_id = number | null;
  export type held_item_id = number | null;
  export type time_of_day = string | null;
  export type known_move_id = number | null;
  export type known_move_type_id = number | null;
  export type minimum_happiness = number | null;
  export type minimum_beauty = number | null;
  export type minimum_affection = number | null;
  export type relative_physical_stats = number | null;
  export type party_species_id = number | null;
  export type party_type_id = number | null;
  export type trade_species_id = number | null;
  export type needs_overworld_rain = boolean | null;
  export type turn_upside_down = boolean | null;
}

export interface pokemon_evolution {
  id: pokemon_evolutionFields.id;
  evolved_species_id: pokemon_evolutionFields.evolved_species_id;
  evolution_trigger_id: pokemon_evolutionFields.evolution_trigger_id;
  trigger_item_id: pokemon_evolutionFields.trigger_item_id;
  minimum_level: pokemon_evolutionFields.minimum_level;
  gender_id: pokemon_evolutionFields.gender_id;
  location_id: pokemon_evolutionFields.location_id;
  held_item_id: pokemon_evolutionFields.held_item_id;
  time_of_day: pokemon_evolutionFields.time_of_day;
  known_move_id: pokemon_evolutionFields.known_move_id;
  known_move_type_id: pokemon_evolutionFields.known_move_type_id;
  minimum_happiness: pokemon_evolutionFields.minimum_happiness;
  minimum_beauty: pokemon_evolutionFields.minimum_beauty;
  minimum_affection: pokemon_evolutionFields.minimum_affection;
  relative_physical_stats: pokemon_evolutionFields.relative_physical_stats;
  party_species_id: pokemon_evolutionFields.party_species_id;
  party_type_id: pokemon_evolutionFields.party_type_id;
  trade_species_id: pokemon_evolutionFields.trade_species_id;
  needs_overworld_rain: pokemon_evolutionFields.needs_overworld_rain;
  turn_upside_down: pokemon_evolutionFields.turn_upside_down;
}

export namespace pokemon_form_generationsFields {
  export type pokemon_form_id = number;
  export type generation_id = number;
  export type game_index = number;
}

export interface pokemon_form_generations {
  pokemon_form_id: pokemon_form_generationsFields.pokemon_form_id;
  generation_id: pokemon_form_generationsFields.generation_id;
  game_index: pokemon_form_generationsFields.game_index;
}

export namespace pokemon_form_namesFields {
  export type pokemon_form_id = number;
  export type local_language_id = number;
  export type pokemon_name = string | null;
  export type form_name = string | null;
}

export interface pokemon_form_names {
  pokemon_form_id: pokemon_form_namesFields.pokemon_form_id;
  local_language_id: pokemon_form_namesFields.local_language_id;
  pokemon_name: pokemon_form_namesFields.pokemon_name;
  form_name: pokemon_form_namesFields.form_name;
}

export namespace pokemon_form_pokeathlon_statsFields {
  export type pokemon_form_id = number;
  export type pokeathlon_stat_id = number;
  export type minimum_stat = number;
  export type base_stat = number;
  export type maximum_stat = number;
}

export interface pokemon_form_pokeathlon_stats {
  pokemon_form_id: pokemon_form_pokeathlon_statsFields.pokemon_form_id;
  pokeathlon_stat_id: pokemon_form_pokeathlon_statsFields.pokeathlon_stat_id;
  minimum_stat: pokemon_form_pokeathlon_statsFields.minimum_stat;
  base_stat: pokemon_form_pokeathlon_statsFields.base_stat;
  maximum_stat: pokemon_form_pokeathlon_statsFields.maximum_stat;
}

export namespace pokemon_formsFields {
  export type id = number;
  export type identifier = string;
  export type form_identifier = string | null;
  export type pokemon_id = number;
  export type introduced_in_version_group_id = number | null;
  export type is_default = boolean;
  export type is_battle_only = boolean;
  export type is_mega = boolean;
  export type form_order = number;
  export type order = number;
}

export interface pokemon_forms {
  id: pokemon_formsFields.id;
  identifier: pokemon_formsFields.identifier;
  form_identifier: pokemon_formsFields.form_identifier;
  pokemon_id: pokemon_formsFields.pokemon_id;
  introduced_in_version_group_id: pokemon_formsFields.introduced_in_version_group_id;
  is_default: pokemon_formsFields.is_default;
  is_battle_only: pokemon_formsFields.is_battle_only;
  is_mega: pokemon_formsFields.is_mega;
  form_order: pokemon_formsFields.form_order;
  order: pokemon_formsFields.order;
}

export namespace pokemon_game_indicesFields {
  export type pokemon_id = number;
  export type version_id = number;
  export type game_index = number;
}

export interface pokemon_game_indices {
  pokemon_id: pokemon_game_indicesFields.pokemon_id;
  version_id: pokemon_game_indicesFields.version_id;
  game_index: pokemon_game_indicesFields.game_index;
}

export namespace pokemon_habitat_namesFields {
  export type pokemon_habitat_id = number;
  export type local_language_id = number;
  export type name = string | null;
}

export interface pokemon_habitat_names {
  pokemon_habitat_id: pokemon_habitat_namesFields.pokemon_habitat_id;
  local_language_id: pokemon_habitat_namesFields.local_language_id;
  name: pokemon_habitat_namesFields.name;
}

export namespace pokemon_habitatsFields {
  export type id = number;
  export type identifier = string;
}

export interface pokemon_habitats {
  id: pokemon_habitatsFields.id;
  identifier: pokemon_habitatsFields.identifier;
}

export namespace pokemon_itemsFields {
  export type pokemon_id = number;
  export type version_id = number;
  export type item_id = number;
  export type rarity = number;
}

export interface pokemon_items {
  pokemon_id: pokemon_itemsFields.pokemon_id;
  version_id: pokemon_itemsFields.version_id;
  item_id: pokemon_itemsFields.item_id;
  rarity: pokemon_itemsFields.rarity;
}

export namespace pokemon_move_method_proseFields {
  export type pokemon_move_method_id = number;
  export type local_language_id = number;
  export type name = string | null;
  export type description = string | null;
}

export interface pokemon_move_method_prose {
  pokemon_move_method_id: pokemon_move_method_proseFields.pokemon_move_method_id;
  local_language_id: pokemon_move_method_proseFields.local_language_id;
  name: pokemon_move_method_proseFields.name;
  description: pokemon_move_method_proseFields.description;
}

export namespace pokemon_move_methodsFields {
  export type id = number;
  export type identifier = string;
}

export interface pokemon_move_methods {
  id: pokemon_move_methodsFields.id;
  identifier: pokemon_move_methodsFields.identifier;
}

export namespace pokemon_movesFields {
  export type pokemon_id = number;
  export type version_group_id = number;
  export type move_id = number;
  export type pokemon_move_method_id = number;
  export type level = number;
  export type order = number | null;
}

export interface pokemon_moves {
  pokemon_id: pokemon_movesFields.pokemon_id;
  version_group_id: pokemon_movesFields.version_group_id;
  move_id: pokemon_movesFields.move_id;
  pokemon_move_method_id: pokemon_movesFields.pokemon_move_method_id;
  level: pokemon_movesFields.level;
  order: pokemon_movesFields.order;
}

export namespace pokemon_shape_proseFields {
  export type pokemon_shape_id = number;
  export type local_language_id = number;
  export type name = string | null;
  export type awesome_name = string | null;
  export type description = string | null;
}

export interface pokemon_shape_prose {
  pokemon_shape_id: pokemon_shape_proseFields.pokemon_shape_id;
  local_language_id: pokemon_shape_proseFields.local_language_id;
  name: pokemon_shape_proseFields.name;
  awesome_name: pokemon_shape_proseFields.awesome_name;
  description: pokemon_shape_proseFields.description;
}

export namespace pokemon_shapesFields {
  export type id = number;
  export type identifier = string;
}

export interface pokemon_shapes {
  id: pokemon_shapesFields.id;
  identifier: pokemon_shapesFields.identifier;
}

export namespace pokemon_speciesFields {
  export type id = number;
  export type identifier = string;
  export type generation_id = number | null;
  export type evolves_from_species_id = number | null;
  export type evolution_chain_id = number | null;
  export type color_id = number;
  export type shape_id = number;
  export type habitat_id = number | null;
  export type gender_rate = number;
  export type capture_rate = number;
  export type base_happiness = number;
  export type is_baby = boolean;
  export type hatch_counter = number;
  export type has_gender_differences = boolean;
  export type growth_rate_id = number;
  export type forms_switchable = boolean;
  export type order = number;
  export type conquest_order = number | null;
}

export interface pokemon_species {
  id: pokemon_speciesFields.id;
  identifier: pokemon_speciesFields.identifier;
  generation_id: pokemon_speciesFields.generation_id;
  evolves_from_species_id: pokemon_speciesFields.evolves_from_species_id;
  evolution_chain_id: pokemon_speciesFields.evolution_chain_id;
  color_id: pokemon_speciesFields.color_id;
  shape_id: pokemon_speciesFields.shape_id;
  habitat_id: pokemon_speciesFields.habitat_id;
  gender_rate: pokemon_speciesFields.gender_rate;
  capture_rate: pokemon_speciesFields.capture_rate;
  base_happiness: pokemon_speciesFields.base_happiness;
  is_baby: pokemon_speciesFields.is_baby;
  hatch_counter: pokemon_speciesFields.hatch_counter;
  has_gender_differences: pokemon_speciesFields.has_gender_differences;
  growth_rate_id: pokemon_speciesFields.growth_rate_id;
  forms_switchable: pokemon_speciesFields.forms_switchable;
  order: pokemon_speciesFields.order;
  conquest_order: pokemon_speciesFields.conquest_order;
}

export namespace pokemon_species_flavor_textFields {
  export type species_id = number;
  export type version_id = number;
  export type language_id = number;
  export type flavor_text = string;
}

export interface pokemon_species_flavor_text {
  species_id: pokemon_species_flavor_textFields.species_id;
  version_id: pokemon_species_flavor_textFields.version_id;
  language_id: pokemon_species_flavor_textFields.language_id;
  flavor_text: pokemon_species_flavor_textFields.flavor_text;
}

export namespace pokemon_species_namesFields {
  export type pokemon_species_id = number;
  export type local_language_id = number;
  export type name = string | null;
  export type genus = string | null;
}

export interface pokemon_species_names {
  pokemon_species_id: pokemon_species_namesFields.pokemon_species_id;
  local_language_id: pokemon_species_namesFields.local_language_id;
  name: pokemon_species_namesFields.name;
  genus: pokemon_species_namesFields.genus;
}

export namespace pokemon_species_proseFields {
  export type pokemon_species_id = number;
  export type local_language_id = number;
  export type form_description = string | null;
}

export interface pokemon_species_prose {
  pokemon_species_id: pokemon_species_proseFields.pokemon_species_id;
  local_language_id: pokemon_species_proseFields.local_language_id;
  form_description: pokemon_species_proseFields.form_description;
}

export namespace pokemon_statsFields {
  export type pokemon_id = number;
  export type stat_id = number;
  export type base_stat = number;
  export type effort = number;
}

export interface pokemon_stats {
  pokemon_id: pokemon_statsFields.pokemon_id;
  stat_id: pokemon_statsFields.stat_id;
  base_stat: pokemon_statsFields.base_stat;
  effort: pokemon_statsFields.effort;
}

export namespace pokemon_typesFields {
  export type pokemon_id = number;
  export type type_id = number;
  export type slot = number;
}

export interface pokemon_types {
  pokemon_id: pokemon_typesFields.pokemon_id;
  type_id: pokemon_typesFields.type_id;
  slot: pokemon_typesFields.slot;
}

export namespace region_namesFields {
  export type region_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface region_names {
  region_id: region_namesFields.region_id;
  local_language_id: region_namesFields.local_language_id;
  name: region_namesFields.name;
}

export namespace regionsFields {
  export type id = number;
  export type identifier = string;
}

export interface regions {
  id: regionsFields.id;
  identifier: regionsFields.identifier;
}

export namespace stat_namesFields {
  export type stat_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface stat_names {
  stat_id: stat_namesFields.stat_id;
  local_language_id: stat_namesFields.local_language_id;
  name: stat_namesFields.name;
}

export namespace statsFields {
  export type id = number;
  export type identifier = string;
  export type damage_class_id = number | null;
  export type is_battle_only = boolean;
  export type game_index = number | null;
}

export interface stats {
  id: statsFields.id;
  identifier: statsFields.identifier;
  damage_class_id: statsFields.damage_class_id;
  is_battle_only: statsFields.is_battle_only;
  game_index: statsFields.game_index;
}

export namespace super_contest_combosFields {
  export type first_move_id = number;
  export type second_move_id = number;
}

export interface super_contest_combos {
  first_move_id: super_contest_combosFields.first_move_id;
  second_move_id: super_contest_combosFields.second_move_id;
}

export namespace super_contest_effect_proseFields {
  export type super_contest_effect_id = number;
  export type local_language_id = number;
  export type flavor_text = string;
}

export interface super_contest_effect_prose {
  super_contest_effect_id: super_contest_effect_proseFields.super_contest_effect_id;
  local_language_id: super_contest_effect_proseFields.local_language_id;
  flavor_text: super_contest_effect_proseFields.flavor_text;
}

export namespace super_contest_effectsFields {
  export type id = number;
  export type appeal = number;
}

export interface super_contest_effects {
  id: super_contest_effectsFields.id;
  appeal: super_contest_effectsFields.appeal;
}

export namespace type_efficacyFields {
  export type damage_type_id = number;
  export type target_type_id = number;
  export type damage_factor = number;
}

export interface type_efficacy {
  damage_type_id: type_efficacyFields.damage_type_id;
  target_type_id: type_efficacyFields.target_type_id;
  damage_factor: type_efficacyFields.damage_factor;
}

export namespace type_game_indicesFields {
  export type type_id = number;
  export type generation_id = number;
  export type game_index = number;
}

export interface type_game_indices {
  type_id: type_game_indicesFields.type_id;
  generation_id: type_game_indicesFields.generation_id;
  game_index: type_game_indicesFields.game_index;
}

export namespace type_namesFields {
  export type type_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface type_names {
  type_id: type_namesFields.type_id;
  local_language_id: type_namesFields.local_language_id;
  name: type_namesFields.name;
}

export namespace typesFields {
  export type id = number;
  export type identifier = string;
  export type generation_id = number;
  export type damage_class_id = number | null;
}

export interface types {
  id: typesFields.id;
  identifier: typesFields.identifier;
  generation_id: typesFields.generation_id;
  damage_class_id: typesFields.damage_class_id;
}

export namespace version_group_pokemon_move_methodsFields {
  export type version_group_id = number;
  export type pokemon_move_method_id = number;
}

export interface version_group_pokemon_move_methods {
  version_group_id: version_group_pokemon_move_methodsFields.version_group_id;
  pokemon_move_method_id: version_group_pokemon_move_methodsFields.pokemon_move_method_id;
}

export namespace version_group_regionsFields {
  export type version_group_id = number;
  export type region_id = number;
}

export interface version_group_regions {
  version_group_id: version_group_regionsFields.version_group_id;
  region_id: version_group_regionsFields.region_id;
}

export namespace version_groupsFields {
  export type id = number;
  export type identifier = string;
  export type generation_id = number;
  export type order = number | null;
}

export interface version_groups {
  id: version_groupsFields.id;
  identifier: version_groupsFields.identifier;
  generation_id: version_groupsFields.generation_id;
  order: version_groupsFields.order;
}

export namespace version_namesFields {
  export type version_id = number;
  export type local_language_id = number;
  export type name = string;
}

export interface version_names {
  version_id: version_namesFields.version_id;
  local_language_id: version_namesFields.local_language_id;
  name: version_namesFields.name;
}

export namespace versionsFields {
  export type id = number;
  export type identifier = string;
  export type version_group_id = number;
}

export interface versions {
  id: versionsFields.id;
  identifier: versionsFields.identifier;
  version_group_id: versionsFields.version_group_id;
}
