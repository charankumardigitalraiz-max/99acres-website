/**
 * shareProperty — Global share utility
 *
 * Uses the native Web Share API on mobile (Android / iOS share sheet).
 * Falls back to copying the URL to the clipboard on desktop.
 *
 * @param {Object} property  - The property object ({ title, price, loc })
 * @param {Function} setCopied - State setter to show ✅ feedback on desktop
 */
export async function shareProperty(property, setCopied) {
  const shareData = {
    title: property.title,
    text: `Check out this property: ${property.title} — ${property.price} in ${property.loc}`,
    url: window.location.href,
  };

  if (navigator.share) {
    // Native share sheet (mobile / modern browsers)
    try {
      await navigator.share(shareData);
    } catch (_) {
      // User dismissed — no action needed
    }
  } else {
    // Desktop fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      console.warn('Clipboard write failed');
    }
  }
}
