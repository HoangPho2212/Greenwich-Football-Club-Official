"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [playerForm, setPlayerForm] = useState({ name: '', position: '', number: '', age: '' });
  const [fixtureForm, setFixtureForm] = useState({ name: '', match_type: '', date: '', time: '', stadium: '' });

  const addPlayer = useMutation({
    mutationFn: (newPlayer: any) => axios.post('http://localhost:5000/api/players', newPlayer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      setPlayerForm({ name: '', position: '', number: '', age: '' });
      alert('Player added successfully!');
    }
  });

  const addFixture = useMutation({
    mutationFn: (newFixture: any) => axios.post('http://localhost:5000/api/fixtures', newFixture),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fixtures'] });
      setFixtureForm({ name: '', match_type: '', date: '', time: '', stadium: '' });
      alert('Fixture added successfully!');
    }
  });

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Player Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Add Player</h2>
          <form onSubmit={(e) => { e.preventDefault(); addPlayer.mutate(playerForm); }} className="space-y-4">
            <input className="w-full p-2 border rounded" placeholder="Name" value={playerForm.name} onChange={e => setPlayerForm({...playerForm, name: e.target.value})} required />
            <input className="w-full p-2 border rounded" placeholder="Position" value={playerForm.position} onChange={e => setPlayerForm({...playerForm, position: e.target.value})} required />
            <input className="w-full p-2 border rounded" placeholder="Number" type="number" value={playerForm.number} onChange={e => setPlayerForm({...playerForm, number: e.target.value})} />
            <input className="w-full p-2 border rounded" placeholder="Age" type="number" value={playerForm.age} onChange={e => setPlayerForm({...playerForm, age: e.target.value})} />
            <button type="submit" disabled={addPlayer.isPending} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {addPlayer.isPending ? 'Adding...' : 'Add Player'}
            </button>
          </form>
        </div>

        {/* Fixture Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Add Fixture</h2>
          <form onSubmit={(e) => { e.preventDefault(); addFixture.mutate(fixtureForm); }} className="space-y-4">
            <input className="w-full p-2 border rounded" placeholder="Opponent Name" value={fixtureForm.name} onChange={e => setFixtureForm({...fixtureForm, name: e.target.value})} required />
            <input className="w-full p-2 border rounded" placeholder="Match Type (e.g., Friendly, League)" value={fixtureForm.match_type} onChange={e => setFixtureForm({...fixtureForm, match_type: e.target.value})} required />
            <input className="w-full p-2 border rounded" type="date" value={fixtureForm.date} onChange={e => setFixtureForm({...fixtureForm, date: e.target.value})} required />
            <input className="w-full p-2 border rounded" type="time" value={fixtureForm.time} onChange={e => setFixtureForm({...fixtureForm, time: e.target.value})} required />
            <input className="w-full p-2 border rounded" placeholder="Stadium" value={fixtureForm.stadium} onChange={e => setFixtureForm({...fixtureForm, stadium: e.target.value})} required />
            <button type="submit" disabled={addFixture.isPending} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50">
              {addFixture.isPending ? 'Adding...' : 'Add Fixture'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
