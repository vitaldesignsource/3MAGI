/// <reference path="../pb_data/types.d.ts" />

// Send a welcome confirmation email when a new user registers
onRecordAfterCreateSuccess((e) => {
    const email = e.record.get("email");
    const name = e.record.get("name") || "Seeker";

    // Also trigger email verification
    try {
        $app.newMailClient().send(new MailerMessage({
            from: { name: "The Third Lamp" },
            to: [{ address: email }],
            subject: "Welcome to The Third Lamp",
            html: `
                <div style="font-family: Georgia, serif; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
                    <p style="font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b38b46; margin: 0 0 24px;">The Third Lamp</p>
                    <h1 style="font-family: 'Georgia', serif; font-weight: 400; font-size: 2rem; line-height: 1.15; color: #0f1010; margin: 0 0 20px;">Welcome, ${name}.</h1>
                    <p style="font-size: 1rem; line-height: 1.8; color: #333; margin: 0 0 18px;">
                        Your membership account has been created. You now have access to the community notes and marginalia on every essay in the Living Archive.
                    </p>
                    <p style="font-size: 1rem; line-height: 1.8; color: #333; margin: 0 0 30px;">
                        To unlock full Supporter access — including the ability to leave annotations — visit the Plans page and choose your membership tier.
                    </p>
                    <a href="https://3magipress.com/plans" style="display: inline-block; padding: 14px 28px; background: #b38b46; color: #fff; text-decoration: none; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase;">
                        View Membership Plans
                    </a>
                    <p style="margin: 36px 0 0; font-size: 0.82rem; color: #888; line-height: 1.6;">
                        — The Third Lamp Editorial
                    </p>
                </div>
            `,
        }));
    } catch (err) {
        $app.logger().error("Welcome email failed", "to", email, "err", String(err));
    }

    // Notify editorial team of new signup
    try {
        $app.newMailClient().send(new MailerMessage({
            from: { name: "The Third Lamp" },
            to: [{ address: "3rdlamp@3magipress.com" }],
            subject: "New Member Signup: " + name,
            html: `
                <div style="font-family: Georgia, serif; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
                    <p style="font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b38b46; margin: 0 0 24px;">The Third Lamp — New Member Notification</p>
                    <h2 style="font-weight: 400; font-size: 1.5rem; margin: 0 0 20px;">A new account has been created.</h2>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; line-height: 1.7;">
                        <tr><td style="padding: 8px 0; color: #888; width: 120px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
                        <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
                        <tr><td style="padding: 8px 0; color: #888;">Joined</td><td style="padding: 8px 0;">${new Date().toUTCString()}</td></tr>
                    </table>
                </div>
            `,
        }));
    } catch (err) {
        $app.logger().error("New member notification email failed", "to", "3rdlamp@3magipress.com", "err", String(err));
    }

    e.next();
}, "users");
