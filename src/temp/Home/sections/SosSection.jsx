import Button from "../../../components/Button";
import sosDemo from "../../../assets/images/sos-demo.png";

const SosSection = () => {
  return (
    <section id="sos" className="w-full bg-softBg py-20">
      <div className="w-[91%] mx-auto bg-white rounded-[34px] px-6 md:px-16 py-16 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <p className="inline-block text-primary text-sm font-black border border-dashed border-primary/40 rounded-full px-5 py-2 bg-red-50">
              SOS Emergency Support
            </p>

            <h2 className="mt-6 text-4xl md:text-5xl font-black text-dark leading-tight">
              Send an SOS alert
              <span className="text-primary block">in one tap.</span>
            </h2>

            <p className="mt-5 text-dark/60 leading-8 max-w-xl">
              OneVoice SOS helps users quickly send an emergency alert with
              their location, so the right support team can respond faster.
            </p>

            {/* <div className="mt-8 flex flex-wrap gap-4">
              <Button>Try SOS Demo</Button>
              <Button variant="secondary">Learn More</Button>
            </div> */}
          </div>

          <div className="flex justify-center lg:justify-end">
  <div className="w-full max-w-[430px] rounded-[28px] overflow-hidden shadow-2xl border border-red-100 bg-dark">
    <img
      src={sosDemo}
      alt="OneVoice SOS Emergency System"
      className="w-full h-[520px] object-cover"
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default SosSection;