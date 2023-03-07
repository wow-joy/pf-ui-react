import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: '确定删除?',
    icon: <ExclamationCircleFilled />,
    content: '描述',
    closable: true,
    onOk() {
      console.log('确定');
    },
    onCancel() {
      console.log('取消');
    },
    centered: true,
  });
};
const showConfirmInfo = () => {
  confirm({
    title: '确定删除?',
    content: 'showConfirmInfo',
    closable: true,
    onOk() {
      console.log('确定');
    },
    onCancel() {
      console.log('取消');
    },
    centered: true,
    type: 'infoOutline',
  });
};

const showPromiseConfirm = () => {
  confirm({
    title: 'Do you want to delete these items?',
    icon: <ExclamationCircleFilled />,
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
    centered: true,
  });
};

const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
    centered: true,
  });
};

const showPropsConfirm = () => {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      disabled: true,
    },
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
    centered: true,
  });
};

const App: React.FC = () => (
  <Space wrap>
    <Button onClick={showConfirm}>Confirm</Button>
    <Button onClick={showConfirmInfo}>showConfirmInfo</Button>

    <Button onClick={showPromiseConfirm}>With promise</Button>
    <Button onClick={showDeleteConfirm} type="dashed">
      Delete
    </Button>
    <Button onClick={showPropsConfirm} type="dashed">
      With extra props
    </Button>
  </Space>
);

export default App;
