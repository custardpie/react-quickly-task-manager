type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    action : string,
    icon : string
}

function Button({ action, icon, ...rest }: ButtonProps) {
    return (
        <button className="icon-button" {...rest}>
            <img src={`icons/${icon}.svg`} alt={action} />
        </button>
    );
}

export default Button;