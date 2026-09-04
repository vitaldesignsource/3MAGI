/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    let collection;
    try {
      collection = app.findCollectionByNameOrId("community_notes");
    } catch (_) {
      const users = app.findCollectionByNameOrId("users");
      collection = new Collection({
        type: "base",
        name: "community_notes",
        // Public read so any visitor can see the community discussion;
        // writes are restricted to the authenticated author only.
        listRule: "",
        viewRule: "",
        createRule: "@request.auth.id != '' && @request.auth.id = @request.body.owner",
        updateRule: "@request.auth.id != '' && @request.auth.id = owner",
        deleteRule: "@request.auth.id != '' && @request.auth.id = owner",
        fields: [
          { name: "article_slug", type: "text", required: true, max: 200 },
          { name: "content", type: "text", required: true, max: 2000 },
          { name: "author_name", type: "text", max: 120 },
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
        indexes: [
          "CREATE INDEX idx_community_notes_article_slug ON community_notes (article_slug)",
        ],
      });
      app.save(collection);
    }
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId("community_notes");
      app.delete(collection);
    } catch (e) {
      if (e.message.includes("no rows in result set")) return;
      throw e;
    }
  },
);
