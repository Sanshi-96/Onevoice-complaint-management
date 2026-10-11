import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-softBg font-lato">
      <Navbar />

      <section className="pt-36 pb-20 px-4">
        <div className="w-[95%] mx-auto">
          
          <div className="text-center mb-14">
            <p className="inline-block text-primary text-sm font-black border border-dashed border-primary/40 rounded-full px-5 py-2 bg-red-50">
              Contact OneVoice
            </p>

            <h1 className="mt-5 text-4xl md:text-6xl font-black text-dark leading-tight">
              Let’s Connect
            </h1>

            <p className="mt-5 text-dark/60 leading-8 max-w-2xl mx-auto">
              Need support, have questions, or want to know more about
              OneVoice? Reach out to us anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            <div className="bg-white rounded-[34px] p-8 md:p-12 shadow-card">
              
              <h2 className="text-3xl font-black text-dark">
                Send us a message
              </h2>

              <p className="mt-3 text-dark/60 leading-7">
                Our team will respond as soon as possible.
              </p>

              <form className="mt-8 space-y-5">
                
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">
                    Message
                  </label>

                  <textarea
                    placeholder="Write your message..."
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[160px]"
                  ></textarea>
                </div>

                <Button className="w-full">
                  Send Message
                </Button>

              </form>
            </div>

            <div className="relative bg-gradient-to-br from-dark via-[#3a1111] to-primary rounded-[34px] overflow-hidden p-8 md:p-12 text-white">
              
              <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full"></div>

              <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-primary/40 rounded-full blur-2xl"></div>

             <div className="relative z-10">
                
  <h2 className="text-4xl md:text-5xl font-black leading-tight">
    We’re here
    <span className="block text-red-100">
      to help you.
    </span>
  </h2>

  <p className="mt-5 text-white/70 leading-8 max-w-md">
    OneVoice helps citizens connect with the right authorities
    and track issues transparently.
  </p>

  <div className="mt-12 space-y-8">
                  
    <div>
      <p className="text-white/50 text-sm font-bold">
        Email
      </p>

      <h3 className="mt-2 text-2xl font-black">
        support@onevoice.lk
      </h3>
    </div>

    <div>
      <p className="text-white/50 text-sm font-bold">
        Phone
      </p>

      <h3 className="mt-2 text-2xl font-black">
        +94 77 123 4567
      </h3>
    </div>

    <div>
      <p className="text-white/50 text-sm font-bold">
        Address
      </p>

      <h3 className="mt-2 text-2xl font-black">
        Colombo, Sri Lanka
      </h3>
    </div>

  </div>

  <div className="pt-10">
    <p className="text-white/50 text-sm font-bold mb-4">
      Follow Us
    </p>

    <div className="flex items-center gap-4">

      <a
        href="#"
        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1"
      >
        <FaFacebookF className="text-lg" />
      </a>

      <a
        href="#"
        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1"
      >
        <FaInstagram className="text-lg" />
      </a>

      <a
        href="#"
        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1"
      >
        <FaXTwitter className="text-lg" />
      </a>

      <a
        href="#"
        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1"
      >
        <FaLinkedinIn className="text-lg" />
      </a>

    </div>
  </div>

</div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;