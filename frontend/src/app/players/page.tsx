"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function PlayersPage() {
  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/players');
      return res.data;
    }
  });

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">Our Squad</h1>
      
      {isLoading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading players...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {players?.map((player: any) => (
            <div key={player._id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group">
              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                {player.profile_photo ? (
                  <img src={player.profile_photo} alt={player.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                ) : (
                  <span className="text-gray-400 text-5xl">⚽</span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
                  {player.number && <span className="bg-blue-600 text-white font-bold px-2 py-1 rounded-full text-sm">#{player.number}</span>}
                </div>
                <p className="text-blue-600 font-medium mb-1">{player.position}</p>
                {player.role && <p className="text-gray-500 text-sm mb-1">{player.role}</p>}
                {player.age && <p className="text-gray-500 text-sm">Age: {player.age}</p>}
              </div>
            </div>
          ))}
          {!players?.length && <p className="col-span-full text-center text-gray-500">No players found.</p>}
        </div>
      )}
    </div>
  );
}
