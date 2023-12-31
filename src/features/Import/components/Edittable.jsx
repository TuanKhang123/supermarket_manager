import React, { useContext, useEffect, useRef, useState } from "react";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, categories, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={{form, categories}}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    required,
    type,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const {form, categories} = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {
                    type === "num"
                        ? <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
                        : type === "date"
                            ? <DatePicker ref={inputRef} onBlur={save} onChange={save} format="DD/MM/YYYY" />
                            : type === "select"
                                ? <Select
                                    ref={inputRef}
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={save}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                                    options={categories.map((v, i) => ({
                                        value: v.id,
                                        label: v.name,
                                    }))}
                                />
                                : <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                }

            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
}

export { EditableRow, EditableCell };