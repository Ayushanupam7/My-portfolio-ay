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
  const [submitted, setSubmitted] = useState(false); // For button state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate mobile if entered
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      setMobileError('Mobile number must be 10 digits');
      return;
    } else {
      setMobileError('');
    }

    setSubmitted(true); // Change button to submitted state

    // Send email to yourself
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

        setCurrentMessage('first');
        setTimeout(() => setCurrentMessage('second'), 1500);
        setTimeout(() => {
          setStatus('idle');
          setCurrentMessage('none');
          setSubmitted(false); // Reset button after a while
        }, 16500);

        // Auto-reply to the user
        if (formData.email) {
          emailjs.send(
            'service_ea7lxu7',
            'template_8s99j3f',
            {
              user_name: formData.name,
              user_email: formData.email,
              user_subject: formData.subject || 'Contact Form',
              user_message: formData.message
            },
            'NSWm9VjZ0ijsdTVfm'
          );
        }
      })
      .catch(() => {
        setStatus('error');
        setSubmitted(false); // Reset button if error
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="overflow-x-hidden mt-16 sm:mt-20 py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] mx-auto rounded-full animate-pulse"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
            I’d love to hear from you! Whether it’s a project, collaboration, or just to say hi 👋, drop me a message below.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all group">
                <div className="p-3 bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="text-white" size={22} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Email</p>
                  <p className="text-gray-900 dark:text-white text-sm sm:text-base font-medium break-all">{personalInfo.email}</p>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all group">
                <div className="p-3 bg-gradient-to-br from-[#3B82F6] to-[#00C9A7] rounded-lg group-hover:scale-110 transition-transform">
                  <Linkedin className="text-white" size={22} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">LinkedIn</p>
                  <p className="text-gray-900 dark:text-white text-sm sm:text-base font-medium">Connect with me</p>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all group">
                <div className="p-3 bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] rounded-lg group-hover:scale-110 transition-transform">
                  <Github className="text-white" size={22} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">GitHub</p>
                  <p className="text-gray-900 dark:text-white text-sm sm:text-base font-medium">View my code</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] outline-none transition-all text-sm sm:text-base" placeholder="Your Name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] outline-none transition-all text-sm sm:text-base" placeholder="yourname@example.com" />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mobile Number</label>
                <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] outline-none transition-all text-sm sm:text-base" placeholder="9876543210" />
                {mobileError && <p className="text-red-500 text-xs sm:text-sm mt-1">{mobileError}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] outline-none transition-all text-sm sm:text-base" placeholder="Project Inquiry, Collaboration, etc." />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message <span className="text-red-500">*</span></label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-3 sm:px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00C9A7] outline-none transition-all resize-none text-sm sm:text-base" placeholder="Tell me about your project..." />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted}
                className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-300 ${
                  submitted
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] text-white hover:shadow-lg hover:scale-[1.02]'
                }`}
              >
                {submitted ? 'Message Sent' : <><Send size={18} /> Send Message</>}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="text-center text-[#00C9A7] font-medium animate-pulse mt-2">
                  {currentMessage === 'first' && <p>🎉 Message sent successfully!</p>}
                  {currentMessage === 'second' && <p className="text-sm">⏰ I’ll get back to you within a few hours.</p>}
                </div>
              )}
              {status === 'error' && (
                <p className="text-center text-red-500 font-medium mt-2">
                  ❌ Something went wrong. Try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
