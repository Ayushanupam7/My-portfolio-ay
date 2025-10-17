import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthenticationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthenticationModal({ onClose, onSuccess }: AuthenticationModalProps) {
  const [pin, setPin] = useState('');
  const correctPin = '1234'; // You can change this

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      onSuccess();
    } else {
      alert('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 sm:p-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 sm:p-8 relative transform transition-all scale-100 sm:scale-105">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          aria-label="Close authentication modal"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Enter 4-Digit PIN
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            placeholder="••••"
            className="text-center text-3xl sm:text-2xl tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg py-3 sm:py-2 w-40 sm:w-32 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-gray-900 dark:text-white"
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 sm:px-6 sm:py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            Unlock
          </button>
        </form>

        {/* Hint (optional for UX) */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Enter your secure 4-digit PIN to access the Personal Zone
        </p>
      </div>
    </div>
  );
}
