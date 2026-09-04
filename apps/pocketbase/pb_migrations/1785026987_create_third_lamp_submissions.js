/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const collection = new Collection({
      type: "base",
      name: "third_lamp_submissions",
      listRule: null,
      viewRule: null,
      createRule: "",
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: "path", type: "text", required: false, max: 40 },
        { name: "name", type: "text", required: true, max: 200 },
        { name: "pen_name", type: "text", required: false, max: 200 },
        { name: "email", type: "text", required: true, max: 200 },
        { name: "region", type: "text", required: false, max: 200 },
        { name: "website_1", type: "text", required: false, max: 400 },
        { name: "website_2", type: "text", required: false, max: 400 },
        { name: "website_3", type: "text", required: false, max: 400 },
        { name: "social_links", type: "text", required: false, max: 400 },
        { name: "biography", type: "text", required: false, max: 5000 },
        { name: "areas_of_study", type: "text", required: false, max: 5000 },
        { name: "proposed_title", type: "text", required: true, max: 400 },
        { name: "submission_type", type: "text", required: false, max: 200 },
        { name: "related_issue", type: "text", required: false, max: 200 },
        { name: "pitch_summary", type: "text", required: false, max: 5000 },
        { name: "issue_fit", type: "text", required: false, max: 5000 },
        { name: "estimated_word_count", type: "text", required: false, max: 50 },
        { name: "relevant_experience", type: "text", required: false, max: 2000 },
        { name: "expected_sources", type: "text", required: false, max: 5000 },
        { name: "previous_work_links", type: "text", required: false, max: 2000 },
        { name: "completed_abstract", type: "text", required: false, max: 5000 },
        { name: "final_word_count", type: "text", required: false, max: 50 },
        {
          name: "document_upload",
          type: "file",
          required: false,
          maxSelect: 1,
          maxSize: 20971520,
        },
        {
          name: "image_attachments",
          type: "file",
          required: false,
          maxSelect: 10,
          maxSize: 20971520,
        },
        { name: "source_list", type: "text", required: false, max: 5000 },
        { name: "prior_publication", type: "text", required: false, max: 100 },
        { name: "simultaneous_submission", type: "text", required: false, max: 100 },
        { name: "generative_ai_used", type: "text", required: false, max: 100 },
        { name: "ai_use_details", type: "text", required: false, max: 400 },
        { name: "editorial_concerns", type: "text", required: false, max: 3000 },
        { name: "attribution_confirmed", type: "text", required: false, max: 20 },
        { name: "image_rights_confirmed", type: "text", required: false, max: 20 },
        { name: "created", type: "autodate", onCreate: true, onUpdate: false },
      ],
      indexes: [],
    });
    app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("third_lamp_submissions");
    app.delete(collection);
  },
);
