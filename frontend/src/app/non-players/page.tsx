"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Heart, Star } from 'lucide-react';

export default function NonPlayersPage() {
  const { data: members, isLoading } = useQuery({
    queryKey: ['non-players'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/players');
      // Filter for non-players only
      return res.data.filter((m: any) => m.category === 'non-player');
    }
  });

  return (
    <div className="py-20 space-y-16">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-6xl font-black text-blue-950 tracking-tighter uppercase italic">Club Supporters</h1>
        <p className="text-gray-500 max-w-2xl text-lg">Beyond the pitch, these are the dedicated members who bring passion and grace to Greenwich Football Club. Our "Roses" and support team.</p>
        <div className="w-32 h-2 bg-pink-500 rounded-full"></div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {members?.map((member: any) => (
            <div key={member._id} className="relative bg-white rounded-[40px] p-8 flex flex-col items-center group shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-[0_40px_100px_rgba(255,182,193,0.3)] transition-all duration-500 hover:-translate-y-2">
              
              {/* Special Badge for Non-Players */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200 rotate-[-10deg] group-hover:rotate-0 transition-transform">
                <Heart size={24} className="text-white fill-current" />
              </div>

              {/* Circular Avatar */}
              <div className="w-52 h-52 rounded-full overflow-hidden border-[12px] border-pink-50 shadow-inner mb-8 relative transition-transform duration-500 group-hover:scale-105">
                {member.profile_photo ? (
                  <img src={member.profile_photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-pink-50/30">
                    <span className="text-6xl">🌸</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors duration-500"></div>
              </div>

              <div className="text-center w-full space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">{member.name}</h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Star size={10} fill="currentColor" /> {member.position || 'Club Member'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                  <div className="text-left space-y-0.5">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Department</p>
                    <p className="text-sm font-bold text-gray-700">{member.role || 'Management'}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Since</p>
                    <p className="text-sm font-bold text-gray-700">{member.joined_year || '2024'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!members?.length && (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
               <p className="text-gray-400 font-bold italic text-xl">The support team list is being updated...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
