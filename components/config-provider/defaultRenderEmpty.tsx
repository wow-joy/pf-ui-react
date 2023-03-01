import React, { useContext } from 'react';
import { ConfigContext } from '.';
import type { ConfigConsumerProps } from '.';
import Empty from '../empty';

interface EmptyProps {
  componentName?: string;
  description?: React.ReactNode;
}

const DefaultRenderEmpty: React.FC<EmptyProps> = (props) => {
  const { componentName, description } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefix = getPrefixCls('empty');
  console.log('description def', description);
  switch (componentName) {
    case 'Table':
    case 'List':
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />;
    case 'Select':
    case 'TreeSelect':
    case 'Cascader':
    case 'Transfer':
    case 'Mentions':
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_INFO}
          description={description}
          className={`${prefix}-small`}
        />
      );
    /* istanbul ignore next */
    default:
      // Should never hit if we take all the component into consider.
      return <Empty description={description} />;
  }
};

export type RenderEmptyHandler = (componentName?: string) => React.ReactNode;

export default DefaultRenderEmpty;
