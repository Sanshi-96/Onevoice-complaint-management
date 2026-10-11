import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Citizen submits complaint",
    text: "User registers, logs in, selects category, location, and submits complaint details through the portal.",
  },
  {
    number: "02",
    title: "System assigns authority",
    text: "Complaint is routed to the relevant authority based on category and location.",
  },
  {
    number: "03",
    title: "Authority reviews issue",
    text: "Authority checks complaint details, updates status, and adds remarks for the citizen.",
  },
  {
    number: "04",
    title: "Citizen tracks progress",
    text: "Citizen can view real-time status such as Submitted, Reviewed, Taking Action, and Solved.",
  },
  {
    number: "05",
    title: "Admin monitors system",
    text: "Admin manages users, complaints, dashboards, and overall complaint handling process.",
  },
];

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    stepRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="bg-softBg py-20">
      <div className="w-[91%] mx-auto">
        <div className="text-center mb-20">
          <p className="inline-block text-primary text-sm font-black border border-dashed border-primary/40 rounded-full px-5 py-2 bg-red-50">
            How OneVoice Works
          </p>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-dark">
            Simple Flow.
            <span className="text-primary"> Real Action.</span>
          </h2>

          <p className="mt-4 text-dark/60 max-w-2xl mx-auto leading-7">
            From complaint submission to authority action, OneVoice keeps every
            step clear, trackable, and organized.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2 hidden md:block"></div>

          <div
            className="absolute left-1/2 top-0 w-[3px] bg-primary -translate-x-1/2 hidden md:block transition-all duration-700"
            style={{
              height: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
          ></div>

          <div className="space-y-20">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (stepRefs.current[index] = el)}
                  data-index={index}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                    isActive ? "opacity-100" : "opacity-50"
                  } transition-all duration-500`}
                >
                  <div
                    className={`${
                      isLeft ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div
                      className={`
                        inline-flex items-center justify-center w-14 h-14 rounded-full font-black mb-5
                        ${
                          isActive
                            ? "bg-primary text-white scale-110 shadow-xl"
                            : "bg-red-50 text-primary"
                        }
                        transition-all duration-500
                      `}
                    >
                      {step.number}
                    </div>

                    <h3 className="text-2xl font-black text-dark">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-dark/60 leading-7">
                      {step.text}
                    </p>
                  </div>

                  <div
                    className={`
                      absolute left-1/2 top-6 -translate-x-1/2 hidden md:flex
                      w-6 h-6 rounded-full border-4 border-white
                      ${
                        isActive ? "bg-primary shadow-xl" : "bg-gray-300"
                      }
                      transition-all duration-500
                    `}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;