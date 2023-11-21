import "./styles.scss";
import img from "../../../../images/upload.png";

import React from "react";

export default function Uploader({
    id,
    name,
    value,
    onChange,
    label,
    description,
    className
}) {
    const [data, setData] = React.useState(null);

    const onChanged = (event) => {
        if (data !== null) {
            URL.revokeObjectURL(data.url);
        }
        const files = event.target.files;
        if (event.target.files != 0) {
            const url = URL.createObjectURL(files[0]);
            setData(_ => ({
                file: files[0],
                url: url,
            }));
            onChange && onChange(files);
        }
    }

    return (
        <div className={`cuploader__wrapper ${className ?? ""}`}>

            <label className="fake_label">
                {label}
                <span className="fake_label__star">*</span>
            </label>
            {
                data === null ? <label htmlFor={id} className="real_label">
                    <img src={img} alt="earthquake" />
                    <h2>Tải ảnh lên</h2>
                </label>
                    : <div className="alternative_layout">
                        <h2>{data.file.name}</h2>
                        <div className="group">
                            <label className="replace" htmlFor={id}>Replace</label>
                            <a className="preview" href={data.url} target="_blank">Preview</a>
                        </div>
                    </div>
            }
            <p className="description">{description}</p>
            <input
                type="file"
                name={name}
                id={id}
                value={value}
                onChange={onChanged}
                accept="image/*"
            />
        </div>
    );
}