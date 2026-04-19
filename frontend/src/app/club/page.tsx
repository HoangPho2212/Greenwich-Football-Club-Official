"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MapPin, Calendar, Users, Trophy, Target, Heart, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClubPage() {
  // --- Data Fetching ---
  const { data: achievements } = useQuery({ 
    queryKey: ['achievements'], 
    queryFn: async () => (await axios.get('http://localhost:5000/api/achievements')).data 
  });

  const { data: clubImages } = useQuery({ 
    queryKey: ['club-images'], 
    queryFn: async () => (await axios.get('http://localhost:5000/api/club-images')).data 
  });

  // --- Slider Logic ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const displayImages = clubImages?.length > 0 ? clubImages.map((img: any) => img.url) : ["/uploads/img/clbstory.jpg", "/uploads/img/clbstory1.jpg"];

  useEffect(() => {
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  const values = [
    { title: 'Excellence', desc: 'Striving for the highest standards in everything we do.', icon: <Target size={32} />, bg: 'bg-blue-500/10' },
    { title: 'Inclusivity', desc: 'Welcoming players of all backgrounds and skill levels.', icon: <Users size={32} />, bg: 'bg-green-500/10' },
    { title: 'Community', desc: 'Building strong bonds that extend beyond football.', icon: <Heart size={32} />, bg: 'bg-orange-500/10' },
    { title: 'Integrity', desc: 'Playing with honor, respect, and sportsmanship.', icon: <Shield size={32} />, bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-10 pb-20 text-gray-900">
      {/* --- SEPARATE HERO SECTION: LIGHTER BLUE GRADIENT --- */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-10 bg-gradient-to-br from-blue-500 via-blue-400 to-white rounded-[50px] overflow-hidden shadow-xl border border-white/50">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 space-y-8 max-w-5xl">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-white blur-3xl opacity-50"></div>
              <div className="relative w-44 h-44 bg-white rounded-[45px] shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">
                <img src="/uploads/img/AVATA-GreFC.png" alt="GreFC Logo" className="w-full h-full object-contain scale-125" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
            <h1 className="text-8xl font-black tracking-tighter uppercase italic text-blue-900 leading-none drop-shadow-sm">GRE FC</h1>
            <p className="text-xl font-bold text-blue-700 uppercase tracking-[0.3em]">University of Greenwich Football Club</p>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-2xl text-blue-900/70 font-medium leading-relaxed">
            Established in 2018, representing the spirit and excellence <br className="hidden md:block"/> of Greenwich in competitive football.
          </motion.p>

          <div className="flex justify-center gap-6 pt-6">
              {[
                  { label: 'Founded', val: '2018', icon: <Calendar className="text-blue-600" /> },
                  { label: 'Squad Size', val: '30+', icon: <Users className="text-blue-600" /> },
                  { label: 'Location', val: 'Da Nang', icon: <MapPin className="text-blue-600" /> }
              ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center bg-white/60 backdrop-blur-md px-8 py-4 rounded-3xl border border-white shadow-lg min-w-[140px]">
                      {stat.icon}
                      <span className="text-xl font-black text-blue-900 mt-1">{stat.val}</span>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{stat.label}</span>
                  </div>
              ))}
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION: LIGHTER THEME --- */}
      <div className="bg-white rounded-[50px] p-12 md:p-20 shadow-xl border border-gray-100 space-y-32">
        
        {/* Our Story with Dynamic Slider */}
        <section className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-6xl font-black tracking-tighter text-blue-900 uppercase italic border-l-8 border-blue-500 pl-6">Our Story</h2>
            <div className="space-y-6 text-gray-600 text-xl leading-relaxed">
              <p>GreFC was born from the passion of a small group of University of Greenwich students who began playing together as a small football team in 2018.</p>
              <p>In 2021, GreFC was officially recognised as a club under the University of Greenwich, marking the start of a new chapter of competitive growth and community building.</p>
            </div>
          </div>

          <div className="relative group aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={displayImages[currentSlide]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {displayImages.length > 1 && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent flex items-end justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setCurrentSlide((prev) => (prev - 1 + displayImages.length) % displayImages.length)} className="p-3 bg-white/80 backdrop-blur-md rounded-full text-blue-900 shadow-lg hover:bg-white transition"><ChevronLeft size={24} /></button>
                  <div className="flex gap-2">{displayImages.map((_, i) => (<div key={i} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-blue-200'}`}></div>))}</div>
                  <button onClick={() => setCurrentSlide((prev) => (prev + 1) % displayImages.length)} className="p-3 bg-white/80 backdrop-blur-md rounded-full text-blue-900 shadow-lg hover:bg-white transition"><ChevronRight size={24} /></button>
              </div>
            )}
          </div>
        </section>

        {/* Values */}
        <section className="text-center space-y-16">
          <h2 className="text-5xl font-black tracking-tighter text-blue-900 uppercase italic">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-blue-50/50 border border-blue-100 p-12 rounded-[45px] transition-all hover:bg-blue-50 hover:-translate-y-2 shadow-sm">
                <div className="text-blue-600 mb-6 flex justify-center">{v.icon}</div>
                <h4 className="text-2xl font-black text-blue-900 mb-3 uppercase tracking-tight">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Hall of Fame */}
        <section className="space-y-16 text-center">
          <h2 className="text-5xl font-black tracking-tighter text-blue-900 uppercase italic">Hall of Fame</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements?.map((a: any, i: number) => (
              <div key={a._id} className="relative p-10 rounded-[40px] overflow-hidden group shadow-xl h-80 flex flex-col justify-end text-left border border-white hover:-translate-y-2 transition-transform">
                <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="absolute top-8 right-8 text-5xl opacity-20 group-hover:scale-125 transition-transform">{a.icon}</div>
                <div className="relative z-10 space-y-2">
                  <span className="text-white/70 font-black text-[10px] tracking-widest uppercase">{a.year}</span>
                  <h4 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">{a.title}</h4>
                  <p className="text-white/90 text-xs font-medium leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
            {!achievements?.length && <p className="col-span-full text-gray-400 font-bold italic">Honors list is being updated...</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
