import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import ProviderView from './ProviderView'

document.write('<div id="bo-app"/>')

ReactDOM.render(<ProviderView/>, document.getElementById('bo-app'))


