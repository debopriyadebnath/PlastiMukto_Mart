import Link from "next/link";

export default function EventsSection() {
  const events = [
    {
      title: "ICRWM – Recycling & Waste Management Conference",
      subtitle: "Kolkata, India",
      date: "September 6, 2025",
      url: "#", // can link to registration page
    },
    {
      title: "ICSWM-2025 – Sustainable Waste Management",
      subtitle: "IEM Kolkata (Hybrid)",
      date: "September 12–14, 2025",
      url: "#",
    },
    {
      title: "WSDS 2025 – Sustainable Development Summit",
      subtitle: "New Delhi",
      date: "March 5–7, 2025",
      url: "#",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-white to-green-50 mt-16">
      <h2 className="text-3xl font-extrabold text-green-700 text-center drop-shadow mb-8 tracking-wide">
         Upcoming Eco Events & Conferences
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {events.map((ev, idx) => (
          <div key={idx} className="bg-white rounded-2xl border-2 border-pink-200 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-6">
            <h3 className="text-xl font-bold text-green-700 mb-1 drop-shadow">{ev.title}</h3>
            <p className="text-pink-600 italic mb-2">{ev.subtitle}</p>
            <p className="text-green-700 font-medium mb-4">{ev.date}</p>
            <Link href={ev.url}>
              < h1 className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg shadow">
                Learn More
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
