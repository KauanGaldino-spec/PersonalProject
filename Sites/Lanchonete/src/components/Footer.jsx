import { AtSign, Camera, MessageCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Footer — brand mark + 4 link columns + newsletter + bottom bar.     */
/* ------------------------------------------------------------------ */
const COMPANY_LINKS = ["About Us", "Careers", "Blog", "Press", "Contact Us"];
const SUPPORT_LINKS = ["Help Center", "Track Order", "Returns", "Shipping Info", "FAQs"];
const LEGAL_LINKS = ["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Refund Policy"];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/logo.svg"
              alt="TasteHouse logo"
              className="w-9 h-9 rounded-full"
            />
            <span className="text-lg font-bold text-gray-900">TasteHouse</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your favorite food, delivered fast to your doorstep. Enjoy a
            seamless ordering experience.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {[AtSign, Camera, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
          <ul className="space-y-2">
            {COMPANY_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Support</h4>
          <ul className="space-y-2">
            {SUPPORT_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Legal</h4>
          <ul className="space-y-2">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-1">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Newsletter</h4>
          <p className="text-sm text-gray-500 mb-3">
            Subscribe to get latest updates and exclusive offers.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-full outline-none focus:border-orange-400"
            />
            <button
              type="button"
              className="shrink-0 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-xs text-gray-400">
          © 2024 TasteHouse, All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Terms
          </a>
          <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}