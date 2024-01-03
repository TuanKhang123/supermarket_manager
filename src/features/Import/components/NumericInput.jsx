import { Input } from "antd";
import { forwardRef } from "react";

const NumericInput = forwardRef((props, ref) => {
    const { value, onChange, onBlur} = props;
    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
            onChange(inputValue);
        }
    };

    // "." at the end or only "-" in the input box.
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === "." || value === "-") {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, "$1"));
        onBlur();
    };
    return (
        <Input
            {...props}
            ref={ref}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Input a number"
            maxLength={16}
        />
    );
});

export default NumericInput;