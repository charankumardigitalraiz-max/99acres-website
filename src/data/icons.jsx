// Shared inline SVG icon components
export const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const SearchIco = () => <Ic d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
export const PinIco = () => <Ic d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />;
export const LocIco = () => <Ic d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" size={14} />;
export const BedIco = () => <Ic d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 14h18M5 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />;
export const BathIco = () => <Ic d="M3 7h18M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" />;
export const AreaIco = () => <Ic d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />;
export const ArrowR = () => <Ic d="M5 12h14M12 5l7 7-7 7" size={14} />;
export const LoaderIco = () => <Ic d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" size={14} />;

export const MenuIco = () => <Ic d="M4 6h16M4 12h16M4 18h16" />;
export const CloseIco = () => <Ic d="M18 6L6 18M6 6l12 12" />;
export const ChevronL = () => <Ic d="M15 18l-6-6 6-6" size={18} />;
export const ChevronR = () => <Ic d="M9 18l6-6-6-6" size={18} />;

export const LogoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" strokeWidth="0">
    <path d="M3 21V8l9-6 9 6v13H14v-6h-4v6H3z" />
  </svg>
);
