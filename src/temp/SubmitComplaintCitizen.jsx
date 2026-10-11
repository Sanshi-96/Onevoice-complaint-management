function SubmitComplaintCitizen({ darkMode, setShowComplaintForm, setActiveTab }) {
  return (
    <div className={`rounded-[24px] p-6 shadow-lg ${darkMode ? "bg-[#202020] text-white" : "bg-white text-black"}`}>
      <h2 className="text-2xl font-black text-blue-600 mb-2">Submit Complaint</h2>
      <p className="text-sm opacity-70 mb-6">Choose how you want to submit your complaint.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-2xl border p-7 ${darkMode ? "bg-white/5 border-white/10" : "bg-blue-50 border-blue-100"}`}>
          <div className="text-5xl mb-5">📝</div>
          <h3 className="text-xl font-black mb-2">Manual Complaint</h3>
          <p className="text-sm opacity-70 mb-6">Type your complaint details manually.</p>
          <button
            onClick={() => setShowComplaintForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Open Manual Form
          </button>
        </div>

        <div className={`rounded-2xl border p-7 ${darkMode ? "bg-white/5 border-white/10" : "bg-blue-50 border-blue-100"}`}>
          <div className="text-5xl mb-5">🎙️</div>
          <h3 className="text-xl font-black mb-2">AI Voice Complaint</h3>
          <p className="text-sm opacity-70 mb-6">Speak your complaint and convert it to text.</p>
          <button
            onClick={() => setActiveTab("ai")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Open Voice Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitComplaintCitizen;