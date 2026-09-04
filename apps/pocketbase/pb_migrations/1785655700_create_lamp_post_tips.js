migrate((app) => {
    const collection = new Collection({
        name: "lamp_post_tips",
        type: "base",
        fields: [
            { name: "name", type: "text", required: false },
            { name: "email", type: "email", required: false },
            { name: "tip", type: "text", required: true },
        ],
        createRule: "",
        listRule: '@request.auth.id != ""',
        viewRule: '@request.auth.id != ""',
        updateRule: null,
        deleteRule: null,
    });
    app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("lamp_post_tips");
    app.delete(collection);
});
