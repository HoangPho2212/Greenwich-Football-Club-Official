"use client";

import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageCropper from '@/components/ImageCropper';
import { Trash2, UserPlus, Calendar, ListChecks, MapPin, Trophy, Image as ImageIcon, Plus, Star } from 'lucide-react';

export default function AdminPage() {
  const queryClient = useQueryClient();
  
  // --- Form States ---
  const [playerForm, setPlayerForm] = useState({ 
    name: '', 
    position: '', 
    number: '', 
    age: '', 
    role: '', 
    category: 'player',
    joined_year: new Date().getFullYear().toString()
  });
  const [playerImage, setPlayerImage] = useState<File | null>(null);
  const [showPlayerCropper, setShowPlayerCropper] = useState(false);
  
  const [fixtureForm, setFixtureForm] = useState({ name: '', match_type: '', date: '', time: '', stadium: '' });
  const [fixtureImage, setFixtureImage] = useState<File | null>(null);
  const [showFixtureCropper, setShowFixtureCropper] = useState(false);

  const [achievementForm, setAchievementForm] = useState({ year: '', title: '', desc: '', icon: '🏆', color: 'from-blue-400 to-blue-600' });
  
  const [showSliderCropper, setShowSliderCropper] = useState(false);

  // --- Data Queries ---
  const { data: players } = useQuery({ queryKey: ['players'], queryFn: async () => (await axios.get('http://localhost:5000/api/players')).data });
  const { data: fixtures } = useQuery({ queryKey: ['fixtures'], queryFn: async () => (await axios.get('http://localhost:5000/api/fixtures')).data });
  const { data: achievements } = useQuery({ queryKey: ['achievements'], queryFn: async () => (await axios.get('http://localhost:5000/api/achievements')).data });
  const { data: clubImages } = useQuery({ queryKey: ['club-images'], queryFn: async () => (await axios.get('http://localhost:5000/api/club-images')).data });

  // --- Mutations ---
  const addPlayer = useMutation({
    mutationFn: async (formData: FormData) => axios.post('http://localhost:5000/api/players', formData),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['players'] }); 
      setPlayerForm({ name: '', position: '', number: '', age: '', role: '', category: 'player', joined_year: '2024' }); 
      setPlayerImage(null); 
      alert('✅ Member added!'); 
    },
    onError: (err: any) => alert('❌ Error: ' + (err.response?.data?.error || err.message))
  });

  const deletePlayer = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/players/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }) });

  const addFixture = useMutation({
    mutationFn: async (formData: FormData) => axios.post('http://localhost:5000/api/fixtures', formData),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['fixtures'] }); 
      setFixtureForm({ name: '', match_type: '', date: '', time: '', stadium: '' }); 
      setFixtureImage(null); 
      alert('✅ Fixture added!'); 
    },
    onError: (err: any) => alert('❌ Error: ' + (err.response?.data?.error || err.message))
  });

  const deleteFixture = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/fixtures/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fixtures'] }) });

  const addAchievement = useMutation({
    mutationFn: async (data: any) => axios.post('http://localhost:5000/api/achievements', data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['achievements'] }); setAchievementForm({ year: '', title: '', desc: '', icon: '🏆', color: 'from-blue-400 to-blue-600' }); alert('✅ Achievement added!'); }
  });

  const deleteAchievement = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/achievements/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['achievements'] }) });

  const addSliderImage = useMutation({
    mutationFn: async (formData: FormData) => axios.post('http://localhost:5000/api/club-images', formData),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['club-images'] }); alert('✅ Slider image added!'); }
  });

  const deleteClubImage = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/club-images/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['club-images'] }) });

  // --- Handlers ---
  const handlePlayerSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    const fd = new FormData(); 
    Object.entries(playerForm).forEach(([k, v]) => fd.append(k, v)); 
    if (playerImage) fd.append('image', playerImage); 
    addPlayer.mutate(fd); 
  };

  const handleFixtureSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    const fd = new FormData(); 
    Object.entries(fixtureForm).forEach(([k, v]) => fd.append(k, v)); 
    if (fixtureImage) fd.append('image', fixtureImage); 
    addFixture.mutate(fd); 
  };

  const handleSliderSubmit = (file: File) => { 
    const fd = new FormData(); 
    fd.append('image', file); 
    addSliderImage.mutate(fd); 
    setShowSliderCropper(false); 
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 space-y-16">
      <h1 className="text-5xl font-black text-center text-blue-900 tracking-tighter uppercase italic">Admin Command Center</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* --- 1. FULL PLAYER FORM --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-blue-900"><UserPlus size={28}/><h2 className="text-2xl font-bold uppercase">Add Member</h2></div>
          <form onSubmit={handlePlayerSubmit} className="space-y-4">
            {/* Category Selector */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
              <button type="button" onClick={() => setPlayerForm({...playerForm, category: 'player'})} className={`flex-1 py-2 rounded-xl text-xs font-black transition ${playerForm.category === 'player' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>PLAYER</button>
              <button type="button" onClick={() => setPlayerForm({...playerForm, category: 'non-player'})} className={`flex-1 py-2 rounded-xl text-xs font-black transition ${playerForm.category === 'non-player' ? 'bg-pink-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>NON-PLAYER / STAFF</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Name" value={playerForm.name} onChange={e => setPlayerForm({...playerForm, name: e.target.value})} required />
              <input className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder={playerForm.category === 'player' ? "Position (e.g. Striker)" : "Role (e.g. Manager)"} value={playerForm.position} onChange={e => setPlayerForm({...playerForm, position: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {playerForm.category === 'player' ? (
                <input className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Squad Number" type="number" value={playerForm.number} onChange={e => setPlayerForm({...playerForm, number: e.target.value})} />
              ) : (
                <input className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500" placeholder="Joined Year" type="number" value={playerForm.joined_year} onChange={e => setPlayerForm({...playerForm, joined_year: e.target.value})} />
              )}
              <input className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Age" type="number" value={playerForm.age} onChange={e => setPlayerForm({...playerForm, age: e.target.value})} />
            </div>
            <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder={playerForm.category === 'player' ? "Team Role (e.g. Captain)" : "Department (e.g. Media Team)"} value={playerForm.role} onChange={e => setPlayerForm({...playerForm, role: e.target.value})} />
            
            <button type="button" onClick={() => setShowPlayerCropper(true)} className={`w-full p-4 rounded-xl font-black text-xs border-2 border-dashed transition ${playerImage ? 'bg-green-50 border-green-500 text-green-700' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}>
              {playerImage ? 'PHOTO READY ✓' : 'SELECT & CROP PHOTO'}
            </button>
            <button type="submit" disabled={addPlayer.isPending} className="w-full bg-blue-900 text-white font-black p-4 rounded-2xl hover:bg-black transition shadow-lg shadow-blue-100 disabled:opacity-50">
              {addPlayer.isPending ? '⏳ SAVING...' : 'SAVE MEMBER'}
            </button>
          </form>
        </div>

        {/* --- 2. FULL FIXTURE FORM --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-green-700"><Calendar size={28}/><h2 className="text-2xl font-bold uppercase">Add Fixture</h2></div>
          <form onSubmit={handleFixtureSubmit} className="space-y-4">
            <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Opponent Name" value={fixtureForm.name} onChange={e => setFixtureForm({...fixtureForm, name: e.target.value})} required />
            <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Match Type (e.g. Friendly)" value={fixtureForm.match_type} onChange={e => setFixtureForm({...fixtureForm, match_type: e.target.value})} required />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Date</label>
                <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" type="date" value={fixtureForm.date} onChange={e => setFixtureForm({...fixtureForm, date: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 ml-1 uppercase">Time</label>
                <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" type="time" value={fixtureForm.time} onChange={e => setFixtureForm({...fixtureForm, time: e.target.value})} required />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 ml-1 uppercase flex items-center gap-1"><MapPin size={10}/> Stadium</label>
              <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Stadium Name" value={fixtureForm.stadium} onChange={e => setFixtureForm({...fixtureForm, stadium: e.target.value})} required />
            </div>

            <button type="button" onClick={() => setShowFixtureCropper(true)} className={`w-full p-4 rounded-xl font-black text-xs border-2 border-dashed transition ${fixtureImage ? 'bg-green-50 border-green-500 text-green-700' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
              {fixtureImage ? 'LOGO READY ✓' : 'SELECT & CROP LOGO'}
            </button>
            <button type="submit" disabled={addFixture.isPending} className="w-full bg-green-800 text-white font-black p-4 rounded-2xl hover:bg-black transition shadow-lg shadow-green-100 disabled:opacity-50">
              {addFixture.isPending ? '⏳ SAVING...' : 'SAVE FIXTURE'}
            </button>
          </form>
        </div>

        {/* --- 3. ACHIEVEMENT FORM --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-orange-600"><Trophy size={28}/><h2 className="text-2xl font-bold uppercase">Add Achievement</h2></div>
          <form onSubmit={(e) => { e.preventDefault(); addAchievement.mutate(achievementForm); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="Year (e.g. 2025)" value={achievementForm.year} onChange={e => setAchievementForm({...achievementForm, year: e.target.value})} required />
              <input className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="Icon (e.g. 🏆)" value={achievementForm.icon} onChange={e => setAchievementForm({...achievementForm, icon: e.target.value})} />
            </div>
            <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="Title" value={achievementForm.title} onChange={e => setAchievementForm({...achievementForm, title: e.target.value})} required />
            <textarea className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none h-24" placeholder="Description" value={achievementForm.desc} onChange={e => setAchievementForm({...achievementForm, desc: e.target.value})} required />
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold" value={achievementForm.color} onChange={e => setAchievementForm({...achievementForm, color: e.target.value})}>
              <option value="from-blue-400 to-blue-600">Blue Theme</option>
              <option value="from-orange-400 to-red-600">Orange Theme</option>
              <option value="from-purple-400 to-indigo-600">Purple Theme</option>
              <option value="from-pink-400 to-rose-600">Pink Theme</option>
            </select>
            <button type="submit" disabled={addAchievement.isPending} className="w-full bg-orange-600 text-white font-black p-4 rounded-2xl hover:bg-black transition">SAVE ACHIEVEMENT</button>
          </form>
        </div>

        {/* --- 4. CLUB SLIDER IMAGES --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-purple-600"><ImageIcon size={28}/><h2 className="text-2xl font-bold uppercase">Story Slider</h2></div>
          <div className="space-y-6">
            <button onClick={() => setShowSliderCropper(true)} className="w-full p-8 border-4 border-dashed border-purple-100 rounded-[32px] text-purple-400 hover:bg-purple-50 transition flex flex-col items-center gap-2">
              <Plus size={40} /><span className="font-black uppercase tracking-widest text-xs">Add Story Picture</span>
            </button>
            <div className="grid grid-cols-3 gap-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
              {clubImages?.map((img: any) => (
                <div key={img._id} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
                  <img src={img.url} className="w-full h-full object-cover" />
                  <button onClick={() => confirm('Delete this image?') && deleteClubImage.mutate(img._id)} className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- DATA MANAGEMENT LISTS --- */}
      <div className="bg-gray-50 p-10 rounded-[50px] space-y-10 border border-gray-200 shadow-inner">
          <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-6"><ListChecks size={40} className="text-gray-400"/><h2 className="text-4xl font-black uppercase tracking-tighter text-gray-800">Database Records</h2></div>
          
          <div className="grid lg:grid-cols-2 gap-12 text-sm">
            {/* Achievements List */}
            <div className="space-y-4">
                <h3 className="font-black text-orange-600 uppercase flex items-center gap-2 tracking-widest"><Trophy size={16}/> Achievements</h3>
                <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-200 max-h-96 overflow-y-auto pr-1">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100 font-bold">
                            {achievements?.map((a: any) => (
                                <tr key={a._id} className="hover:bg-orange-50/50 transition"><td className="p-4 flex items-center gap-3"><span>{a.icon}</span><div><p className="text-gray-950">{a.title}</p><p className="text-[10px] text-gray-400">{a.year}</p></div></td><td className="p-4 text-right"><button onClick={() => deleteAchievement.mutate(a._id)} className="text-red-300 hover:text-red-600 p-2"><Trash2 size={18}/></button></td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Members List */}
            <div className="space-y-4">
                <h3 className="font-black text-blue-900 uppercase flex items-center gap-2 tracking-widest"><UserPlus size={16}/> Members</h3>
                <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-200 max-h-96 overflow-y-auto pr-1">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100 font-bold text-gray-800">
                            {players?.map((p: any) => (
                                <tr key={p._id} className="hover:bg-blue-50/50 transition">
                                  <td className="p-4 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] ${p.category === 'player' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                      {p.category === 'player' ? (p.number || '0') : '♥'}
                                    </div>
                                    <div>
                                      <p>{p.name} <span className={`text-[8px] px-1.5 py-0.5 rounded-full ml-1 ${p.category === 'player' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>{p.category?.toUpperCase()}</span></p>
                                      <p className="text-[10px] text-gray-400 uppercase">{p.position}</p>
                                    </div>
                                  </td>
                                  <td className="p-4 text-right">
                                    <button onClick={() => deletePlayer.mutate(p._id)} className="text-red-300 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                                  </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Fixtures List */}
            <div className="space-y-4">
                <h3 className="font-black text-green-700 uppercase flex items-center gap-2 tracking-widest"><Calendar size={16}/> Fixtures</h3>
                <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-200 max-h-96 overflow-y-auto pr-1">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100 font-bold text-gray-800">
                            {fixtures?.map((f: any) => (
                                <tr key={f._id} className="hover:bg-green-50/50 transition"><td className="p-4"><div><p className="text-green-900">vs {f.name}</p><p className="text-[10px] text-gray-400">{new Date(f.date).toLocaleDateString()} @ {f.stadium}</p></div></td><td className="p-4 text-right"><button onClick={() => deleteFixture.mutate(f._id)} className="text-red-300 hover:text-red-600 p-2"><Trash2 size={18}/></button></td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
      </div>

      {/* --- CROPPER MODALS --- */}
      {showPlayerCropper && <ImageCropper aspect={1} onCropComplete={(file) => { setPlayerImage(file); setShowPlayerCropper(false); }} onCancel={() => setShowPlayerCropper(false)} />}
      {showFixtureCropper && <ImageCropper aspect={1} onCropComplete={(file) => { setFixtureImage(file); setShowFixtureCropper(false); }} onCancel={() => setShowFixtureCropper(false)} />}
      {showSliderCropper && <ImageCropper aspect={4/3} onCropComplete={handleSliderSubmit} onCancel={() => setShowSliderCropper(false)} />}
    </div>
  );
}
