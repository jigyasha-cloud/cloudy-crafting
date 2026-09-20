import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterSectionProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenCustomModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onSelectCategory,
  onOpenCustomModal,
}) => {
  return (
    <footer className="bg-white border-t border-[#DADEE1] text-[#142C37] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#DADEE1]">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="md:col-span-5 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B9D8E1]/40 flex items-center justify-center text-[#447F98] font-serif font-bold text-xs">
                CL
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif font-bold text-xl text-[#142C37] leading-none">
                  cloudy_crafting
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#5C7C8B] leading-relaxed max-w-sm">
              Luxury handcrafted gifts hamper
              <br />
              Akola, Maharashtra 444001
              <br />
              Studio Hours: Mon - Sat: 10am - 7pm IST
            </p>

            <div className="space-y-1.5 text-xs text-[#3A6070]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#447F98]" />
                <a href="mailto:hello@cloudy_crafting.com" className="hover:underline">
                  hello@cloudy_crafting.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#447F98]" />
                <a href="tel:+919289280613" className="hover:underline">
                  +91 9289280613
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-4 text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#447F98]">
              Explore Pages:
            </h4>
            <ul className="space-y-2 text-xs text-[#3A6070]">
              <li>
                <Link to="/" className="hover:text-[#447F98] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#447F98] transition-colors">
                  Shop Resin Collection
                </Link>
              </li>
              <li>
                <a href="#social-feed" className="hover:text-[#447F98] transition-colors flex items-center gap-1.5 text-[#447F98] font-semibold">
                  <span>Viral Instagram Reels</span>
                  <span className="text-[9px] bg-[#D6EBF3] text-[#447F98] px-1.5 py-0.5 rounded-full font-bold">300k+ Views</span>
                </a>
              </li>
              <li>
                <Link to="/custom-commissions" className="hover:text-[#447F98] transition-colors">
                  Custom Flower Preservation & Bespoke Orders
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#447F98] transition-colors">
                  About Our Studio & Artists
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#447F98] transition-colors">
                  Studio Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className="md:col-span-3 text-left space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#447F98]">
              Follow @cloudy_crafting:
            </h4>
            <div className="flex items-center space-x-3 text-[#142C37]">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#EAF4F8] hover:bg-[#447F98] hover:text-white transition-all flex items-center justify-center border border-[#B9D8E1]"
                title="Instagram @cloudy_crafting"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#EAF4F8] hover:bg-[#447F98] hover:text-white transition-all flex items-center justify-center border border-[#B9D8E1]"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#EAF4F8] hover:bg-[#447F98] hover:text-white transition-all flex items-center justify-center border border-[#B9D8E1]"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3 bg-[#EAF4F8] p-3 rounded-2xl border border-[#B9D8E1]">
              <p className="text-[11px] font-bold text-[#142C37] mb-1">
                Newsletter & New Collection Drops
              </p>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white text-[11px] px-2.5 py-1 rounded-full border border-[#B9D8E1] focus:outline-none focus:ring-1 focus:ring-[#447F98] text-[#142C37]"
                />
                <button className="bg-[#447F98] hover:bg-[#386D82] text-white text-[10px] font-bold px-3 py-1 rounded-full shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5C7C8B] space-y-2 sm:space-y-0">
          <p>© 2026 cloudy_crafting. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-[#447F98] fill-current inline" />
            <span>in Akola, Maharashtra</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
