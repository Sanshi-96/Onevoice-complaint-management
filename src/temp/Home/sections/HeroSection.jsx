import Button from "../../../components/Button";

const stakeholderCards = [
  {
    title: "Citizens",
    subtitle: "Raise complaints easily",
    image: "/src/assets/images/hero citizen.png",
    className: "top-[45px] right-[435px] h-[355px] z-30",
  },
  {
    title: "Authorities",
    subtitle: "Review and take action",
    image: "/src/assets/images/hero auth.png",
    className: "top-[430px] right-[435px] h-[355px] z-20",
  },
  {
    title: "Government",
    subtitle: "Monitor service quality",
    image: "/src/assets/images/hero gov.png",
    className: "top-[-60px] right-[205px] h-[355px] z-30",
  },
  {
    title: "SOS Support",
    subtitle: "Emergency alert access",
    image: "/src/assets/images/hero sos.png",
    className: "top-[325px] right-[205px] h-[355px] z-20",
  },
  {
    title: "Citizens",
    subtitle: "Raise complaints easily",
    image: "/src/assets/images/hero citizen.png",
    className: "top-[710px] right-[205px] h-[355px] z-30",
  },
  {
    title: "Authorities",
    subtitle: "Review and take action",
    image: "/src/assets/images/hero auth.png",
    className: "top-[220px] right-[-25px] h-[355px] z-30",
  },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] bg-softBg px-4 sm:px-6 lg:px-8 py-10 overflow-hidden"
    >
      <div className="w-[95%] mx-auto bg-dark rounded-[34px] min-h-[650px] px-8 md:px-14 py-14 relative overflow-hidden shadow-card">
        <div className="absolute top-[-90px] right-[-90px] w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-[520px] pt-12">
          <p className="inline-block text-white/80 text-sm font-bold tracking-wide mb-5 border border-dashed text-white rounded-full px-5 py-2 bg-white/5 backdrop-blur-sm">
            OneVoice Smart Complaint Management System
            </p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
            Speak Up
            <span className="text-primary block">We Listen</span>
            Get Faster
            <span className="block">Solutions</span>
            </h1>

          <p className="mt-6 text-white/70 leading-8 max-w-md">
            OneVoice helps citizens submit complaints, authorities manage
            issues, and government bodies monitor public service progress
            through one secure digital platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/login">Register a Complaint</Button>
            <a href="#sos">
            <Button
              variant="secondary"
              className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
            >
              How SOS Works
            </Button>
          </a>
          </div>

          
        </div>

        <div className="hidden lg:block absolute inset-0 right-[-40px]">
        {stakeholderCards.map((item, index) => (
            <div
            key={index}
            className={`absolute w-[170px] rounded-full overflow-hidden shadow-2xl ${item.className}`}
            >
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#B80000]/50 to-transparent"></div>

            <div className="absolute inset-x-0 bottom-0 px-4 pb-9 text-center">
                <h4 className="text-white font-black text-xl leading-tight">
                {item.title}
                </h4>
                <p className="text-white/85 text-xs mt-2 leading-4">
                {item.subtitle}
                </p>
            </div>
            </div>
        ))}
        </div>

        <div className="absolute top-[170px] left-[20px] w-4 h-4 bg-primary rounded-full"></div>
        <div className="absolute bottom-[150px] left-[52%] w-4 h-4 bg-primary rounded-full"></div>
        <div className="absolute top-[110px] right-[310px] w-5 h-5 bg-white/60 rounded-full"></div>
        <div className="absolute top-[160px] right-[45px] w-5 h-5 bg-white/60 rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;