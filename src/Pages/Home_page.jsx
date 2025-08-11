export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      <section className="text-center py-10">
        <h2 className="text-3xl font-semibold mb-4">Your Path to Recovery</h2>
        <p className="text-gray-600 mb-8">Expert physiotherapy care at your convenience.</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          Get Started
        </button>
      </section>

      <section className="grid gap-6 md:grid-cols-3 p-6">
        <div className="bg-white p-4 rounded shadow hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Back Pain Therapy</h3>
          <p className="text-gray-600">Personalized sessions for spine health.</p>
        </div>
        <div className="bg-white p-4 rounded shadow hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Sports Injury Rehab</h3>
          <p className="text-gray-600">Recovery plans for athletes.</p>
        </div>
        <div className="bg-white p-4 rounded shadow hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Post-Surgery Care</h3>
          <p className="text-gray-600">Safe and effective rehabilitation.</p>
        </div>
      </section>
    </div>
  );
}
