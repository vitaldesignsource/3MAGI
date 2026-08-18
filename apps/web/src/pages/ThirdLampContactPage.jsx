import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import { submitForm } from '@/lib/formSubmit';

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
    const [challenge, setChallenge] = useState(() => ({
        a: 2 + Math.floor(Math.random() * 7),
        b: 1 + Math.floor(Math.random() * 6),
    }));
    const [answer, setAnswer] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [form, setForm] = useState({ name: '', email: '', category: CATEGORIES[0], subject: '', message: '' });

    const expected = useMemo(() => challenge.a + challenge.b, [challenge]);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (honeypot) return;
        if (Number(answer) !== expected) {
            setError('Human verification failed. Please solve the sum again.');
            setChallenge({ a: 2 + Math.floor(Math.random() * 7), b: 1 + Math.floor(Math.random() * 6) });
            setAnswer('');
            return;
        }
        setStatus('sending');
        try {
            await submitForm('contact', { ...form, company_website: honeypot });
            setStatus('sent');
            setForm({ name: '', email: '', category: CATEGORIES[0], subject: '', message: '' });
            setAnswer('');
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
                                <label className="form-wide">
                                    <span>Human verification <small>What is {challenge.a} + {challenge.b}?</small></span>
                                    <input
                                        required
                                        inputMode="numeric"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    />
                                </label>
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
