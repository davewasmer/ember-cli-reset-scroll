# ember-cli-reset-scroll

Resets the browser window scroll position when a route transitions:

```js
import Ember from 'ember';
import ResetScrollMixin from 'ember-cli-reset-scroll';

export default Ember.Route.extend(ResetScrollMixin, {

  // Scrolls to top
  resetScroll: undefined

  // Scroll to a specific position (in px)
  resetScroll: 20

  // Scroll to a specific position based on the route name (in px)
  resetScroll: {
    'books.index': 30,
    'authors.*': 210
  }

});
```
