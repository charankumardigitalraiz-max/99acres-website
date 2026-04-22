import { useState, useEffect, useRef } from 'react';

export default function FloatingVideo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 250, y: window.innerHeight - 400 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ offsetStartX: 0, offsetStartY: 0 });

  // ─── DRAGGING LOGIC ───
  const handleMouseDown = (e) => {
    if (isCollapsed) return; // Disable dragging when closed

    // Only drag from the badge or header area
    if (e.target.closest('.v-badge') || e.target.closest('.v-drag-handle')) {
      setIsDragging(true);
      dragRef.current = {
        offsetStartX: e.clientX - position.x,
        offsetStartY: e.clientY - position.y,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newX = e.clientX - dragRef.current.offsetStartX;
      const newY = e.clientY - dragRef.current.offsetStartY;

      const width = isExpanded ? 700 : 220;
      const height = isExpanded ? 420 : 180;

      // Basic bounds check with margin
      const boundedX = Math.max(20, Math.min(newX, window.innerWidth - width - 20));
      const boundedY = Math.max(20, Math.min(newY, window.innerHeight - height - 20));

      setPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isExpanded]);

  // Handle auto-positioning on resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 200),
        y: Math.min(prev.y, window.innerHeight - 400)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`fixed z-[9999] bg-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-4 border-white/10 transition-[width,height,border-radius] duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] flex flex-col hidden md:flex
        ${isCollapsed ? 'w-[60px] h-[60px] rounded-[30px_0_0_30px] bg-amber-500 border-none items-center justify-center cursor-pointer shadow-[-4px_8px_20px_rgba(245,158,11,0.4)] hover:scale-110' : 
          isExpanded ? 'w-[700px] h-[420px] rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-white/20' : 
          'w-[220px] h-[360px] rounded-[16px]'
        } 
        ${isDragging ? 'opacity-90 cursor-grabbing' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
    >
      {/* Drag Handle & Controls */}
      <div className={`flex items-center justify-between p-[10px_16px] bg-slate-900/90 backdrop-blur-[8px] z-10 select-none cursor-grab v-drag-handle
        ${isCollapsed ? 'bg-transparent p-0 w-full h-full justify-center' : ''}
      `}>
        <div className={`bg-amber-500 text-white text-[0.65rem] font-bold px-2 py-[2px] rounded-[4px] uppercase tracking-wider v-badge ${isCollapsed ? 'hidden' : ''}`}>Live Tour</div>
        <div className={`flex items-center gap-2 ${isCollapsed ? 'w-full h-full' : ''}`}>
          {!isCollapsed && (
            <button 
              className="w-7 h-7 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/20 hover:scale-110"
              onClick={() => {
                const nextExpanded = !isExpanded;
                setIsExpanded(nextExpanded);
                if (nextExpanded) {
                  // Ensure expanded version doesn't overflow right edge
                  setPosition(prev => ({
                    ...prev,
                    x: Math.min(prev.x, window.innerWidth - 720)
                  }));
                }
              }} 
              title={isExpanded ? "Shrink" : "Maximize"}
            >
              {isExpanded ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /></svg>
              )}
            </button>
          )}
          <button
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer 
              ${isCollapsed ? 'w-full h-full bg-transparent border-none' : 'bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:scale-110'}
            `}
            onClick={() => {
              const nextCollapsed = !isCollapsed;
              setIsCollapsed(nextCollapsed);
              if (nextCollapsed) {
                // Snap to right edge when collapsing
                setPosition(prev => ({ ...prev, x: window.innerWidth - 65, y: window.innerHeight - 100 }));
              } else {
                // When opening, pull it back from the edge so it doesn't overflow
                setPosition(prev => ({
                  ...prev,
                  x: Math.min(prev.x, window.innerWidth - 280),
                  y: Math.min(prev.y, window.innerHeight - 400)
                }));
              }
              if (isExpanded) setIsExpanded(false);
            }}
            title={isCollapsed ? "Open" : "Collapse"}
          >
            {isCollapsed ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="flex-1 w-full h-full bg-black relative">
          <iframe
            src={`https://www.youtube.com/embed/rutCVOOj4KQ?si=3hwKPNKE2VpmYCXj&autoplay=1&mute=1&loop=1&playlist=rutCVOOj4KQ&controls=${isExpanded ? 1 : 0}&modestbranding=1&rel=0`}
            title="Vertical Property Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={`w-full h-full border-none ${!isExpanded ? 'pointer-events-none' : ''}`}
          />
        </div>
      )}
    </div>
  );
}
