import { Heart } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';

interface LikeButtonProps {
  onToggleNotifications?: (enabled: boolean) => void;
  notificationsEnabled?: boolean;
}

export default function LikeButton({
  onToggleNotifications,
  notificationsEnabled = true,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [likes, setLikes] = useState<number>(1400);
  const [displayLikes, setDisplayLikes] = useState<number>(1400);

  const likesRef = useRef(likes);
  likesRef.current = likes;

  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  // Load liked status
  useEffect(() => {
    const likedStatus = localStorage.getItem('portfolioLiked');
    if (likedStatus === 'true') setIsLiked(true);

    const storedLikes = localStorage.getItem('portfolioLikes');
    if (storedLikes) {
      setLikes(parseInt(storedLikes));
      setDisplayLikes(parseInt(storedLikes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolioLiked', isLiked.toString());
    localStorage.setItem('portfolioLikes', likes.toString());
  }, [isLiked, likes]);

  // Auto increment likes when liked
  useEffect(() => {
    if (!isLiked) return;
    const interval = setInterval(() => {
      const newLikes = likesRef.current + 1;
      animateIncrement(likesRef.current, newLikes);
      setLikes(newLikes);
    }, 10000);
    return () => clearInterval(interval);
  }, [isLiked]);

  const animateIncrement = (start: number, end: number) => {
    let current = start;
    const stepTime = 100;
    const interval = setInterval(() => {
      if (current < end) {
        current += 1;
        setDisplayLikes(current);
      } else {
        clearInterval(interval);
      }
    }, stepTime);
  };

  // 💖 Short click for like
  const handleLike = () => {
    if (!isLiked) setShowForm(true);
    else {
      setIsLiked(false);
      const newLikes = likes > 0 ? likes - 1 : 0;
      setLikes(newLikes);
      setDisplayLikes(newLikes);
      localStorage.removeItem('portfolioLiked');
      localStorage.removeItem('portfolioLikeData');
    }
  };

  // 🕒 Long press logic (2s)
  const startHold = () => {
    holdTimer.current = setTimeout(() => {
      onToggleNotifications?.(!notificationsEnabled);
    }, 2000);
  };

  const endHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  const sendLikeEmail = async () => {
    setSubmitted(true);
    const templateParams = {
      user_name: name || 'Anonymous',
      user_email: email || 'Not provided',
      user_comment: comment || 'No comments provided.',
      message: 'liked your portfolio!',
    };

    try {
      await emailjs.send(
        'service_3sw5l5p',
        'template_b8e79rl',
        templateParams,
        'Ckz7LWvdJcPwE0drE'
      );

      setMessage('Thanks for liking!');
      setIsLiked(true);
      const newLikes = likes + 1;
      animateIncrement(likes, newLikes);
      setLikes(newLikes);

      const likeData = { name, email, comment };
      localStorage.setItem('portfolioLiked', 'true');
      localStorage.setItem('portfolioLikeData', JSON.stringify(likeData));

      if (email) {
        try {
          await emailjs.send(
            'service_3sw5l5p',
            'template_t0qa32l',
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

      setTimeout(() => {
        setShowForm(false);
        setName('');
        setEmail('');
        setComment('');
        setMessage('');
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Email error:', error);
      setMessage('Failed to send. Please try again.');
      setSubmitted(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setName('');
    setEmail('');
    setComment('');
    setSubmitted(false);
  };

  const formatLikes = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num.toString();
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {isLiked && !showForm && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          {displayLikes} Likes
        </p>
      )}

      {/* ❤️ Like Button (with 2s hold toggle) */}
      <button
        onClick={handleLike}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        className={`p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ${
          isLiked
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
        }`}
        aria-label="Like"
      >
        <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
      </button>

      {showForm && (
        <div className="flex flex-col items-center space-y-2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg mt-2 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            {displayLikes} Likes
          </p>

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
            rows={3}
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={sendLikeEmail}
              disabled={submitted}
              className={`px-3 py-1 rounded-md ${
                submitted
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {submitted ? 'Submitted' : 'Submit'}
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

      {message && <p className="text-sm text-green-500">{message}</p>}
    </div>
  );
}
