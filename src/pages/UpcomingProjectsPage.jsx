import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UPCOMING_PROJECTS } from '../data/constants';
import { PinIco, ChevronL, SearchIco, ArrowR } from '../data/icons';
import './UpcomingProjectsPage.css';

const UpcomingProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = UPCOMING_PROJECTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.developer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Outfit',sans-serif] pb-[100px]">
      {/* HERO */}
      <div className="bg-[#0f172a] h-[270px] mb-12 relative overflow-hidden flex flex-col justify-center">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1350px] mx-auto px-[22px] relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[0.9rem] font-medium mb-8 no-underline">
            <ChevronL className="w-4 h-4" /> Back to Home
          </Link>
          <div className="max-w-[700px]">
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[0.75rem] font-bold uppercase tracking-widest mb-6">
              Pre-Launch Opportunities
            </div>
            <h1 className="text-[2rem] font-semibold text-white leading-tight tracking-tight mb-4 max-md:text-[1.8rem]">
              Upcoming Projects
            </h1>
            <p className="text-[1.1rem] text-white/70 leading-relaxed font-normal">
              Exclusive early access to India's most anticipated residential and commercial developments. 
              Be the first to invest before prices appreciate.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1350px] mx-auto px-[22px]">
        {/* FILTERS */}
        <div className="flex justify-between items-center mb-10 gap-6 max-md:flex-col max-md:items-stretch">
          <div className="relative flex-1 max-w-[500px] group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition-colors group-focus-within:text-amber-600">
              <SearchIco className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search by project, developer or city..." 
              className="w-full h-[54px] pl-12 pr-6 rounded-[16px] border border-[#e2e8f0] bg-white text-[1rem] font-medium placeholder:text-[#94a3b8] focus:outline-none focus:border-amber-600 focus:shadow-[0_8px_30px_rgba(245,158,11,0.06)] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="bg-white border border-[#e2e8f0] px-6 py-3.5 rounded-[16px] text-[#475569] text-[0.95rem] font-medium shadow-sm">
            <span className="text-[#0f172a] font-bold text-[1.1rem] mr-1.5">{filteredProjects.length}</span> Upcoming Developments
          </div>
        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="bg-white rounded-[24px] overflow-hidden border border-[#e2e8f0] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:border-amber-500/20 group">
                <div className="relative h-[240px] overflow-hidden">
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0f172a]/80 backdrop-blur-md border border-white/10 text-white text-[0.7rem] font-bold uppercase tracking-wider">
                    {proj.status}
                  </div>
                </div>
                <div className="p-7">
                  <div className="text-amber-600 text-[0.75rem] font-bold uppercase tracking-[0.08em] mb-2">{proj.developer}</div>
                  <h3 className="text-[1.35rem] font-semibold text-[#0f172a] mb-2 leading-tight group-hover:text-amber-600 transition-colors">{proj.name}</h3>
                  <div className="flex items-center gap-1.5 text-[#64748b] text-[0.9rem] font-medium mb-6">
                    <PinIco className="w-4 h-4 opacity-70" /> {proj.loc}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#f1f5f9] mb-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.65rem] font-bold text-[#94a3b8] uppercase tracking-wider">Investment Type</span>
                      <span className="text-[0.95rem] font-semibold text-[#0f172a]">{proj.type}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.65rem] font-bold text-[#94a3b8] uppercase tracking-wider">Target Launch</span>
                      <span className="text-[0.95rem] font-semibold text-[#0f172a]">{proj.launch}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                       <span className="text-[0.65rem] font-bold text-[#94a3b8] uppercase tracking-wider mb-0.5">Starting From</span>
                       <div className="text-[1.35rem] font-bold text-[#0f172a] tracking-tight">{proj.price}</div>
                    </div>
                    <button className="h-[46px] px-6 rounded-xl bg-[#0f172a] text-white text-[0.85rem] font-bold cursor-pointer transition-all hover:bg-amber-600 hover:shadow-[0_8px_20px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95">
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-[80px] text-center bg-white rounded-[32px] border border-dashed border-[#e2e8f0] shadow-sm">
            <div className="text-[4rem] mb-6 animate-bounce">🏗️</div>
            <h3 className="text-[1.75rem] font-semibold text-[#0f172a] mb-2">No projects found</h3>
            <p className="text-[#64748b] text-[1.1rem] mb-8 max-w-[400px] mx-auto leading-relaxed">Try searching for a different developer, location or project name.</p>
            <button 
              className="h-[52px] px-8 rounded-full bg-[#0f172a] text-white text-[1rem] font-bold cursor-pointer transition-all hover:bg-amber-600 hover:shadow-lg" 
              onClick={() => setSearchQuery('')}
            >
              See All Projects
            </button>
          </div>
        )}
      </div>

      <section className="mt-24">
        <div className="max-w-[1350px] mx-auto px-[22px]">
          <div className="bg-[#0f172a] rounded-[40px] p-16 flex justify-between items-center gap-12 relative overflow-hidden max-lg:flex-col max-lg:text-center max-lg:p-10">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="flex-1 relative z-10">
              <h2 className="text-[2rem] font-semibold text-white mb-4 leading-tight">Get Pre-Launch Alerts</h2>
              <p className="text-[1.1rem] text-white/70 max-w-[500px] leading-relaxed max-lg:mx-auto">Sign up to receive immediate notifications when new projects are announced in your preferred cities.</p>
            </div>
            <button className="h-[64px] px-10 rounded-2xl bg-amber-600 text-white text-[1.1rem] font-bold flex items-center gap-2.5 cursor-pointer transition-all hover:bg-white hover:text-amber-600 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 relative z-10 active:scale-95">
              Subscribe for Alerts <ArrowR className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingProjectsPage;
