import { useState, useEffect } from 'react';

export function useCardAnimation(isNew: boolean, isLeaving: boolean) {
    const [animationState, setAnimationState] = useState({
        isVisible: false,
        isBlinking: isNew,
    });

    useEffect(() => {
        if (isNew) {
            setAnimationState({ isVisible: true, isBlinking: true });
            const blinkTimer = setTimeout(() => {
                setAnimationState(prev => ({ ...prev, isBlinking: false }));
            }, 1000); // Duration of blink effect
            return () => clearTimeout(blinkTimer);
        }
    }, [isNew]);

    useEffect(() => {
        if (!isLeaving) {
            setAnimationState(prev => ({ ...prev, isVisible: true }));
        }
    }, [isLeaving]);

    return animationState;
}