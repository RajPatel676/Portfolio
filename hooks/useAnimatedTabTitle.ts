import { useEffect, useRef } from 'react';

const loopPhrases = [
    "I turn ideas →",
    "I turn ideas → products",
    "products → scalable",
    "scalable → Web, AI & Web3"
];

const inactivePhrases = [
    "Still there?",
    "Any questions?"
];

export function useAnimatedTabTitle() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // State refs (to avoid re-renders)
    const phraseIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);
    const inactiveIndexRef = useRef(0);
    const originalTitleRef = useRef("");

    useEffect(() => {
        // Configuration
        const typeSpeed = 150;      // ms per char
        const deleteSpeed = 80;     // ms per char (if we deleted, but we might just truncated-switch)
        const pauseDelay = 1000;    // Pause after phrase complete

        // NOTE: The request asks to "Clear title before next phrase".
        // We can simulate this by deleting or just restarting typing.
        // "TextEffect inspired" often implies typing out.
        // The sequence suggests forward progression.

        const loop = () => {
            const currentPhrase = loopPhrases[phraseIndexRef.current];
            const isDeleting = isDeletingRef.current;
            const charIndex = charIndexRef.current;

            // Update browser title
            document.title = currentPhrase.substring(0, charIndex);

            let nextSpeed = typeSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Finished typing -> Pause
                nextSpeed = pauseDelay;
                isDeletingRef.current = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting -> Next Phrase
                isDeletingRef.current = false;
                phraseIndexRef.current = (phraseIndexRef.current + 1) % loopPhrases.length;
                nextSpeed = 500; // Unspecified small pause before next start
            } else {
                // Typing or Deleting
                charIndexRef.current = isDeleting ? charIndex - 1 : charIndex + 1;
                nextSpeed = isDeleting ? deleteSpeed : typeSpeed;
            }

            timeoutRef.current = setTimeout(loop, nextSpeed);
        };

        const startAnimation = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            // Reset
            phraseIndexRef.current = 0;
            charIndexRef.current = 0;
            isDeletingRef.current = false;
            loop();
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Inactive: Stop and Show Message
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                document.title = inactivePhrases[inactiveIndexRef.current];
                // Cycle next inactive message for next time
                inactiveIndexRef.current = (inactiveIndexRef.current + 1) % inactivePhrases.length;
            } else {
                // Active: Restart
                startAnimation();
            }
        };

        // Initialize
        if (!document.hidden) {
            startAnimation();
        }

        window.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            // Optional: Restore original title? 
            // document.title = originalTitleRef.current; 
            // User didn't ask for restore, and usually SPAs takeover title.
        };
    }, []);
}
