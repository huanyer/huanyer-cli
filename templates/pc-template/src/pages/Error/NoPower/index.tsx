import React from 'react';
import './index.less';
interface IProps {
  content?: string;
}
const NoPower: React.FC<IProps> = ({ content }) => {
  return (
    <div className='page-noPower'>
      <div>
        <img
          src='https://gw.alicdn.com/tfs/TB1cIRM4Lb2gK0jSZK9XXaEgFXa-200-200.png'
          alt='401'
        />
        <div className='text'>{content || '请联系管理员开通权限'}</div>
      </div>
    </div>
  );
};

export default NoPower;
