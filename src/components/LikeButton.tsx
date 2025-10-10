import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  // Load like status from localStorage
  useEffect(() => {
    const likedStatus = localStorage.getItem('portfolioLiked');
    if (likedStatus === 'true') setIsLiked(true);
  }, []);

  // Save like status to localStorage
  useEffect(() => {
    localStorage.setItem('portfolioLiked', isLiked.toString());
  }, [isLiked]);

  const handleLike = () => {
    if (!isLiked) setShowForm(true);
    else {
      setIsLiked(false);
      localStorage.removeItem('portfolioLiked');
      localStorage.removeItem('portfolioLikeData');
    }
  };

  const sendLikeEmail = () => {
    const templateParams = {
      user_name: name || 'Anonymous',
      user_email: email || 'Not provided',
      user_comment: comment || 'No comments provided.',
      message: 'liked your portfolio!',
    };

    // Send email to portfolio owner
    emailjs
      .send(
        'service_3sw5l5p', // Your EmailJS Service ID
        'template_b8e79rl', // Template for owner
        templateParams,
        'Ckz7LWvdJcPwE0drE' // Public Key
      )
      .then(async () => {
        setMessage('Thanks for liking!');
        setIsLiked(true);
        setShowForm(false);

        // Save like data to localStorage
        const likeData = { name, email, comment };
        localStorage.setItem('portfolioLiked', 'true');
        localStorage.setItem('portfolioLikeData', JSON.stringify(likeData));

        // Send thank-you email to user if email is provided
        if (email) {
          try {
            await emailjs.send(
              'service_3sw5l5p',
              'template_t0qa32l', // Thank-you template ID
              {
                user_name: name || 'Friend',
                user_email: email,
                user_comment: comment || 'No comment provided.',
              },
              'Ckz7LWvdJcPwE0drE'
            );
          } catch (error) {
            console.error('Thank-you email failed:', error);
          }
        }

        // Reset form
        setName('');
        setEmail('');
        setComment('');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((error) => {
        console.error('Email error:', error);
        setMessage('Failed to send. Please try again.');
      });
  };

  const handleCancel = () => {
    setShowForm(false);
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ${
          isLiked
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
        }`}
        aria-label="Like"
      >
        <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
      </button>

      {/* Dialog Box */}
      {showForm && (
        <div className="flex flex-col items-center space-y-2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg mt-2 border border-gray-200 dark:border-gray-700">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-64 p-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-64 p-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white"
          />
          <textarea
            placeholder="Your comments (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-64 p-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white"
            rows="3"
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={sendLikeEmail}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {message && <p className="text-sm text-green-500">{message}</p>}
    </div>
  );
}
