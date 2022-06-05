/* eslint-disable no-irregular-whitespace, no-undef */
module.exports = {
  async up(knex) {
    await knex.transaction(async (transaction) => {
      await transaction.schema.createTable("wellenplan_shows", (table) => {
        table.uuid("id").primary();
        table.string("status").notNullable().defaultTo("draft");
        table.uuid("user_created");
        table.foreign("user_created").references("directus_users.id");
        table.datetime("date_created").defaultTo(knex.fn.now());
        table.uuid("user_updated");
        table.foreign("user_updated").references("directus_users.id");
        table.datetime("date_updated");
        table.string("show_name").defaultTo("NULL");
      });
      await transaction.schema.createTable(
        "wellenplan_show_episodes",
        (table) => {
          table.uuid("id").primary();
          table.string("status").notNullable().defaultTo("draft");
          table.integer("sort");
          table.uuid("user_created");
          table.foreign("user_created").references("directus_users.id");
          table.datetime("date_created").defaultTo(knex.fn.now());
          table.uuid("user_updated");
          table.foreign("user_updated").references("directus_users.id");
          table.datetime("date_updated");
          table.uuid("show");
          table.foreign("show").references("wellenplan_shows.id");
          table.string("episode_name").defaultTo("NULL");
          table.datetime("start");
          table.datetime("end");
        }
      );
      await transaction.schema.createTable("wellenplan_hourclocks", (table) => {
        table.uuid("id").primary();
        table.string("status").notNullable().defaultTo("draft");
        table.integer("sort");
        table.uuid("user_created");
        table.foreign("user_created").references("directus_users.id");
        table.datetime("date_created").defaultTo(knex.fn.now());
        table.uuid("user_updated");
        table.foreign("user_updated").references("directus_users.id");
        table.datetime("date_updated");
        table.string("name").defaultTo("NULL");
        table.uuid("show_episode");
        table.foreign("show_episode").references("wellenplan_show_episodes.id");
      });
      await transaction.schema.createTable(
        "wellenplan_hourclock_slices",
        (table) => {
          table.increments("id");
          table.uuid("hourclock");
          table.foreign("hourclock").references("wellenplan_hourclocks.id");
          table.integer("sort");
          table.string("title");
          table.integer("duration");
          table.string("color");
        }
      );
      await transaction("directus_collections").insert([
        {
          collection: "wellenplan",
          collapse: "open",
          icon: "radio",
          sort: 1,
        },
        {
          collection: "wellenplan_shows",
          group: "wellenplan",
          collapse: "open",
          accountability: "all",
          archive_app_filter: true,
          archive_field: "status",
          archive_value: "archived",
          unarchive_value: "draft",
          display_template: "{{show_name}}",
          icon: "groups",
          sort: 1,
          translations:
            '[{"language":"en-US","translation":"Shows","singular":"show","plural":"shows"}]',
        },
        {
          collection: "wellenplan_show_episodes",
          group: "wellenplan",
          collapse: "open",
          accountability: "all",
          archive_app_filter: true,
          archive_field: "status",
          archive_value: "archived",
          unarchive_value: "draft",
          display_template:
            "{{show.show_name}}: {{episode_name}} ({{start}} - {{end}})",
          icon: "calendar_month",
          sort: 2,
          sort_field: null,
          translations:
            '[{"language":"en-US","translation":"Episodes","singular":"episode","plural":"episodes"}]',
        },
        {
          collection: "wellenplan_hourclocks",
          group: "wellenplan",
          collapse: "open",
          accountability: "all",
          archive_app_filter: true,
          archive_field: "status",
          archive_value: "archived",
          unarchive_value: "draft",
          display_template: "{{name}}",
          icon: "pie_chart",
          sort: 3,
          sort_field: "sort",
          translations:
            '[{"language":"en-US","translation":"Hour Clocks","singular":"hour clock","plural":"hour clocks"}]',
        },
        {
          collection: "wellenplan_hourclock_slices",
          group: "wellenplan_hourclocks",
          collapse: "open",
          hidden: true,
          accountability: "all",
          archive_app_filter: true,
          display_template: "{{color}}{{title}} ({{duration}})",
          sort: null,
          translations:
            '[{"language":"en-US","translation":"Hour Clock Slices","singular":"slice","plural":"slices"}]',
        },
      ]);
      await transaction("directus_fields").insert([
        {
          collection: "wellenplan_shows",
          field: "id",
          hidden: true,
          interface: "input",
          readonly: true,
          required: false,
          sort: 1,
          special: "uuid",
          width: "full",
        },
        {
          collection: "wellenplan_shows",
          field: "status",
          display: "labels",
          display_options:
            '{"showAsDot":true,"choices":[{"text":"$t:published","value":"published","foreground":"#FFFFFF","background":"var(--primary)"},{"text":"$t:draft","value":"draft","foreground":"#18222F","background":"#D3DAE4"},{"text":"$t:archived","value":"archived","foreground":"#FFFFFF","background":"var(--warning)"}]}',
          interface: "select-dropdown",
          options:
            '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}',
          sort: 2,
          width: "full",
        },
        {
          collection: "wellenplan_shows",
          field: "user_created",
          display: "user",
          hidden: true,
          interface: "select-dropdown-m2o",
          options:
            '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}',
          readonly: true,
          sort: 3,
          special: "user-created",
          width: "half",
        },
        {
          collection: "wellenplan_shows",
          field: "date_created",
          display: "datetime",
          display_options: '{"relative":true}',
          hidden: true,
          interface: "datetime",
          readonly: true,
          sort: 4,
          special: "date-created",
          width: "half",
        },
        {
          collection: "wellenplan_shows",
          field: "user_updated",
          display: "user",
          hidden: true,
          interface: "select-dropdown-m2o",
          options:
            '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}',
          readonly: true,
          sort: 5,
          special: "user-updated",
          width: "half",
        },
        {
          collection: "wellenplan_shows",
          field: "date_updated",
          display: "datetime",
          display_options: '{"relative":true}',
          hidden: true,
          interface: "datetime",
          readonly: true,
          sort: 6,
          special: "date-updated",
          width: "half",
        },
        {
          collection: "wellenplan_shows",
          field: "show_name",
          interface: "input",
          required: true,
          sort: 7,
          width: "full",
        },
        {
          collection: "wellenplan_shows",
          field: "episodes",
          display: "related-values",
          display_options:
            '{"template":"{{episode_name}} ({{start}} - {{end}})"}',
          interface: "list-o2m",
          options:
            '{"enableSelect":false,"template":"{{episode_name}} ({{start}} - {{end}})"}',
          sort: 8,
          special: "o2m",
          width: "full",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "id",
          hidden: true,
          interface: "input",
          readonly: true,
          required: false,
          sort: 1,
          special: "uuid",
          width: "full",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "status",
          display: "labels",
          display_options:
            '{"showAsDot":true,"choices":[{"text":"$t:published","value":"published","foreground":"#FFFFFF","background":"var(--primary)"},{"text":"$t:draft","value":"draft","foreground":"#18222F","background":"#D3DAE4"},{"text":"$t:archived","value":"archived","foreground":"#FFFFFF","background":"var(--warning)"}]}',
          interface: "select-dropdown",
          options:
            '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}',
          sort: 2,
          width: "full",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "sort",
          hidden: true,
          interface: "input",
          sort: 3,
          width: "full",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "user_created",
          display: "user",
          hidden: true,
          interface: "select-dropdown-m2o",
          options:
            '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}',
          readonly: true,
          sort: 4,
          special: "user-created",
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "date_created",
          display: "datetime",
          display_options: '{"relative":true}',
          hidden: true,
          interface: "datetime",
          readonly: true,
          sort: 5,
          special: "date-created",
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "user_updated",
          display: "user",
          hidden: true,
          interface: "select-dropdown-m2o",
          options:
            '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}',
          readonly: true,
          sort: 6,
          special: "user-updated",
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "date_updated",
          display: "datetime",
          display_options: '{"relative":true}',
          hidden: true,
          interface: "datetime",
          readonly: true,
          sort: 7,
          special: "date-updated",
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "episode_name",
          interface: "input",
          required: true,
          sort: 8,
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "start",
          interface: "datetime",
          sort: 9,
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "end",
          interface: "datetime",
          sort: 10,
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "show",
          interface: "select-dropdown-m2o",
          options: '{"template":"{{show_name}}"}',
          required: true,
          sort: 11,
          width: "half",
        },
        {
          collection: "wellenplan_show_episodes",
          field: "hourclock",
          display: "related-values",
          display_options: '{"template":"{{name}}"}',
          hidden: true,
          options: '{"enableCreate":false}',
          readonly: true,
          sort: 12,
          special: "o2m",
          width: "full",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "id",
          hidden: true,
          interface: "input",
          readonly: true,
          required: false,
          sort: 1,
          special: "uuid",
          width: "full",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "status",
          display: "labels",
          display_options:
            '{"showAsDot":true,"choices":[{"text":"$t:published","value":"published","foreground":"#FFFFFF","background":"var(--primary)"},{"text":"$t:draft","value":"draft","foreground":"#18222F","background":"#D3DAE4"},{"text":"$t:archived","value":"archived","foreground":"#FFFFFF","background":"var(--warning)"}]}',
          interface: "select-dropdown",
          options:
            '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}',
          sort: 2,
          width: "full",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "sort",
          hidden: true,
          interface: "input",
          sort: 3,
          width: "full",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "user_created",
          display: "user",
          hidden: true,
          interface: "select-dropdown-m2o",
          options:
            '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}',
          readonly: true,
          sort: 4,
          special: "user-created",
          width: "half",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "date_created",
          display: "datetime",
          display_options: '{"relative":true}',
          hidden: true,
          interface: "datetime",
          readonly: true,
          sort: 5,
          special: "date-created",
          width: "half",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "user_updated",
          display: "user",
          hidden: true,
          interface: "select-dropdown-m2o",
          options:
            '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}',
          readonly: true,
          sort: 6,
          special: "user-updated",
          width: "half",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "date_updated",
          display: "datetime",
          display_options: '{"relative":true}',
          hidden: true,
          interface: "datetime",
          readonly: true,
          sort: 7,
          special: "date-updated",
          width: "half",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "name",
          interface: "input",
          required: true,
          sort: 8,
          width: "half",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "show_episode",
          display: "related-values",
          display_options: '{"template":"{{show.show_name}}: {{episode_name}}"}',
          interface: "select-dropdown-m2o",
          sort: 9,
          special: "m2o",
          width: "half",
        },
        {
          collection: "wellenplan_hourclocks",
          field: "slices",
          display: "related-values",
          display_options: '{"template":"{{color}}{{title}} ({{duration}})"}',
          interface: "hour-clocks-interface",
          options: '{"enableCreate":true,"enableSelect":false}',
          sort: 10,
          special: "o2m",
          width: "full",
        },
        {
          collection: "wellenplan_hourclock_slices",
          field: "id",
          hidden: true,
          width: "full",
        },
        {
          collection: "wellenplan_hourclock_slices",
          field: "hourclock",
          hidden: true,
          interface: "select-dropdown-m2o",
          width: "full",
        },
        {
          collection: "wellenplan_hourclock_slices",
          field: "sort",
          hidden: true,
          interface: "input",
          width: "full",
        },
        {
          collection: "wellenplan_hourclock_slices",
          field: "title",
          interface: "input",
          required: true,
          width: "full",
        },
        {
          collection: "wellenplan_hourclock_slices",
          field: "duration",
          display: "duration",
          interface: "duration",
          required: true,
          width: "full",
        },
        {
          collection: "wellenplan_hourclock_slices",
          field: "color",
          display: "color",
          interface: "select-color",
          required: true,
          width: "full",
        }
      ]);
      await transaction("directus_relations").insert([
        {
          many_collection: "wellenplan_shows",
          many_field: "user_created",
          one_collection: "directus_users",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_shows",
          many_field: "user_updated",
          one_collection: "directus_users",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_show_episodes",
          many_field: "user_created",
          one_collection: "directus_users",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_show_episodes",
          many_field: "user_updated",
          one_collection: "directus_users",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_show_episodes",
          many_field: "show",
          one_collection: "wellenplan_shows",
          one_field: "episodes",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_hourclocks",
          many_field: "user_created",
          one_collection: "directus_users",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_hourclocks",
          many_field: "user_updated",
          one_collection: "directus_users",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_hourclocks",
          many_field: "show_episode",
          one_collection: "wellenplan_show_episodes",
          one_field: "hourclocks",
          one_deselect_action: "nullify",
        },
        {
          many_collection: "wellenplan_hourclock_slices",
          many_field: "hourclock",
          one_collection: "wellenplan_hourclocks",
          one_field: "slices",
          one_deselect_action: "nullify",
          sort_field: "sort",
        }
      ]);
      await transaction('directus_settings').insert([
        {
          id: 1,
          project_name: "Wellenplan",
          storage_asset_transform: "all",
          module_bar: '[{"type":"module","id":"content","enabled":true},{"type":"module","id":"users","enabled":true},{"type":"module","id":"files","enabled":true},{"type":"module","id":"insights","enabled":true},{"type":"module","id":"docs","enabled":true},{"type":"module","id":"settings","enabled":true,"locked":true},{"type":"module","id":"hourclock","enabled":true}]',
          project_descriptor: "Broadcast Management",
          default_language: "en-US",

        }
      ])
      await transaction('directus_presets').insert([
        {
          collection: "wellenplan_shows",
          icon: "bookmark_outline",
          layout: "tabular",
          layout_options: '{"tabular":{"widths":{"status":32}}}',
          layout_query: '{"tabular":{"fields":["status","show_name","episodes"]}}',
        },
        {
          collection: "wellenplan_show_episodes",
          icon: "calendar_month",
          layout: "calendar",
          layout_options: '{"calendar":{"viewInfo":{"type":"timeGridWeek"},"startDateField":"start","endDateField":"end","firstDay":1,"template":"{{show.show_name}}: {{episode_name}}"}}',
          layout_query: '{"tabular":{"fields":["status","show.show_name","episode_name","start","end"]}}',
        },
        {
          collection: "wellenplan_hourclocks",
          icon: "bookmark_outline",
          layout: "tabular",
          layout_options: '{"tabular":{"widths":{"status":32}}}',
          layout_query: '{"tabular":{"fields":["status","show_episode.show.show_name","show_episode.episode_name","name","slices"]}}',
        }
      ]);
    });
  },
  async down(knex) {
    await knex.transaction(async (transaction) => {
      await transaction('directus_presets').whereIn({collection: ["wellenplan_shows", "wellenplan_show_episodes", "wellenplan_hourclocks"]}).del();
      await transaction('directus_settings').where({ id: 1 }).del();

      await transaction('directus_relations').whereIn('many_collection', ['wellenplan_shows', 'wellenplan_show_episodes', 'wellenplan_hourclocks', 'wellenplan_hourclock_slices']).del();
      await transaction('directus_fields').whereIn('collection', ['wellenplan_hourclock_slices', 'wellenplan_hourclocks', 'wellenplan_show_episodes', 'wellenplan_shows']).del();
      await transaction('directus_collections').whereIn('collection', ['wellenplan_hourclock_slices', 'wellenplan_hourclocks', 'wellenplan_show_episodes', 'wellenplan_shows', 'wellenplan']).del();

      await transaction.schema.dropTable("wellenplan_hourclock_slices");
      await transaction.schema.dropTable("wellenplan_hourclocks");
      await transaction.schema.dropTable("wellenplan_show_episodes");
      await transaction.schema.dropTable("wellenplan_shows");
    });
  },
};
