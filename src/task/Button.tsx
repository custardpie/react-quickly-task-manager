type ButtonProps = {
    action : string,
    icon : string
}

function Button({action, icon} : Readonly<ButtonProps>) {
    return (
        <button className="icon-button">
            <img src={`icons/${icon}.svg`} alt={action} />
        </button>
    )
}

export default Button;