import "./styles.scss";

export default function Input({
    value,
    onChange,
    id,
    name,
    label,
    placeholder
}) {
    return (
        <div className="cinput__container">
            <label htmlFor={id}>
                {label}
                <span className="cinput__container__star">
                    *
                </span>
            </label>
            <input type="text"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min
            />
        </div>
    );
}