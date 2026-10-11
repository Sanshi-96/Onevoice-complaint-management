import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Kavin Raj",
    role: "Citizen",
    image: "/src/assets/images/testimonial-1.jpg",
    message:
      "OneVoice made it easy to submit my complaint and track the status without visiting any office.",
  },
  {
    name: "Nithyan",
    role: "Citizen",
    image: "/src/assets/images/testimonial-2.jpg",
    message:
      "The complaint process feels simple, clear, and faster. I could see each update from the authority.",
  },
  {
    name: "Josh",
    role: "Authority Officer",
    image: "/src/assets/images/testimonial-3.jpg",
    message:
      "This system helps us organize complaints by category, location, and status in one dashboard.",
  },
  {
    name: "Arvind",
    role: "System Admin",
    image: "/src/assets/images/testimonial-4.jpg",
    message:
      "Managing users, complaints, and authority progress is easier with the admin dashboard.",
  },
  {
    name: "Kumar",
    role: "SOS User",
    image: "/src/assets/images/testimonial-5.jpg",
    message:
      "The SOS option is very useful because emergency alerts can be sent quickly with location details.",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollArea = rect.height - windowHeight;
      const scrolledInside = Math.min(Math.max(-rect.top, 0), totalScrollArea);
      const progress = totalScrollArea > 0 ? scrolledInside / totalScrollArea : 0;

      const index = Math.min(
        testimonials.length - 1,
        Math.floor(progress * testimonials.length)
      );

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = testimonials[activeIndex];

  const visiblePeople = [
    testimonials[activeIndex - 1],
    testimonials[activeIndex],
    testimonials[activeIndex + 1],
  ].filter(Boolean);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-softBg"
      style={{ height: `${testimonials.length * 100}vh` }}
    >
      <div className="sticky top-[80px] min-h-[calc(100vh-80px)] flex items-center">
        <div className="w-[95%] mx-auto rounded-[34px] px-6 md:px-16 py-10">
          <div className="text-center mb-10">
            <p className="inline-block text-primary text-sm font-black border border-dashed border-primary/40 rounded-full px-5 py-2 bg-red-50">
              Testimonials
            </p>

            <h2 className="mt-5 text-4xl md:text-5xl font-black text-dark">
              What People Say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-8 max-w-5xl mx-auto items-center">
            <div className="flex flex-col items-center gap-4 min-h-[330px] justify-center">
              {visiblePeople.map((item) => {
                const realIndex = testimonials.findIndex(
                  (t) => t.name === item.name
                );
                const isActive = realIndex === activeIndex;

                return (
                  <div
                    key={item.name}
                    className={`
                      w-[115px] rounded-2xl overflow-hidden transition-all duration-500
                      ${
                        isActive
                          ? "h-[150px] opacity-100 scale-105 ring-2 ring-primary shadow-xl"
                          : "h-[80px] opacity-50 scale-95"
                      }
                    `}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>

            <div className="relative bg-softBg rounded-[28px] min-h-[300px] p-8 md:p-12 shadow-inner overflow-hidden">
              <span className="absolute top-4 right-8 text-[130px] leading-none text-primary/10 font-black">
                ”
              </span>

              <div key={activeIndex} className="relative z-10 animate-fadeIn">
                <p className="text-dark/70 text-lg md:text-2xl leading-9 font-bold max-w-3xl">
                  {active.message}
                </p>

                <div className="mt-10">
                  <h3 className="text-2xl font-black text-dark">
                    {active.name}
                  </h3>
                  <p className="text-primary font-bold mt-1">{active.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;