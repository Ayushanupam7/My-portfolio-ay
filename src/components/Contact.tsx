import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentMessage, setCurrentMessage] = useState<'none' | 'first' | 'second'>('none');
  const [mobileError, setMobileError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate mobile if entered
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      setMobileError('Mobile number must be 10 digits');
      return;
    } else {
      setMobileError('');
    }

    emailjs
      .send(
        'service_ea7lxu7',
        'template_kovy7xh',
        {
          from_name: formData.name,
          from_email: formData.email,
          mobile: formData.mobile,
          subject: formData.subject,
          message: formData.message
        },
        'NSWm9VjZ0ijsdTVfm'
      )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });

        // Show first message
        setCurrentMessage('first');

        // Hide first message after 1.5s, show second message
        setTimeout(() => setCurrentMessage('second'), 1500);

        // Hide second message after 15s
        setTimeout(() => {
          setStatus('idle');
          setCurrentMessage('none');
        }, 16500);
      })
      .catch(() => setStatus('error'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ---- Get In Touch Section ---- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] mx-auto rounded-full animate-pulse"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I’d love to hear from you! Whether it’s a project, collaboration, or just to say hi 👋, drop me a message below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* ---- Contact Info ---- */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all group">
                <div className="p-3 bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Email</p>
                  <p className="text-gray-900 dark:text-white font-medium">{personalInfo.email}</p>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all group">
                <div className="p-3 bg-gradient-to-br from-[#3B82F6] to-[#00C9A7] rounded-lg group-hover:scale-110 transition-transform">
                  <Linkedin className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">LinkedIn</p>
                  <p className="text-gray-900 dark:text-white font-medium">Connect with me</p>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all group">
                <div className="p-3 bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] rounded-lg group-hover:scale-110 transition-transform">
                  <Github className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">GitHub</p>
                  <p className="text-gray-900 dark:text-white font-medium">View my code</p>
                </div>
              </a>
            </div>
          </div>

          {/* ---- Contact Form ---- */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoCapitalize="words"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (value)
                      handleChange({ target: { name: "name", value: value.charAt(0).toUpperCase() + value.slice(1) } });
                  }}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent outline-none transition-all"
                  placeholder="Newton Yadav"
                />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent outline-none transition-all"
                  placeholder="newtonyadav@example.com"
                />
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  autoCapitalize='sentences'
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent outline-none transition-all"
                  placeholder="9876543210"
                />
                {mobileError && <p className="text-red-500 text-sm mt-1">{mobileError}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent outline-none transition-all"
                  placeholder="Project Inquiry, Collaboration, etc."
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>

              {/* Inline Status Messages */}
              {status === 'success' && (
                <div className="text-center text-[#00C9A7] font-medium animate-pulse mt-2">
                  {currentMessage === 'first' && <p>🎉 Message sent successfully!</p>}
                  {currentMessage === 'second' && <p className="text-sm">⏰ I’ll get back to you within a few hours.</p>}
                </div>
              )}

              {status === 'error' && (
                <p className="text-center text-red-500 font-medium mt-2">❌ Something went wrong. Try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
