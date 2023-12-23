import "./styles.scss";

export default function Button({
    className,
    onClick,
    children,
}) {
    return (
        <div className={`cbutton_wrapper ${className ?? ""}`} onClick={onClick}>
            {children}
        </div>
    );
}