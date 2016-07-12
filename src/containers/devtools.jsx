import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-q"
               changePositionKey="ctrl-e">
  <FilterMonitor blacklist={['DUMP_STATE']}>
    <LogMonitor theme="tomorrow" />
  </FilterMonitor>
  </DockMonitor>
);