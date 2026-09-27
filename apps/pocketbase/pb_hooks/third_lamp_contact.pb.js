/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((e) => {
  const r = e.record;
  const esc = (v) => String(v || "").replace(/</g, "&lt;");

  const message = new MailerMessage({
    from: { name: "The Third Lamp" },
    to: [{ address: "3rdlamp@3magipress.com" }],
    subject: `Contact — ${r.get("category")}: ${r.get("subject") || "(no subject)"}`,
    html: `
      <h2>New contact enquiry</h2>
      <p><strong>Name:</strong> ${esc(r.get("name"))}</p>
      <p><strong>Email:</strong> ${esc(r.get("email"))}</p>
      <p><strong>Category:</strong> ${esc(r.get("category"))}</p>
      <p><strong>Subject:</strong> ${esc(r.get("subject"))}</p>
      <p><strong>Message:</strong></p>
      <p>${esc(r.get("message")).replace(/\n/g, "<br/>")}</p>
    `,
  });

  try {
    $app.newMailClient().send(message);
  } catch (err) {
    $app.logger().error("contact email failed", "err", String(err));
  }

  e.next();
}, "third_lamp_contact");
