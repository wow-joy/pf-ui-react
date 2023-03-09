import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <Pagination total={85} showSizeChanger showQuickJumper showTotal={(total) => `总共${total}条`} />
);

export default App;
