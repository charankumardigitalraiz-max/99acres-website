
import { useState, useEffect, useRef } from 'react';
import './FloatingVideo.css';

export default function FloatingVideo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 300, y: window.innerHeight - 250 });
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

      // Basic bounds check
      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - (isExpanded ? 600 : 250)));
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - (isExpanded ? 400 : 180)));

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
        x: Math.min(prev.x, window.innerWidth - 300),
        y: Math.min(prev.y, window.innerHeight - 250)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`floating-video-v2 ${isCollapsed ? 'collapsed' : ''} ${isExpanded ? 'expanded' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
    >
      {/* Drag Handle & Controls */}
      <div className="v-header-v2 v-drag-handle">
        <div className="v-badge">Live Tour</div>
        <div className="v-controls-v2">
          {!isCollapsed && (
            <button className="v-btn-v2" onClick={() => setIsExpanded(!isExpanded)} title={isExpanded ? "Shrink" : "Maximize"}>
              {isExpanded ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /></svg>
              )}
            </button>
          )}
          <button
            className="v-btn-v2"
            onClick={() => {
              const nextCollapsed = !isCollapsed;
              setIsCollapsed(nextCollapsed);
              if (nextCollapsed) {
                // Snap to right edge when collapsing
                setPosition(prev => ({ ...prev, x: window.innerWidth - 65 }));
              }
              if (isExpanded) setIsExpanded(false);
            }}
            title={isCollapsed ? "Open" : "Collapse"}
          >
            {isCollapsed ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="v-body-v2">
          <iframe
            src={`https://www.youtube.com/embed/ec_fXMrD7Ow?autoplay=1&mute=1&loop=1&playlist=ec_fXMrD7Ow&controls=${isExpanded ? 1 : 0}&modestbranding=1&rel=0`}
            title="Draggable Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="v-iframe-v2"
          />
        </div>
      )}
    </div>
  );
}
