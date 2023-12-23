import "./styles.scss";
import Input from "./components/Input";
// import Uploader from "./components/Uploader";
import InputArea from "./components/InputArea";
import Button from "./components/Button";
import { Pie } from '@ant-design/plots';

export default function Import() {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: 'AntV\nG2Plot',
            },
        },
    };
    return (
        <div className="import__wrapper">
            {/* <div className="import__card">
                <h2 className="import__title">
                    Inventory receiving detail
                </h2>
            </div>
            <div style={{ width: "70%" }} className="import__card">
                <h4 className="import__field__title">Receiving time <span>*</span></h4>

            </div> */}
            <Pie {...config} />
        </div>
    );
}