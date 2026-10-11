import { useState } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

function CitizenChatbot() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(
    "Hi! Select a question below. I can help you use OneVoice."
  );

  const questions = [
    {
      q: "How can I submit a complaint?",
      a: "Go to Submit Complaint and choose Manual Complaint or AI Voice Complaint.",
    },
    {
      q: "How can I track my complaint?",
      a: "Go to My Complaints. You can view status updates like Submitted, Reviewed, Taking Action, Solved, or Closed.",
    },
    {
      q: "When should I use SOS?",
      a: "Use SOS only for real emergency situations that need immediate authority response.",
    },
    {
      q: "Can I request reconsideration?",
      a: "Yes. In My Complaints, use the Reconsider option when it is enabled for that complaint.",
    },
    {
      q: "How will I get updates?",
      a: "You will receive updates inside the Notifications page when authorities update your complaint.",
    },
  ];

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[360px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
          <div className="bg-blue-600 text-white px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-black">OneVoice Help</h3>
              <p className="text-xs text-white/80">Citizen Support Chatbot</p>
            </div>

            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="p-5">
            <div className="bg-blue-50 text-blue-900 rounded-2xl p-4 text-sm leading-6 mb-4">
              {answer}
            </div>

            <div className="space-y-2">
              {questions.map((item) => (
                <button
                  key={item.q}
                  onClick={() => setAnswer(item.a)}
                  className="w-full text-left border border-blue-100 hover:bg-blue-50 rounded-xl px-4 py-3 text-sm font-bold text-blue-700 transition"
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center hover:bg-blue-800 transition"
      >
        {open ? <FaTimes size={22} /> : <FaComments size={26} />}
      </button>
    </>
  );
}

export default CitizenChatbot;