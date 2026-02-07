type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string,
    label : string,
    icon : string
}

function Button({ className = "", label, icon, ...rest }: ButtonProps) {
    return (
        <button className={`icon-button ${className}`} {...rest}>
            <img src={`icons/${icon}.svg`} alt={label} />
        </button>
    );
}

export default Button;