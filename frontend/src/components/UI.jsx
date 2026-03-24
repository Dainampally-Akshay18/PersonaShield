import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 shadow-md',
        secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300',
        outline: 'bg-transparent text-slate-800 border border-slate-300 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
        danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
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
      rounded-xl border border-slate-200 bg-slate-50 
      shadow-sm overflow-hidden
      ${hover ? 'hover:border-slate-300 hover:bg-white hover:shadow-md transition-all duration-200' : ''} 
      ${className}
    `}>
            {children}
        </div>
    );
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-slate-100 text-slate-700 border-slate-300',
        primary: 'bg-blue-50 text-blue-700 border-blue-200',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        warning: 'bg-amber-50 text-amber-700 border-amber-200',
        danger: 'bg-red-50 text-red-700 border-red-200'
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
                <label className="text-xs font-bold uppercase tracking-widest text-slate-600 ml-1">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm 
          text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 
          focus:ring-1 focus:ring-blue-200 transition-all duration-150
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
            <span className="w-[4px] h-[1em] bg-blue-600 ml-1 opacity-50" />
        </span>
    );
};
