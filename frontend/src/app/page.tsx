"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

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
      console.log('New fixture added via Realtime Socket!', fixture);
      // In a real app, you would invalidate the query here:
      // queryClient.invalidateQueries({ queryKey: ['fixtures'] });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="py-10">
      {/* Hero Section with Club Picture */}
      <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src="/uploads/img/Gre Club.jpg" 
          alt="GreFC Club" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-5xl font-extrabold text-white mb-2">GreFC Official</h1>
          <p className="text-blue-100 text-lg max-w-2xl">Niềm đam mê sân cỏ, tinh thần đồng đội và khát vọng chiến thắng.</p>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">Welcome to GreFC</h1>
      <p className="text-center text-gray-600 mb-10">Check out our latest fixtures and news.</p>

      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Upcoming Fixtures</h2>
      
      {isLoading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading fixtures...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtures?.map((fixture: any) => (
            <div key={fixture._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold">{fixture.match_type}</span>
                <span className="text-gray-500 text-sm">{new Date(fixture.date).toLocaleDateString()} - {fixture.time}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{fixture.name}</h3>
              <p className="text-gray-600 mb-1 flex items-center gap-2">🏟️ {fixture.stadium}</p>
            </div>
          ))}
          {!fixtures?.length && <p className="col-span-full text-gray-500">No fixtures scheduled.</p>}
        </div>
      )}
    </div>
  );
}
