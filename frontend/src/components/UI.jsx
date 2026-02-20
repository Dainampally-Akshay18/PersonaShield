import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-sky-400 text-black hover:bg-sky-300 shadow-lg shadow-sky-500/20',
        secondary: 'bg-slate-800 text-slate-50 hover:bg-slate-700 border border-slate-700',
        outline: 'bg-transparent text-slate-50 border border-slate-700 hover:bg-slate-800/50',
        ghost: 'bg-transparent text-slate-100 hover:bg-slate-800/50 hover:text-white',
        danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const Card = ({ children, className = '', hover = false }) => {
    return (
        <div className={`
      rounded-xl border border-white/10 bg-black/40 backdrop-blur-md 
      shadow-lg shadow-black/40 overflow-hidden
      ${hover ? 'hover:border-white/20 hover:bg-black/60 transition-all duration-300' : ''} 
      ${className}
    `}>
            {children}
        </div>
    );
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-slate-800 text-slate-100 border-slate-700',
        primary: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
        success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        danger: 'bg-red-500/10 text-red-300 border-red-500/20'
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export const Input = ({ label, className = '', ...props }) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && (
                <label className="text-xs font-bold uppercase tracking-widest text-slate-300 ml-1">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm 
          text-slate-100 placeholder:text-slate-600 outline-none focus:border-cyan-500/50 
          focus:ring-1 focus:ring-cyan-500/50 transition-all duration-200
          ${className}
        `}
                {...props}
            />
        </div>
    );
};

export const TypewriterText = ({ text, delay = 100, holdTime = 2000, eraseDelay = 50, className = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;

        if (!isDeleting) {
            if (displayText.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayText(text.slice(0, displayText.length + 1));
                }, delay);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, holdTime);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(text.slice(0, displayText.length - 1));
                }, eraseDelay);
            } else {
                setIsDeleting(false);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, text, delay, holdTime, eraseDelay]);

    return (
        <span className={`inline-flex items-center ${className}`}>
            {displayText}
            <span className="w-[4px] h-[1em] bg-cyan-500 ml-1 animate-blink" />
        </span>
    );
};
