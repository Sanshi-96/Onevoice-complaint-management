import { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav
        className={`
          text-white flex items-center justify-between 
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            scrolled
  ? "mt-4 w-[88%] max-w-5xl rounded-full px-5 py-1 bg-primary/70 backdrop-blur-xl border border-white/20 shadow-2xl"
  : "mt-0 w-full max-w-full rounded-none px-6 py-2 bg-primary border border-transparent shadow-md"
          }
        `}
      >
        <div className="scale-150 origin-left">
              <Logo />
            </div>

        <div className="hidden md:flex items-center gap-7">
          <a href="/home#home" className="text-white text-sm font-bold hover:text-red-100">
            Home
          </a>
          <a href="/home#progress" className="text-white text-sm font-bold hover:text-red-100">
            Progress
          
          </a>
          <a href="/home#how-it-works" className="text-white text-sm font-bold hover:text-red-100">
            How it works
          </a>
          <a href="/home#sos" className="text-white text-sm font-bold hover:text-red-100">
            SOS
          </a>
          <a href="/home#faq" className="text-white text-sm font-bold hover:text-red-100">
            FAQ
          </a>
          <a href="/contact" className="text-white text-sm font-bold hover:text-red-100">
            Contact Us
          </a>
        </div>

        <Button to="/login"
          variant="secondary"
          className="hidden sm:block !px-4 !py-2 !rounded-full text-sm"
        >
          Register a Complaint
        </Button>
        
      </nav>
    </header>
  );
};

export default Navbar;