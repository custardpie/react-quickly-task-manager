import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: string;
    label: string;
    className?: string;
};

function Button({ className = "", icon, label, ...rest }: Readonly<ButtonProps>) {
    return (
        <button className={`icon-button ${className}`} {...rest}>
            <img draggable={false} src={`icons/${icon}.svg`} alt={label} />
        </button>
    );
}

export default Button;