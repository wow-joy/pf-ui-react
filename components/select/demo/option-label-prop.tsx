import React from 'react';
import { Select, Space } from 'antd';

const { Option } = Select;

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="select one country"
    defaultValue={['china']}
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="china" label="China">
      <Space>
        <span role="img" aria-label="China">
          π¨π³
        </span>
        China (δΈ­ε½)
      </Space>
    </Option>
    <Option value="usa" label="USA">
      <Space>
        <span role="img" aria-label="USA">
          πΊπΈ
        </span>
        USA (ηΎε½)
      </Space>
    </Option>
    <Option value="japan" label="Japan">
      <Space>
        <span role="img" aria-label="Japan">
          π―π΅
        </span>
        Japan (ζ₯ζ¬)
      </Space>
    </Option>
    <Option value="korea" label="Korea">
      <Space>
        <span role="img" aria-label="Korea">
          π°π·
        </span>
        Korea (ι©ε½)
      </Space>
    </Option>
  </Select>
);

export default App;
