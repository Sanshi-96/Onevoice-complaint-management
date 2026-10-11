
function CitizenGuidelines({ darkMode }) {
  const items = [
    ["📍", "Give correct location", "Add street, city, district and province clearly."],
    ["📝", "Write clear details", "Explain the issue simply and directly."],
    ["🚨", "Use SOS carefully", "Use SOS only for real emergency situations."],
    ["🔔", "Check updates", "Track status updates from authorities regularly."],
  ];

  return (
    <div className={`rounded-[24px] p-6 shadow-lg ${darkMode ? "bg-[#202020] text-white" : "bg-white text-black"}`}>
      <h2 className="text-2xl font-black text-blue-600 mb-2">OneVoice Guidelines</h2>
      <p className="text-sm opacity-70 mb-6">Follow these rules when using OneVoice.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map(([icon, title, desc]) => (
          <div
            key={title}
            className={`rounded-2xl border p-6 flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-blue-50 border-blue-100"}`}
          >
            <div className="text-4xl">{icon}</div>
            <div>
              <h3 className="font-black text-lg">{title}</h3>
              <p className="text-sm opacity-70 mt-2">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitizenGuidelines;