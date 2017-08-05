import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    NotFound,
    Search
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Search}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
