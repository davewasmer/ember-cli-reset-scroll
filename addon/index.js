import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    willTransition: function(transition) {
      this._super();
      var resetScroll = this.get('resetScroll');

      // default is opt-in since it's a mixin, set to false to explicitly opt-out
      if (resetScroll === false) {
        return;

      // scroll to a specific position
      } else if (Ember.typeOf(resetScroll) === 'number') {
        scrollToPosition(resetScroll);

      // scroll to a specific position based on the route name
      } else if (Ember.typeOf(resetScroll) === 'object') {
        resetScroll.find(function(position, routePattern) {
          if (matches(routePattern, transition.targetName)) {
            scrollToPosition(position);
            return true;
          }
        });

      // scroll to top
      } else {
        scrollToPosition(0);
      }
    }
  }
});

function matches(pattern, routeName) {
  var escaped = pattern
    .replace(/\./g, '\.')
    .replace(/\*/g, '[^\.]+');
  var regex = new RegExp(escaped);
  return routeName.match(regex);
}

function scrollToPosition(position) {
  if (Ember.$(document).scrollTop() > position) {
    window.scrollTo(0, position);
  }
}
