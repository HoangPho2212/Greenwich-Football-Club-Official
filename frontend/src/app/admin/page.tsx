"use client";

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageCropper from '@/components/ImageCropper';
import { Trash2, UserPlus, Calendar, ListChecks, MapPin, Trophy, Image as ImageIcon, Plus, Star, Layout, Edit3, XCircle, Search, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // --- Auth Check ---
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'authenticated_grefc_admin') {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };
  
  // --- Form States ---
  const [playerForm, setPlayerForm] = useState({ 
    _id: '', 
    name: '', 
    position: '', 
    number: '', 
    age: '', 
    role: '', 
    category: 'player', 
    joined_year: '2024' 
  });
  const [playerImage, setPlayerImage] = useState<File | null>(null);
  const [showPlayerCropper, setShowPlayerCropper] = useState(false);
  const [isEditingPlayer, setIsEditingPlayer] = useState(false);
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  
  // --- Other States ---
  const [fixtureForm, setFixtureForm] = useState({ name: '', match_type: '', date: '', time: '', stadium: '' });
  const [fixtureImage, setFixtureImage] = useState<File | null>(null);
  const [showFixtureCropper, setShowFixtureCropper] = useState(false);
  const [achievementForm, setAchievementForm] = useState({ year: '', title: '', desc: '', icon: '🏆', color: 'from-blue-400 to-blue-600' });
  const [showSliderCropper, setShowSliderCropper] = useState(false);
  const [homeForm, setHomeForm] = useState({ heroTitle: '', heroSubtitle: '', heroDescription: '', welcomeTitle: '', welcomeDescription: '' });
  const [showHeroCropper, setShowHeroCropper] = useState(false);

  // --- Queries ---
  const { data: players } = useQuery({ queryKey: ['players'], queryFn: async () => (await axios.get('http://localhost:5000/api/players')).data });
  const { data: fixtures } = useQuery({ queryKey: ['fixtures'], queryFn: async () => (await axios.get('http://localhost:5000/api/fixtures')).data });
  const { data: achievements } = useQuery({ queryKey: ['achievements'], queryFn: async () => (await axios.get('http://localhost:5000/api/achievements')).data });
  const { data: clubImages } = useQuery({ queryKey: ['club-images'], queryFn: async () => (await axios.get('http://localhost:5000/api/club-images')).data });
  const { data: homeContent } = useQuery({ queryKey: ['home-content'], queryFn: async () => (await axios.get('http://localhost:5000/api/home-content')).data });

  useEffect(() => {
    if (homeContent) setHomeForm({ heroTitle: homeContent.heroTitle, heroSubtitle: homeContent.heroSubtitle, heroDescription: homeContent.heroDescription, welcomeTitle: homeContent.welcomeTitle, welcomeDescription: homeContent.welcomeDescription });
  }, [homeContent]);

  // --- Mutations ---
  const savePlayer = useMutation({
    mutationFn: async (formData: FormData) => {
      if (isEditingPlayer) {
        return axios.put(`http://localhost:5000/api/players/${playerForm._id}`, formData);
      }
      return axios.post('http://localhost:5000/api/players', formData);
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['players'] }); 
      resetPlayerForm();
      alert(isEditingPlayer ? '✅ Member updated!' : '✅ Member added!'); 
    },
    onError: (err: any) => alert('❌ Error: ' + (err.response?.data?.error || err.message))
  });

  const deletePlayer = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/players/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }) });

  // Other Mutations...
  const addFixture = useMutation({ mutationFn: async (fd: FormData) => axios.post('http://localhost:5000/api/fixtures', fd), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['fixtures'] }); setFixtureForm({ name: '', match_type: '', date: '', time: '', stadium: '' }); setFixtureImage(null); alert('✅ Fixture added!'); } });
  const deleteFixture = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/fixtures/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fixtures'] }) });
  const addAchievement = useMutation({ mutationFn: async (d: any) => axios.post('http://localhost:5000/api/achievements', d), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['achievements'] }); setAchievementForm({ year: '', title: '', desc: '', icon: '🏆', color: 'from-blue-400 to-blue-600' }); alert('✅ Achievement added!'); } });
  const deleteAchievement = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/achievements/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['achievements'] }) });
  const updateHomeContent = useMutation({ mutationFn: async (fd: FormData) => axios.post('http://localhost:5000/api/home-content', fd), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['home-content'] }); alert('✅ Homepage updated!'); } });
  const addSliderImage = useMutation({ mutationFn: async (fd: FormData) => axios.post('http://localhost:5000/api/club-images', fd), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['club-images'] }); alert('✅ Slider image added!'); } });
  const deleteClubImage = useMutation({ mutationFn: async (id: string) => axios.delete(`http://localhost:5000/api/club-images/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['club-images'] }) });

  // --- Handlers ---
  const resetPlayerForm = () => {
    setPlayerForm({ _id: '', name: '', position: '', number: '', age: '', role: '', category: 'player', joined_year: '2024' });
    setPlayerImage(null);
    setIsEditingPlayer(false);
  };

  const startEditPlayer = (player: any) => {
    setPlayerForm({
      _id: player._id,
      name: player.name,
      position: player.position,
      number: player.number || '',
      age: player.age || '',
      role: player.role || '',
      category: player.category || 'player',
      joined_year: player.joined_year || '2024'
    });
    setIsEditingPlayer(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayerSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    const fd = new FormData(); 
    Object.entries(playerForm).forEach(([k, v]) => {
      if (k !== '_id') fd.append(k, v);
    }); 
    if (playerImage) fd.append('image', playerImage); 
    savePlayer.mutate(fd); 
  };

  const handleFixtureSubmit = (e: React.FormEvent) => { e.preventDefault(); const fd = new FormData(); Object.entries(fixtureForm).forEach(([k, v]) => fd.append(k, v)); if (fixtureImage) fd.append('image', fixtureImage); addFixture.mutate(fd); };
  const handleHomeSubmit = (e: React.FormEvent) => { e.preventDefault(); const fd = new FormData(); Object.entries(homeForm).forEach(([k, v]) => fd.append(k, v)); updateHomeContent.mutate(fd); };
  const handleHeroImageSubmit = (f: File) => { const fd = new FormData(); fd.append('heroImage', f); updateHomeContent.mutate(fd); setShowHeroCropper(false); };
  const handleSliderSubmit = (f: File) => { const fd = new FormData(); fd.append('image', f); addSliderImage.mutate(fd); setShowSliderCropper(false); };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 space-y-16">
      <h1 className="text-5xl font-black text-center text-blue-900 tracking-tighter uppercase italic">Admin Command Center</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* --- 0. HOMEPAGE CONTENT --- */}
        <div className="lg:col-span-2 bg-blue-50/50 p-8 rounded-[40px] border border-blue-100 space-y-8">
          <div className="flex items-center gap-3 text-blue-900"><Layout size={28}/><h2 className="text-2xl font-bold uppercase tracking-tight">Homepage Customization</h2></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Main Hero Image</label>
              <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl group">
                <img src={homeContent?.heroImage || '/uploads/img/Gre Club.jpg'} className="w-full h-full object-cover" />
                <button onClick={() => setShowHeroCropper(true)} className="absolute inset-0 bg-blue-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2"><Edit3 size={32} /><span className="font-bold text-xs">CHANGE PHOTO</span></button>
              </div>
            </div>
            <form onSubmit={handleHomeSubmit} className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div><label className="text-[10px] font-black text-gray-400 uppercase ml-1">Hero Title</label><input className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-black text-lg" value={homeForm.heroTitle} onChange={e => setHomeForm({...homeForm, heroTitle: e.target.value})} /></div>
                <div><label className="text-[10px] font-black text-gray-400 uppercase ml-1">Hero Subtitle</label><input className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={homeForm.heroSubtitle} onChange={e => setHomeForm({...homeForm, heroSubtitle: e.target.value})} /></div>
              </div>
              <div className="space-y-4">
                <div><label className="text-[10px] font-black text-gray-400 uppercase ml-1">Hero Description</label><textarea className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 h-32 text-sm leading-relaxed" value={homeForm.heroDescription} onChange={e => setHomeForm({...homeForm, heroDescription: e.target.value})} /></div>
                <button type="submit" disabled={updateHomeContent.isPending} className="w-full bg-blue-600 text-white font-black p-4 rounded-2xl hover:bg-black transition shadow-lg shadow-blue-200">UPDATE HOMEPAGE TEXT</button>
              </div>
            </form>
          </div>
        </div>

        {/* --- 1. MEMBER FORM (ADD/EDIT) --- */}
        <div className={`p-8 rounded-[40px] shadow-xl border transition-all duration-500 space-y-6 ${isEditingPlayer ? 'bg-blue-900 text-white border-blue-900 scale-[1.02]' : 'bg-white text-blue-900 border-gray-100'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {isEditingPlayer ? <Edit3 size={28}/> : <UserPlus size={28}/>}
              <h2 className="text-2xl font-bold uppercase">{isEditingPlayer ? 'Edit Member' : 'Add Member'}</h2>
            </div>
            {isEditingPlayer && (
              <button onClick={resetPlayerForm} className="text-blue-200 hover:text-white transition flex items-center gap-1 font-bold text-xs uppercase">
                <XCircle size={18}/> Cancel Edit
              </button>
            )}
          </div>
          
          <form onSubmit={handlePlayerSubmit} className="space-y-4">
            <div className="flex gap-2 p-1 bg-gray-100/10 rounded-2xl">
              <button type="button" onClick={() => setPlayerForm({...playerForm, category: 'player'})} className={`flex-1 py-2 rounded-xl text-xs font-black transition ${playerForm.category === 'player' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400'}`}>PLAYER</button>
              <button type="button" onClick={() => setPlayerForm({...playerForm, category: 'non-player'})} className={`flex-1 py-2 rounded-xl text-xs font-black transition ${playerForm.category === 'non-player' ? 'bg-pink-500 text-white shadow-md' : 'text-gray-400'}`}>NON-PLAYER</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input className={`p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isEditingPlayer ? 'bg-blue-800 border-blue-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`} placeholder="Full Name" value={playerForm.name} onChange={e => setPlayerForm({...playerForm, name: e.target.value})} required />
              {playerForm.category === 'player' ? (
                <select className={`p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold ${isEditingPlayer ? 'bg-blue-800 border-blue-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`} value={playerForm.position} onChange={e => setPlayerForm({...playerForm, position: e.target.value})} required>
                  <option value="">Select Position</option><option value="Goal Keeper">Goal Keeper</option><option value="Defender">Defender</option><option value="Midfielder">Midfielder</option><option value="Striker">Striker</option>
                </select>
              ) : (
                <input className={`p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isEditingPlayer ? 'bg-blue-800 border-blue-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`} placeholder="Role (e.g. Manager)" value={playerForm.position} onChange={e => setPlayerForm({...playerForm, position: e.target.value})} required />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {playerForm.category === 'player' ? (
                <input className={`p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isEditingPlayer ? 'bg-blue-800 border-blue-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`} placeholder="Squad Number" type="number" value={playerForm.number} onChange={e => setPlayerForm({...playerForm, number: e.target.value})} />
              ) : (
                <input className={`p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isEditingPlayer ? 'bg-blue-800 border-blue-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`} placeholder="Joined Year" type="number" value={playerForm.joined_year} onChange={e => setPlayerForm({...playerForm, joined_year: e.target.value})} />
              )}
              <input className={`p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isEditingPlayer ? 'bg-blue-800 border-blue-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`} placeholder="Age" type="number" value={playerForm.age} onChange={e => setPlayerForm({...playerForm, age: e.target.value})} />
            </div>
            
            <input className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isEditingPlayer ? 'bg-blue-800 border-blue-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`} placeholder={playerForm.category === 'player' ? "Team Role (e.g. Captain)" : "Department (e.g. Media Team)"} value={playerForm.role} onChange={e => setPlayerForm({...playerForm, role: e.target.value})} />
            
            <button type="button" onClick={() => setShowPlayerCropper(true)} className={`w-full p-4 rounded-xl font-black text-xs border-2 border-dashed transition ${playerImage ? 'bg-green-500 border-green-400 text-white' : 'border-blue-200 text-blue-400'}`}>
              {playerImage ? 'NEW PHOTO READY ✓' : isEditingPlayer ? 'CHANGE PHOTO (OPTIONAL)' : 'SELECT & CROP PHOTO'}
            </button>
            <button type="submit" disabled={savePlayer.isPending} className={`w-full font-black p-4 rounded-2xl transition shadow-lg ${isEditingPlayer ? 'bg-white text-blue-900 hover:bg-blue-100' : 'bg-blue-900 text-white hover:bg-black'}`}>
              {savePlayer.isPending ? 'SAVING...' : isEditingPlayer ? 'UPDATE MEMBER' : 'SAVE MEMBER'}
            </button>
          </form>
        </div>

        {/* --- 2. ADD FIXTURE --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-green-700"><Calendar size={28}/><h2 className="text-2xl font-bold uppercase">Add Fixture</h2></div>
          <form onSubmit={handleFixtureSubmit} className="space-y-4">
            <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Opponent Name" value={fixtureForm.name} onChange={e => setFixtureForm({...fixtureForm, name: e.target.value})} required />
            <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Match Type" value={fixtureForm.match_type} onChange={e => setFixtureForm({...fixtureForm, match_type: e.target.value})} required />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 ml-1">Date</label><input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" type="date" value={fixtureForm.date} onChange={e => setFixtureForm({...fixtureForm, date: e.target.value})} required /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 ml-1">Time</label><input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" type="time" value={fixtureForm.time} onChange={e => setFixtureForm({...fixtureForm, time: e.target.value})} required /></div>
            </div>
            <input className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Stadium" value={fixtureForm.stadium} onChange={e => setFixtureForm({...fixtureForm, stadium: e.target.value})} required />
            <button type="button" onClick={() => setShowFixtureCropper(true)} className={`w-full p-3 rounded-xl font-bold text-xs border-2 border-dashed ${fixtureImage ? 'bg-green-50 border-green-500 text-green-700' : 'border-blue-200 text-blue-600'}`}>{fixtureImage ? 'LOGO READY ✓' : 'SELECT LOGO'}</button>
            <button type="submit" className="w-full bg-green-800 text-white font-black p-4 rounded-2xl hover:bg-black transition">SAVE FIXTURE</button>
          </form>
        </div>

        {/* --- 3. ADD ACHIEVEMENT --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-orange-600"><Trophy size={28}/><h2 className="text-2xl font-bold uppercase tracking-tight">Add Achievement</h2></div>
          <form onSubmit={(e) => { e.preventDefault(); addAchievement.mutate(achievementForm); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input className="p-3 bg-gray-50 border rounded-xl outline-none" placeholder="Year" value={achievementForm.year} onChange={e => setAchievementForm({...achievementForm, year: e.target.value})} required />
              <input className="p-3 bg-gray-50 border rounded-xl outline-none" placeholder="Icon" value={achievementForm.icon} onChange={e => setAchievementForm({...achievementForm, icon: e.target.value})} />
            </div>
            <input className="w-full p-3 bg-gray-50 border rounded-xl outline-none" placeholder="Title" value={achievementForm.title} onChange={e => setAchievementForm({...achievementForm, title: e.target.value})} required />
            <textarea className="w-full p-3 bg-gray-50 border rounded-xl outline-none h-24" placeholder="Description" value={achievementForm.desc} onChange={e => setAchievementForm({...achievementForm, desc: e.target.value})} required />
            <select className="w-full p-3 bg-gray-50 border rounded-xl outline-none font-bold" value={achievementForm.color} onChange={e => setAchievementForm({...achievementForm, color: e.target.value})}>
              <option value="from-blue-400 to-blue-600">Blue Theme</option><option value="from-orange-400 to-red-600">Orange Theme</option><option value="from-purple-400 to-indigo-600">Purple Theme</option><option value="from-pink-400 to-rose-600">Pink Theme</option>
            </select>
            <button type="submit" className="w-full bg-orange-600 text-white font-black p-4 rounded-2xl hover:bg-black transition">SAVE ACHIEVEMENT</button>
          </form>
        </div>

        {/* --- 4. STORY SLIDER --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-purple-600"><ImageIcon size={28}/><h2 className="text-2xl font-bold uppercase tracking-tight">Story Slider</h2></div>
          <div className="space-y-6">
            <button onClick={() => setShowSliderCropper(true)} className="w-full p-8 border-4 border-dashed border-purple-100 rounded-[32px] text-purple-400 hover:bg-purple-50 transition flex flex-col items-center gap-2"><Plus size={40} /><span className="font-black uppercase tracking-widest text-xs">Add Story Picture</span></button>
            <div className="grid grid-cols-3 gap-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
              {clubImages?.map((img: any) => (
                <div key={img._id} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
                  <img src={img.url} className="w-full h-full object-cover" />
                  <button onClick={() => confirm('Delete this image?') && deleteClubImage.mutate(img._id)} className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Trash2 size={24} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- DATABASE RECORDS --- */}
      <div className="bg-gray-50 p-10 rounded-[50px] space-y-10 border border-gray-200 shadow-inner">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-gray-200 pb-8">
            <div className="flex items-center gap-4">
              <ListChecks size={40} className="text-gray-400"/>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-800">Database Records</h2>
            </div>
            
            {/* Search Members in Admin */}
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search members to edit..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all font-bold text-sm text-gray-900"
                value={adminSearchTerm}
                onChange={(e) => setAdminSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 text-sm">
            <div className="space-y-4">
                <h3 className="font-black text-orange-600 uppercase flex items-center gap-2 tracking-widest"><Trophy size={16}/> Achievements</h3>
                <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-200 max-h-96 overflow-y-auto pr-1">
                    <table className="w-full text-left"><tbody className="divide-y divide-gray-100 font-bold">{achievements?.map((a: any) => (
                                <tr key={a._id} className="hover:bg-orange-50/50 transition"><td className="p-4 flex items-center gap-3"><span>{a.icon}</span><div><p className="text-gray-950">{a.title}</p><p className="text-[10px] text-gray-400">{a.year}</p></div></td><td className="p-4 text-right"><button onClick={() => deleteAchievement.mutate(a._id)} className="text-red-300 hover:text-red-600 p-2"><Trash2 size={18}/></button></td></tr>
                    ))}</tbody></table>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-black text-blue-900 uppercase flex items-center gap-2 tracking-widest"><UserPlus size={16}/> Members</h3>
                <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-200 max-h-96 overflow-y-auto pr-1">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100 font-bold text-gray-800">
                            {players?.filter((p: any) => 
                                p.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || 
                                p.position?.toLowerCase().includes(adminSearchTerm.toLowerCase())
                            ).map((p: any) => (
                                <tr key={p._id} className="hover:bg-blue-50/50 transition group">
                                  <td className="p-4 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] ${p.category === 'player' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>{p.category === 'player' ? (p.number || '0') : '♥'}</div>
                                    <div><p>{p.name}</p><p className="text-[10px] text-gray-400 uppercase">{p.position}</p></div>
                                  </td>
                                  <td className="p-4 text-right space-x-2">
                                    <button onClick={() => startEditPlayer(p)} className="text-blue-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition opacity-0 group-hover:opacity-100"><Edit3 size={18}/></button>
                                    <button onClick={() => deletePlayer.mutate(p._id)} className="text-red-300 hover:text-red-600 p-2 transition"><Trash2 size={18}/></button>
                                  </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-black text-green-700 uppercase flex items-center gap-2 tracking-widest"><Calendar size={16}/> Fixtures</h3>
                <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-200 max-h-96 overflow-y-auto pr-1">
                    <table className="w-full text-left"><tbody className="divide-y divide-gray-100 font-bold text-gray-800">{fixtures?.map((f: any) => (
                                <tr key={f._id} className="hover:bg-green-50/50 transition"><td className="p-4"><div><p className="text-green-900">vs {f.name}</p><p className="text-[10px] text-gray-400">{new Date(f.date).toLocaleDateString()}</p></div></td><td className="p-4 text-right"><button onClick={() => confirm('Delete fixture?') && deleteFixture.mutate(f._id)} className="text-red-300 hover:text-red-600 p-2"><Trash2 size={18}/></button></td></tr>
                    ))}</tbody></table>
                </div>
            </div>
          </div>
      </div>

      {/* --- MODALS --- */}
      {showPlayerCropper && <ImageCropper aspect={1} onCropComplete={(file) => { setPlayerImage(file); setShowPlayerCropper(false); }} onCancel={() => setShowPlayerCropper(false)} />}
      {showFixtureCropper && <ImageCropper aspect={1} onCropComplete={(file) => { setFixtureImage(file); setShowFixtureCropper(false); }} onCancel={() => setShowFixtureCropper(false)} />}
      {showSliderCropper && <ImageCropper aspect={4/3} onCropComplete={handleSliderSubmit} onCancel={() => setShowSliderCropper(false)} />}
      {showHeroCropper && <ImageCropper aspect={21/9} onCropComplete={handleHeroImageSubmit} onCancel={() => setShowHeroCropper(false)} />}
    </div>
  );
}
