import Logo from "./Logo";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-dark text-white pt-16 pb-8 mt-20 overflow-hidden">
      <div className="w-[91%] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          <div>
            <div className="scale-150 origin-left">
              <Logo />
            </div>

            <p className="mt-8 text-white/60 leading-7 text-sm max-w-sm">
              OneVoice is a smart complaint management system designed to
              connect citizens, authorities, and emergency support through one
              digital platform.
            </p>

            <div className="flex gap-3 mt-7">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1"
              >
                <FaFacebookF className="text-lg" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1"
              >
                <FaInstagram className="text-lg" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1"
              >
                <FaXTwitter className="text-lg" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn className="text-lg" />
              </a>

            </div>
          </div>

          <div>
            <h3 className="text-xl font-black mb-5">Quick Links</h3>

            <div className="space-y-4 text-white/60">
              <a href="#home" className="block hover:text-primary transition">
                Home
              </a>

              <a href="#progress" className="block hover:text-primary transition">
                Progress
              </a>

              <a href="#how-it-works" className="block hover:text-primary transition">
                How It Works
              </a>

              <a href="#sos" className="block hover:text-primary transition">
                SOS Support
              </a>

              <a href="#faq" className="block hover:text-primary transition">
                FAQ
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black mb-5">Features</h3>

            <div className="space-y-4 text-white/60">
              <p>Complaint Tracking</p>
              <p>Authority Dashboard</p>
              <p>SOS Emergency Alert</p>
              <p>Real-Time Updates</p>
              <p>Admin Management</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black mb-5">Contact</h3>

            <div className="space-y-4 text-white/60">
              <p>Colombo, Sri Lanka</p>
              <p>support@onevoice.lk</p>
              <p>+94 77 123 4567</p>
              <p>24/7 Support Available</p>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-white/40 text-sm">
          <p>
            © 2026 OneVoice. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="hover:text-primary transition cursor-pointer">
              Privacy Policy
            </p>

            <p className="hover:text-primary transition cursor-pointer">
              Terms & Conditions
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;