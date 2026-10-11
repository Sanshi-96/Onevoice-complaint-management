import Button from "../../../components/Button";
import ctaImage from "../../../assets/images/onevoice-cta.png";

const CTASection = () => {
  return (
    <section id="cta" className="w-full bg-softBg py-20">
      <div className="w-[91%] mx-auto">
        <div className="relative min-h-[320px] rounded-[34px] overflow-hidden bg-gradient-to-r from-dark via-[#3a1111] to-primary shadow-2xl">

          {/* Decorative Elements */}
          <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-white/10"></div>

          <div className="absolute bottom-[-90px] left-[-90px] w-72 h-72 rounded-full bg-primary/40 blur-2xl"></div>

          <div className="absolute top-10 left-[45%] w-4 h-4 bg-white/50 rounded-full"></div>

          <div className="absolute bottom-8 right-16 w-28 h-28 border border-white/10 rounded-full"></div>

          <div className="absolute top-16 right-[28%] w-3 h-3 bg-red-200 rounded-full"></div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] items-center gap-8 p-8 md:p-12 relative z-10">

            {/* Left Illustration */}
            <div className="hidden md:flex justify-center">
              <img
                src={ctaImage}
                alt="OneVoice SOS System"
                className="
                  w-[320px]
                  h-[320px]
                  object-contain
                  drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]
                  hover:scale-105
                  transition-all
                  duration-500
                "
              />
            </div>

            {/* Right Content */}
            <div className="text-center md:text-right">

              <p className="inline-block text-white text-sm font-black border border-dashed border-white/30 rounded-full px-5 py-2 bg-white/10 backdrop-blur-sm">
                OneVoice Smart Complaint System
              </p>

              <h3 className="mt-6 text-3xl md:text-5xl font-black text-white leading-tight">
                Submit your complaint
                <span className="block text-red-100">
                  and track action faster.
                </span>
              </h3>

              <p className="mt-4 text-white/75 leading-7 max-w-xl md:ml-auto">
                OneVoice gives citizens a simple way to report issues,
                receive updates, and stay connected with responsible
                authorities. From public complaints to emergency SOS
                requests, everything is managed through one secure platform.
              </p>
  
              <div className="mt-7 flex justify-center md:justify-end">
                
                <Button to="/login"
          variant="secondary"
          className="
                    !rounded-full
                    !px-7
                    !py-3
                    !bg-white
                    !text-primary
                    hover:!bg-red-50
                  "
        >
          Register a Complaint
        </Button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;