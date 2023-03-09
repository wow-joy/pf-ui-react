import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

const style = {
  marginBottom: 12,
};

const App: React.FC = () => (
  <>
    <Pagination size="default" total={50} style={style} />
    <Pagination size="default" total={50} showSizeChanger showQuickJumper style={style} />
    <Pagination size="default" total={50} showTotal={showTotal} style={style} />
    <Pagination
      size="default"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />
  </>
);

export default App;
