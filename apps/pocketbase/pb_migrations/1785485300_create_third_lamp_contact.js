/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    let collection;
    try {
      collection = app.findCollectionByNameOrId("third_lamp_contact");
    } catch (_) {
      collection = new Collection({
        type: "base",
        name: "third_lamp_contact",
        listRule: null,
        viewRule: null,
        createRule: "",
        updateRule: null,
        deleteRule: null,
        fields: [
          { name: "name", type: "text", required: true, max: 200 },
          { name: "email", type: "text", required: true, max: 200 },
          { name: "category", type: "text", required: true, max: 120 },
          { name: "subject", type: "text", max: 300 },
          { name: "message", type: "text", required: true, max: 5000 },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
        ],
      });
      app.save(collection);
    }
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId("third_lamp_contact");
      app.delete(collection);
    } catch (e) {
      if (String(e).includes("no rows in result set")) return;
      throw e;
    }
  },
);
