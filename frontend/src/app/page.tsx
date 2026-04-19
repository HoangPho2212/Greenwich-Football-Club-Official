"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { MapPin, Trophy, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  const { data: fixtures, isLoading } = useQuery({
    queryKey: ['fixtures'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/fixtures');
      return res.data;
    }
  });

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('new_fixture', (fixture) => {
      console.log('New fixture added!', fixture);
    });
    return () => { socket.disconnect(); };
  }, []);

  return (
    <div className="pb-20 space-y-24">
      {/* --- HERO SECTION: PREMIUM LOOK --- */}
      <section className="relative w-full h-[700px] rounded-[40px] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] group">
        <img 
          src="/uploads/img/Gre Club.jpg" 
          alt="GreFC Club" 
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-12 md:p-20">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
              <Trophy size={16} className="text-yellow-400" />
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              Official <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Gre FC</span>
            </h1>
            
            <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed opacity-90">
              We embody the strength of Greenwich.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="bg-white text-blue-900 font-black px-8 py-4 rounded-2xl hover:bg-blue-400 hover:text-white transition-all flex items-center gap-2 group/btn">
                Our's line up <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FIXTURES SECTION --- */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-5xl font-black text-blue-950 tracking-tighter uppercase">Upcoming Battles</h2>
          <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {fixtures?.map((fixture: any) => (
              <div key={fixture._id} className="relative bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 group">
                {/* Badge & Date */}
                <div className="flex justify-between items-start mb-10">
                  <span className="bg-gray-100 text-gray-500 text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-colors">{fixture.match_type}</span>
                  <div className="text-right">
                    <div className="text-blue-950 font-black text-sm">{new Date(fixture.date).toLocaleDateString('en-GB')}</div>
                    <div className="text-gray-400 text-[10px] font-bold uppercase">{fixture.time}</div>
                  </div>
                </div>
                
                {/* VS Row */}
                <div className="flex items-center justify-between gap-4 mb-10">
                  <div className="flex flex-col items-center gap-4 flex-1">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-xl border-4 border-gray-50 group-hover:border-blue-100 transition-colors flex items-center justify-center">
                      <img src="/uploads/img/AVATA-GreFC.png" alt="Gre FC" className="w-full h-full object-contain scale-110" />
                    </div>
                    <span className="text-xs font-black text-blue-900 uppercase tracking-tight">Gre FC</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-gray-200 italic group-hover:text-blue-500 transition-colors">VS</span>
                  </div>

                  <div className="flex flex-col items-center gap-4 flex-1">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-xl border-4 border-gray-50 group-hover:border-blue-100 transition-colors">
                      {fixture.competitor_logo ? (
                        <img src={fixture.competitor_logo} alt={fixture.name} className="w-full h-full object-contain p-2" />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-3xl">🛡️</div>
                      )}
                    </div>
                    <span className="text-xs font-black text-gray-800 uppercase tracking-tight truncate w-full text-center px-1">{fixture.name}</span>
                  </div>
                </div>

                {/* Stadium Footer */}
                <div className="pt-6 border-t border-gray-50 flex justify-center">
                   <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                     <MapPin size={14} className="text-blue-600" />
                     <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest group-hover:text-blue-900">{fixture.stadium}</span>
                   </div>
                </div>
              </div>
            ))}
            {!fixtures?.length && <p className="col-span-full text-center py-20 text-gray-400 font-bold italic">No fixtures scheduled yet.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
