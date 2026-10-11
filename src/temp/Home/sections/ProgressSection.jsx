import { useEffect, useState } from "react";

const progressData = [
  {
    value: 1000,
    suffix: "+",
    title: "Complaints Submitted",
  },
  {
    value: 850,
    suffix: "+",
    title: "Cases Resolved",
  },
  {
    value: 25,
    suffix: "+",
    title: "Authority Departments",
  },
  {
    value: 24,
    suffix: "/7",
    title: "SOS Support",
  },
];

const CountUpNumber = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const incrementTime = 20;
    const totalSteps = duration / incrementTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {value >= 1000 ? `${Math.floor(count / 1000)}K` : count}
      {suffix}
    </>
  );
};

const ProgressSection = () => {
  return (
    <section id="progress" className="w-full bg-softBg py-16">
      <div className="w-[91%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {progressData.map((item, index) => (
            <div
              key={index}
              className="
                bg-white/70
                rounded-2xl
                min-h-[145px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                shadow-card
                border
                border-white
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              <h3 className="text-4xl md:text-5xl font-black text-primary">
                <CountUpNumber value={item.value} suffix={item.suffix} />
              </h3>

              <p className="mt-3 text-sm md:text-base text-dark/70 font-bold">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;