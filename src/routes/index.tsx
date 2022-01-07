import { Route, Switch } from 'react-router-dom';

import { Questions } from '../pages/Questions';
import { Home } from '../pages/Home';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/quiz" component={Questions} />
    </Switch>
  );
}
