import { useState } from "react";

const faqs = [
  {
    question: "How can I register a complaint?",
    answer:
      "You can create an account, log in to the citizen portal, select the complaint category, add your location and description, then submit it.",
  },
  {
    question: "Can I track my complaint status?",
    answer:
      "Yes. After submitting a complaint, you can track statuses like Submitted, Reviewed, Taking Action, and Solved.",
  },
  {
    question: "Who handles my complaint?",
    answer:
      "The system routes complaints to the relevant authority based on your selected category and location.",
  },
  {
    question: "How does SOS work?",
    answer:
      "SOS lets users quickly send an emergency alert with location details for faster support.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="w-full bg-softBg py-20">
      <div className="w-[91%] mx-auto bg-white rounded-[34px] px-6 md:px-16 py-16 shadow-card">
        <div className="text-center mb-10">
          <p className="inline-block text-primary text-sm font-black border border-dashed border-primary/40 rounded-full px-5 py-2 bg-red-50">
            FAQ
          </p>

          <h2 className="mt-5 text-4xl md:text-5xl font-black text-dark">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "bg-red-50 shadow-card" : "bg-gray-100"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-dark font-black text-lg">
                    {item.question}
                  </span>

                  <span className="text-3xl text-primary font-light">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-dark/60 leading-7">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;