import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Club Info - GreFC',
  description: 'Learn more about GreFC history, values and achievements.',
};

export default function ClubPage() {
  const achievements = [
    { year: '2025', title: 'Greenwich Sportday Champions', desc: 'A four-team tournament was organized for students from Greenwich Vietnam and Greenwich UK.', icon: '🏆', color: 'text-orange-500' },
    { year: '2024', title: "University of Greenwich's Honor Club (Winter)", desc: 'Awarded by University of Greenwich', icon: '⭐', color: 'text-cyan-500' },
    { year: '2025', title: "University of Greenwich's Honor Club (Spring/Summer)", desc: 'Awarded by University of Greenwich', icon: '⭐', color: 'text-cyan-500' },
    { year: '2024', title: 'Charity Tournaments', desc: 'Successfully organized many charity tournaments for local community.', icon: '❤️', color: 'text-red-500' },
  ];

  const values = [
    { title: 'Excellence', desc: 'Striving for the highest standards in everything we do.', icon: '🎯', bg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { title: 'Inclusivity', desc: 'Welcoming players of all backgrounds and skill levels.', icon: '🤝', bg: 'bg-green-50', iconColor: 'text-green-500' },
    { title: 'Community', desc: 'Building strong bonds that extend beyond football.', icon: '🏠', bg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { title: 'Integrity', desc: 'Playing with honor, respect, and sportsmanship.', icon: '🛡️', bg: 'bg-purple-50', iconColor: 'text-purple-500' },
  ];

  return (
    <div className="flex flex-col gap-16 py-10">
      {/* Club Hero */}
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <img src="/uploads/img/AVATA-GreFC.png" alt="GreFC Logo" className="w-32 h-32 object-contain" />
        </div>
        <h1 className="text-5xl font-black text-blue-900">GRE FC</h1>
        <h3 className="text-2xl font-semibold text-gray-600">University of Greenwich Football Club</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-500">
          Established in 2018, GreFC represents the spirit and excellence of the University of Greenwich 
          in competitive football while building a strong community of student athletes.
        </p>
        
        <div className="flex justify-center gap-8 mt-10">
          <div className="p-6 bg-white shadow-lg rounded-xl w-40">
            <span className="text-3xl">📅</span>
            <h4 className="text-2xl font-bold mt-2">2018</h4>
            <span className="text-sm text-gray-400 uppercase tracking-widest">Founded</span>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl w-40">
            <span className="text-3xl">👥</span>
            <h4 className="text-2xl font-bold mt-2">30+</h4>
            <span className="text-sm text-gray-400 uppercase tracking-widest">Members</span>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl w-40">
            <span className="text-3xl">📍</span>
            <h4 className="text-2xl font-bold mt-2">Da Nang</h4>
            <span className="text-sm text-gray-400 uppercase tracking-widest">Based</span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-blue-900 border-l-8 border-blue-900 pl-4">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>GreFC was born from the passion of a small group of University of Greenwich students who began playing together as a small football team in 2018. What started as casual kickabouts soon grew into a more organised and competitive group, driven by a shared love for the game.</p>
            <p>In 2021, GreFC was officially recognised as a club under the University of Greenwich, marking the start of a new chapter where we could represent the university, attract more members, and strengthen our football community.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="/uploads/img/clbstory.jpg" className="rounded-lg shadow-md h-48 w-full object-cover" />
          <img src="/uploads/img/clbstory1.jpg" className="rounded-lg shadow-md h-48 w-full object-cover mt-8" />
          <img src="/uploads/img/clbstory2.jpg" className="rounded-lg shadow-md h-48 w-full object-cover -mt-8" />
          <img src="/uploads/img/clbstory3.jpg" className="rounded-lg shadow-md h-48 w-full object-cover" />
        </div>
      </section>

      {/* Values */}
      <section className="text-center space-y-12">
        <div>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Values</h2>
          <p className="text-gray-500">These core values define who we are and guide everything we do.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className={`${v.bg} p-8 rounded-2xl shadow-sm transition hover:scale-105`}>
              <span className="text-4xl mb-4 block">{v.icon}</span>
              <h4 className="text-xl font-bold mb-2">{v.title}</h4>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-blue-900 text-white p-12 rounded-3xl shadow-xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
          <p className="text-blue-200">Celebrating our journey of success and recognition.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((a, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <span className="text-3xl block mb-2">{a.icon}</span>
              <span className="text-blue-300 font-bold block mb-1">{a.year}</span>
              <h4 className="text-lg font-bold mb-2">{a.title}</h4>
              <p className="text-blue-100/70 text-sm">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Official Info */}
      <section className="grid md:grid-cols-2 gap-12 bg-gray-50 p-12 rounded-3xl">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-900">Official Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase">Full Club Name</p>
              <p className="text-lg font-semibold">University of Greenwich Football Club</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase">Founded</p>
              <p className="text-lg font-semibold">October 2018</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase">Home Ground</p>
              <p className="text-lg font-semibold">FPT football field in FPT software campus</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-900">Get In Touch</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase">Club Email</p>
              <p className="text-lg font-semibold">grefc.dn@gmail.com</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase">Training Times</p>
              <p className="text-lg font-semibold">Every Thursday 7:30 PM - 8:30PM</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase">Address</p>
              <p className="text-lg font-semibold">658 Ng. Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
