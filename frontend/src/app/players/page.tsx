"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Shield, Star, Heart, Sparkles } from 'lucide-react';

export default function PlayersPage() {
  const { data: allMembers, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/players');
      return res.data;
    }
  });

  const players = allMembers?.filter((m: any) => m.category === 'player' || !m.category);
  const roses = allMembers?.filter((m: any) => m.category === 'non-player');

  return (
    <div className="py-20 space-y-32">
      {/* --- SECTION 1: THE FIRST TEAM --- */}
      <section className="space-y-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-6xl font-black text-blue-950 tracking-tighter uppercase italic">The First Team</h1>
          <p className="text-gray-500 max-w-xl text-lg font-medium">Meet the warriors of Greenwich Football Club. Passion, Skill, and Glory.</p>
          <div className="w-32 h-2 bg-blue-600 rounded-full"></div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {players?.map((player: any) => (
              <div key={player._id} className="relative bg-white rounded-[40px] p-8 flex flex-col items-center group shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-[0_40px_100px_rgba(0,100,255,0.15)] transition-all duration-500 hover:-translate-y-2">
                {/* Number Badge */}
                {player.number && (
                  <div className="absolute top-6 left-6 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 rotate-[-10deg] group-hover:rotate-0 transition-transform">
                    <span className="text-white font-black text-xl italic">#{player.number}</span>
                  </div>
                )}

                {/* Circular Avatar */}
                <div className="w-52 h-52 rounded-full overflow-hidden border-[12px] border-gray-50 shadow-inner mb-8 relative transition-transform duration-500 group-hover:scale-105">
                  {player.profile_photo ? (
                    <img src={player.profile_photo} alt={player.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                      <Shield size={64} className="text-gray-200" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                </div>

                <div className="text-center w-full space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">{player.name}</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <Star size={10} fill="currentColor" /> {player.position}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                    <div className="text-left space-y-0.5">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Team Role</p>
                      <p className="text-sm font-bold text-gray-700">{player.role || 'SQUAD PLAYER'}</p>
                    </div>
                    <div className="text-right space-y-0.5">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Age</p>
                      <p className="text-sm font-bold text-gray-700">{player.age || '--'} YRS</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- SECTION 2: THE ROSES OF GREFC --- */}
      <section className="space-y-16">
        <div className="flex flex-col items-center text-center space-y-4 pt-16 border-t border-gray-100">
          <div className="flex items-center gap-3">
             <Sparkles className="text-pink-400 animate-pulse" />
             <h2 className="text-6xl font-black text-blue-950 tracking-tighter uppercase italic">The Roses of GreFC</h2>
             <Sparkles className="text-pink-400 animate-pulse" />
          </div>
          <p className="text-gray-500 max-w-xl text-lg font-medium">Recognizing the elegance and dedication of our club's female members and support team.</p>
          <div className="w-32 h-2 bg-pink-400 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {roses?.map((rose: any) => (
            <div key={rose._id} className="relative bg-white rounded-[40px] p-8 flex flex-col items-center group shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-[0_40px_100px_rgba(255,182,193,0.3)] transition-all duration-500 hover:-translate-y-2">
              
              {/* Heart Badge for Roses */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200 rotate-[-10deg] group-hover:rotate-0 transition-transform text-white">
                <Heart size={24} fill="currentColor" />
              </div>

              {/* Circular Avatar */}
              <div className="w-52 h-52 rounded-full overflow-hidden border-[12px] border-pink-50 shadow-inner mb-8 relative transition-transform duration-500 group-hover:scale-105">
                {rose.profile_photo ? (
                  <img src={rose.profile_photo} alt={rose.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-pink-50/20">
                    <span className="text-6xl animate-bounce">🌸</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="text-center w-full space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">{rose.name}</h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Star size={10} fill="currentColor" /> {rose.position || 'Club Rose'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                  <div className="text-left space-y-0.5">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Department</p>
                    <p className="text-sm font-bold text-gray-700">{rose.role || 'Management'}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Joined</p>
                    <p className="text-sm font-bold text-gray-700">{rose.joined_year || '2024'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!roses?.length && (
            <div className="col-span-full text-center py-20 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
               <p className="text-gray-400 font-bold italic text-xl">The rose gallery is being updated...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
