import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

// mobx
import {Provider} from 'mobx-react'
import store from './store'

import 'animate.css'

// antd
import 'antd/dist/antd.css';

// 全局样式
import '@/assets/less/global.less'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  (
    <Provider {...store}>
      <App />
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
