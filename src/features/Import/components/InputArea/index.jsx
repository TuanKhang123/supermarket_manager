import "./styles.scss";

export default function InputArea({
    value,
    onChange,
    id,
    name,
    label,
    placeholder,
    className,
}) {
    return (
        <div className={`cinput_area_wrapper ${className ?? ""}`}>
            <label htmlFor={id}>
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                rows={3}
            />
        </div>
    );
}