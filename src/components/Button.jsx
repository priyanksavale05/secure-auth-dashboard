import { Loader } from "./Loader";

export const Button = ({ 
    children, 
    onClick, 
    type = "button", 
    variant = "primary", 
    isLoading = false, 
    disabled = false,
    className = "",
    ...props 
}) => {
    const baseStyles = "w-full flex items-center justify-center gap-3 font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed";
    
    // Variant mapping
    const variants = {
        primary: "bg-[#2f8d46] hover:bg-[#257338] text-white",
        secondary: "bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200",
        danger: "bg-red-500 hover:bg-red-600 text-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {isLoading ? <Loader size={20} className={variant === 'secondary' ? 'text-gray-600 dark:text-gray-300' : 'text-white'} /> : children}
        </button>
    );
};
