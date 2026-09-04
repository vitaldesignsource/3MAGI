import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import { submitForm } from '@/lib/formSubmit';
import GateKeyPuzzle from '@/components/GateKeyPuzzle.jsx';

const CATEGORIES = [
    'General Enquiry',
    'Editorial & Submissions',
    'Membership & Billing',
    'The Lamp Post Tip',
    'Permissions & Rights',
    'Press & Partnerships',
    'Technical Problem',
];

function ThirdLampContactPage() {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const [gateOpen, setGateOpen] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const [form, setForm] = useState({ name: '', email: '', category: CATEGORIES[0], subject: '', message: '' });


    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (honeypot) return;
        if (!gateOpen) {
            setError('Please open the gate below before sending.');
            return;
        }
        setStatus('sending');
        try {
            await submitForm('contact', { ...form, company_website: honeypot });
            setStatus('sent');
            setForm({ name: '', email: '', category: CATEGORIES[0], subject: '', message: '' });
            // Re-lock the gate so a second message must open it again.
            setGateOpen(false);
        } catch (err) {
            setStatus('idle');
            setError(err.message);
        }
    };

    return (
        <div className="third-lamp-scope tl-contact-page">
            <Helmet>
                <title>Contact — The Third Lamp</title>
                <meta name="description" content="Write to the editors of The Third Lamp: editorial enquiries, membership questions, permissions, tips for The Lamp Post, and press." />
            </Helmet>
            <ThirdLampHeader />

            <main className="tl-plans-page" style={{ maxWidth: '900px' }}>
                <div className="tl-plans-head">
                    <p className="kicker">Correspondence</p>
                    <h1>Write to the Lamp</h1>
                    <p className="tl-plans-lede">
                        Letters reach the editors directly at 3rdlamp@3magipress.com. Choose the nature of your
                        enquiry so it is placed on the correct desk.
                    </p>
                </div>

                {status === 'sent' ? (
                    <div className="tl-plan-card" role="status">
                        <h3 style={{ fontFamily: 'Cinzel, serif', fontWeight: 400, margin: 0 }}>Your letter has been sent</h3>
                        <p className="tl-plan-desc" style={{ marginTop: '0.8rem' }}>
                            Thank you. The editors read every message and will reply to the address you gave.
                        </p>
                        <button type="button" className="tl-button" onClick={() => setStatus('idle')}>Send another</button>
                    </div>
                ) : (
                    <form className="contributor-form" onSubmit={onSubmit}>
                        <fieldset>
                            <legend><span>I</span>Your details</legend>
                            <div className="form-grid">
                                <label>
                                    <span>Name</span>
                                    <input required value={form.name} onChange={set('name')} />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input type="email" required value={form.email} onChange={set('email')} />
                                </label>
                                <label>
                                    <span>Nature of enquiry</span>
                                    <select value={form.category} onChange={set('category')}>
                                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </label>
                                <label>
                                    <span>Subject</span>
                                    <input value={form.subject} onChange={set('subject')} />
                                </label>
                                <label className="form-wide">
                                    <span>Message</span>
                                    <textarea required rows={8} value={form.message} onChange={set('message')} />
                                </label>
                                <div className="form-wide">
                                    <GateKeyPuzzle verified={gateOpen} onVerified={setGateOpen} idPrefix="contact" />
                                </div>
                                <label style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                                    <span>Leave blank</span>
                                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                </label>
                            </div>
                        </fieldset>

                        <div className="form-submit-row">
                            <p>
                                {error
                                    ? error
                                    : 'Messages are recorded and forwarded to the editorial desk. Please allow several days for a reply.'}
                            </p>
                            <button className="tl-button" type="submit" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending…' : 'Send letter'}
                            </button>
                        </div>
                    </form>
                )}
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default ThirdLampContactPage;
