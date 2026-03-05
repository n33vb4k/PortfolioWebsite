import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import SpotlightCard from '../components/ui/SpotlightCard';

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xjgenvyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socials = [
    {
      icon: <FiGithub size={28} />,
      label: 'GitHub',
      handle: '@n33vb4k',
      href: 'https://github.com/n33vb4k',
    },
    {
      icon: <FiLinkedin size={28} />,
      label: 'LinkedIn',
      handle: 'Neev Bakshi',
      href: 'https://linkedin.com/in/neev-bakshi',
    },
    {
      icon: <FiMail size={28} />,
      label: 'Email',
      handle: 'neev.bakshi@gmail.com',
      href: 'mailto:neev.bakshi@gmail.com',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-16 px-8 font-sans">
      <div className="max-w-2xl w-full flex flex-col gap-10">

        {/* Heading */}
        <div className="text-center">
          <h2 className="section-heading">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            Have a project in mind or just want to say hello? Fill out the form below or reach me on any of the platforms.
          </p>
        </div>

        {/* Contact form in SpotlightCard */}
        <SpotlightCard className="p-8" spotlightColor="rgba(99, 102, 241, 0.15)">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="contact-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="contact-input"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="contact-input resize-none"
              required
            />
            <div className="flex items-center justify-between gap-4">
              {status === 'success' && (
                <p className="text-sm text-green-600 dark:text-green-400">Message sent! I'll be in touch soon.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-500">Something went wrong — try again.</p>
              )}
              {status !== 'success' && status !== 'error' && <span />}
              <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'sending' ? 'Sending…' : 'Send Message'} <FiSend size={16} />
              </button>
            </div>
          </form>
        </SpotlightCard>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 dark:text-gray-600 text-sm">
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
          <span>or find me on</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
        </div>

        {/* Social cards in SpotlightCard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <SpotlightCard
                className="flex flex-col items-center gap-3 p-6 cursor-pointer hover:scale-105 transition-transform duration-200"
                spotlightColor="rgba(99, 102, 241, 0.2)"
              >
                <span className="text-indigo-500">{s.icon}</span>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{s.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.handle}</p>
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Contact;
