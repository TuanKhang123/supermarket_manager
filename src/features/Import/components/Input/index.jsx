import "./styles.scss";

export default function Input({
    value,
    onChange,
    id,
    name,
    placeholder
}) {
    return <input className="cinput" type="text"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min
    />;
}