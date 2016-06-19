import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    willTransition: function(transition) {
      var ret = this._super.apply(this, arguments);
      var resetScroll = this.get('resetScroll');

      // default is opt-in since it's a mixin, set to false to explicitly opt-out
      if (resetScroll === false) {
        return ret;

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
      
      return ret;
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
