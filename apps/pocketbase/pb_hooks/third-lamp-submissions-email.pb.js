/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((e) => {
  const r = e.record;
  const get = (name) => {
    const v = r.get(name);
    return v === undefined || v === null || v === "" ? "-" : String(v);
  };

  const docFiles = r.get("document_upload");
  const imgFiles = r.get("image_attachments");
  const docList = Array.isArray(docFiles) ? docFiles.join(", ") : (docFiles || "-");
  const imgList = Array.isArray(imgFiles) ? imgFiles.join(", ") : (imgFiles || "-");

  const html = `
    <h2>New Third Lamp Submission</h2>
    <p><strong>Path:</strong> ${get("path")}</p>
    <h3>About the Contributor</h3>
    <p><strong>Name:</strong> ${get("name")}<br/>
    <strong>Pen name:</strong> ${get("pen_name")}<br/>
    <strong>Email:</strong> ${get("email")}<br/>
    <strong>Region:</strong> ${get("region")}<br/>
    <strong>Websites:</strong> ${get("website_1")}, ${get("website_2")}, ${get("website_3")}<br/>
    <strong>Social links:</strong> ${get("social_links")}</p>
    <p><strong>Biography:</strong><br/>${get("biography")}</p>
    <p><strong>Areas of study:</strong><br/>${get("areas_of_study")}</p>

    <h3>Submission</h3>
    <p><strong>Proposed title:</strong> ${get("proposed_title")}<br/>
    <strong>Submission type:</strong> ${get("submission_type")}<br/>
    <strong>Related issue:</strong> ${get("related_issue")}</p>

    <p><strong>Pitch summary:</strong><br/>${get("pitch_summary")}</p>
    <p><strong>Issue fit:</strong><br/>${get("issue_fit")}</p>
    <p><strong>Estimated word count:</strong> ${get("estimated_word_count")}<br/>
    <strong>Relevant experience:</strong> ${get("relevant_experience")}</p>
    <p><strong>Expected sources:</strong><br/>${get("expected_sources")}</p>
    <p><strong>Previous work links:</strong><br/>${get("previous_work_links")}</p>

    <p><strong>Completed abstract:</strong><br/>${get("completed_abstract")}</p>
    <p><strong>Final word count:</strong> ${get("final_word_count")}</p>
    <p><strong>Document upload:</strong> ${docList}</p>
    <p><strong>Image attachments:</strong> ${imgList}</p>
    <p><strong>Source list:</strong><br/>${get("source_list")}</p>

    <h3>Editorial Information</h3>
    <p><strong>Prior publication:</strong> ${get("prior_publication")}<br/>
    <strong>Simultaneous submission:</strong> ${get("simultaneous_submission")}<br/>
    <strong>Generative AI used:</strong> ${get("generative_ai_used")}<br/>
    <strong>AI use details:</strong> ${get("ai_use_details")}</p>
    <p><strong>Editorial concerns:</strong><br/>${get("editorial_concerns")}</p>
    <p><strong>Attribution confirmed:</strong> ${get("attribution_confirmed")}<br/>
    <strong>Image rights confirmed:</strong> ${get("image_rights_confirmed")}</p>
  `;

  const message = new MailerMessage({
    from: { name: "The Third Lamp" },
    to: [{ address: "3rdlamp@3magipress.com" }],
    replyTo: [{ address: get("email") === "-" ? "3rdlamp@3magipress.com" : get("email") }],
    subject: `New Third Lamp Submission: ${get("proposed_title")}`,
    html,
  });

  try {
    $app.newMailClient().send(message);
  } catch (err) {
    $app.logger().error("third lamp submission email failed", "err", String(err));
  }

  e.next();
}, "third_lamp_submissions");
