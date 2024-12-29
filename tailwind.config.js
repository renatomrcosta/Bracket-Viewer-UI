/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            keyframes: {
                'soft-blink': {
                    '0%, 100%': {opacity: '1'},
                    '50%': {opacity: '0.5'}
                },
                'fade-out': {
                    '0%': {
                        opacity: '1',
                        transform: 'scale(1)'
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'scale(0.95)'
                    }
                }
            },
            animation: {
                'soft-blink': 'soft-blink 1s ease-in-out',
                'fade-out': 'fade-out 0.5s ease-out forwards'
            }
        },
    },
    plugins: [],
};