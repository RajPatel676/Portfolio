'use client';

import { useEffect, useRef } from 'react';

export function DynamicTitle() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const activePhrases = [
        "An idea…",
        "An idea → Code",
        "Code → Product"
    ];

    const inactiveMessages = [
        "Any questions?",
        "Still there?",
        "Need help with something?"
    ];

    // State refs 
    const phraseIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);
    const inactiveIndexRef = useRef(0);

    useEffect(() => {
        // Timing configuration (ms)
        const typeSpeed = 180;   // Slow, deliberate typing
        const deleteSpeed = 80;  // Smooth clearing
        const pauseDelay = 2000; // Pause after full phrase
        const startDelay = 500;  // Pause before typing next phrase

        const loop = () => {
            const currentPhrase = activePhrases[phraseIndexRef.current];
            const isDeleting = isDeletingRef.current;
            const charIndex = charIndexRef.current;

            // Update Title
            document.title = currentPhrase.substring(0, charIndex);

            // Determine next step
            let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Finished typing phrase -> Pause
                nextSpeed = pauseDelay;
                isDeletingRef.current = true; // Switch to deleting
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting -> Move to next phrase
                isDeletingRef.current = false;
                phraseIndexRef.current = (phraseIndexRef.current + 1) % activePhrases.length;
                nextSpeed = startDelay; // Brief pause before starting next
            } else {
                // Continue typing or deleting
                charIndexRef.current = isDeleting ? charIndex - 1 : charIndex + 1;
            }

            timeoutRef.current = setTimeout(loop, nextSpeed);
        };

        const startTyping = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            // Reset state to start fresh
            phraseIndexRef.current = 0;
            charIndexRef.current = 0;
            isDeletingRef.current = false;
            loop();
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Stop animation
                if (timeoutRef.current) clearTimeout(timeoutRef.current);

                // Show friendly message
                document.title = inactiveMessages[inactiveIndexRef.current];

                // Prepare next friendly message
                inactiveIndexRef.current = (inactiveIndexRef.current + 1) % inactiveMessages.length;
            } else {
                // User returned -> Restart story
                startTyping();
            }
        };

        // Initial Start
        if (!document.hidden) {
            startTyping();
        } else {
            // Fallback if loaded in background (though mostly won't be seen)
            document.title = activePhrases[0];
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return null;
}
