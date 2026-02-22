import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual-only form — no backend
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-gray-900 py-16 px-8 font-sans">
      <div className="max-w-2xl w-full flex flex-col gap-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="section-heading">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            Have a project in mind or just want to say hello? Fill out the form below or reach me on any of the platforms.
          </p>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
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
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Send Message <FiSend size={16} />
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 dark:text-gray-600 text-sm">
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
          <span>or find me on</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
        </div>

        {/* Social cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-card"
            >
              <span className="text-indigo-500">{s.icon}</span>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{s.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
