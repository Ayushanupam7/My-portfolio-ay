import { Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-left">
            <span>Made with</span>
            <Heart size={18} className="footer-heart" />
            <span>by {personalInfo.name}</span>
          </div>

          <div className="footer-right">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
