import logo from "../assets/logo/main logo.png";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-dark flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        
        <div className="absolute w-[150px] h-[150px] rounded-full border-4 border-white/10 border-t-primary animate-spin"></div>

        <div className="absolute w-[115px] h-[115px] rounded-full border-2 border-primary/30 animate-ping"></div>

        <img
          src={logo}
          alt="OneVoice Logo"
          className="w-[95px] h-[95px] object-contain z-10 scale-150"
          style={{
            filter: `
              drop-shadow(0 0 2px #ffffff)
              drop-shadow(0 0 2px #ffffff)
            `,
          }}
        />

      </div>
    </div>
  );
};

export default PageLoader;