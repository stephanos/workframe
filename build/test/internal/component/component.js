'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _uuid = require('../util/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const metaKey = '__meta';

let Component = class Component {

  constructor(Factory) {
    if (!_util2.default.isFunction(Factory)) {
      throw new Error(`'${ Factory }' is not a function`);
    }

    this.factory = Factory;
    this.factory[metaKey] = this.factory[metaKey] || {
      id: _uuid2.default.next(),
      dependencies: {}
    };
  }

  newInstance() {
    return new this.factory(this.opts);
  }

  get id() {
    return this.factory[metaKey].id;
  }

  set id(id) {
    this.factory[metaKey].id = id;
  }

  get opts() {
    return this.factory[metaKey].opts;
  }

  set opts(opts) {
    this.factory[metaKey].opts = opts;
  }

  get name() {
    return this.factory[metaKey].name;
  }

  set name(name) {
    this.factory[metaKey].name = name;
  }

  get type() {
    return this.factory[metaKey].type;
  }

  set type(type) {
    this.factory[metaKey].type = type;
  }

  get dependencies() {
    return this.factory[metaKey].dependencies;
  }

  addDependency(property, factory) {
    const deps = this.factory[metaKey].dependencies;
    if (deps[property]) {
      throw new Error(`${ property } already exists`);
    }
    deps[property] = new Component(factory);
  }
};
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC9jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLE1BQU0sVUFBVSxRQUFWOztJQUdBLFlBQU4sTUFBTSxTQUFOLENBQWdCOztBQUVkLGNBQVksT0FBWixFQUFxQjtBQUNuQixRQUFJLENBQUMsZUFBSyxVQUFMLENBQWdCLE9BQWhCLENBQUQsRUFBMkI7QUFDN0IsWUFBTSxJQUFJLEtBQUosQ0FBVSxDQUFDLENBQUQsR0FBSSxPQUFKLEVBQVksbUJBQVosQ0FBVixDQUFOLENBRDZCO0tBQS9COztBQUlBLFNBQUssT0FBTCxHQUFlLE9BQWYsQ0FMbUI7QUFNbkIsU0FBSyxPQUFMLENBQWEsT0FBYixJQUF3QixLQUFLLE9BQUwsQ0FBYSxPQUFiLEtBQXlCO0FBQy9DLFVBQUksZUFBSyxJQUFMLEVBQUo7QUFDQSxvQkFBYyxFQUFkO0tBRnNCLENBTkw7R0FBckI7O0FBYUEsZ0JBQWM7QUFDWixXQUFPLElBQUksS0FBSyxPQUFMLENBQWEsS0FBSyxJQUFMLENBQXhCLENBRFk7R0FBZDs7QUFLQSxNQUFJLEVBQUosR0FBUztBQUNQLFdBQU8sS0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQixFQUF0QixDQURBO0dBQVQ7O0FBSUEsTUFBSSxFQUFKLENBQU8sRUFBUCxFQUFXO0FBQ1QsU0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQixFQUF0QixHQUEyQixFQUEzQixDQURTO0dBQVg7O0FBS0EsTUFBSSxJQUFKLEdBQVc7QUFDVCxXQUFPLEtBQUssT0FBTCxDQUFhLE9BQWIsRUFBc0IsSUFBdEIsQ0FERTtHQUFYOztBQUlBLE1BQUksSUFBSixDQUFTLElBQVQsRUFBZTtBQUNiLFNBQUssT0FBTCxDQUFhLE9BQWIsRUFBc0IsSUFBdEIsR0FBNkIsSUFBN0IsQ0FEYTtHQUFmOztBQUtBLE1BQUksSUFBSixHQUFXO0FBQ1QsV0FBTyxLQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLElBQXRCLENBREU7R0FBWDs7QUFJQSxNQUFJLElBQUosQ0FBUyxJQUFULEVBQWU7QUFDYixTQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLElBQXRCLEdBQTZCLElBQTdCLENBRGE7R0FBZjs7QUFLQSxNQUFJLElBQUosR0FBVztBQUNULFdBQU8sS0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQixJQUF0QixDQURFO0dBQVg7O0FBSUEsTUFBSSxJQUFKLENBQVMsSUFBVCxFQUFlO0FBQ2IsU0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQixJQUF0QixHQUE2QixJQUE3QixDQURhO0dBQWY7O0FBS0EsTUFBSSxZQUFKLEdBQW1CO0FBQ2pCLFdBQU8sS0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQixZQUF0QixDQURVO0dBQW5COztBQUlBLGdCQUFjLFFBQWQsRUFBd0IsT0FBeEIsRUFBaUM7QUFDL0IsVUFBTSxPQUFPLEtBQUssT0FBTCxDQUFhLE9BQWIsRUFBc0IsWUFBdEIsQ0FEa0I7QUFFL0IsUUFBSSxLQUFLLFFBQUwsQ0FBSixFQUFvQjtBQUNsQixZQUFNLElBQUksS0FBSixDQUFVLENBQUMsR0FBRSxRQUFILEVBQVksZUFBWixDQUFWLENBQU4sQ0FEa0I7S0FBcEI7QUFHQSxTQUFLLFFBQUwsSUFBaUIsSUFBSSxTQUFKLENBQWMsT0FBZCxDQUFqQixDQUwrQjtHQUFqQztDQTVERjtrQkFzRWUiLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L2NvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vdXRpbC91dWlkJztcblxuY29uc3QgbWV0YUtleSA9ICdfX21ldGEnO1xuXG5cbmNsYXNzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoRmFjdG9yeSkge1xuICAgIGlmICghdXRpbC5pc0Z1bmN0aW9uKEZhY3RvcnkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke0ZhY3Rvcnl9JyBpcyBub3QgYSBmdW5jdGlvbmApO1xuICAgIH1cblxuICAgIHRoaXMuZmFjdG9yeSA9IEZhY3Rvcnk7XG4gICAgdGhpcy5mYWN0b3J5W21ldGFLZXldID0gdGhpcy5mYWN0b3J5W21ldGFLZXldIHx8IHtcbiAgICAgIGlkOiB1dWlkLm5leHQoKSxcbiAgICAgIGRlcGVuZGVuY2llczoge30sXG4gICAgfTtcbiAgfVxuXG5cbiAgbmV3SW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmZhY3RvcnkodGhpcy5vcHRzKTtcbiAgfVxuXG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLmZhY3RvcnlbbWV0YUtleV0uaWQ7XG4gIH1cblxuICBzZXQgaWQoaWQpIHtcbiAgICB0aGlzLmZhY3RvcnlbbWV0YUtleV0uaWQgPSBpZDtcbiAgfVxuXG5cbiAgZ2V0IG9wdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjdG9yeVttZXRhS2V5XS5vcHRzO1xuICB9XG5cbiAgc2V0IG9wdHMob3B0cykge1xuICAgIHRoaXMuZmFjdG9yeVttZXRhS2V5XS5vcHRzID0gb3B0cztcbiAgfVxuXG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjdG9yeVttZXRhS2V5XS5uYW1lO1xuICB9XG5cbiAgc2V0IG5hbWUobmFtZSkge1xuICAgIHRoaXMuZmFjdG9yeVttZXRhS2V5XS5uYW1lID0gbmFtZTtcbiAgfVxuXG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjdG9yeVttZXRhS2V5XS50eXBlO1xuICB9XG5cbiAgc2V0IHR5cGUodHlwZSkge1xuICAgIHRoaXMuZmFjdG9yeVttZXRhS2V5XS50eXBlID0gdHlwZTtcbiAgfVxuXG5cbiAgZ2V0IGRlcGVuZGVuY2llcygpIHtcbiAgICByZXR1cm4gdGhpcy5mYWN0b3J5W21ldGFLZXldLmRlcGVuZGVuY2llcztcbiAgfVxuXG4gIGFkZERlcGVuZGVuY3kocHJvcGVydHksIGZhY3RvcnkpIHtcbiAgICBjb25zdCBkZXBzID0gdGhpcy5mYWN0b3J5W21ldGFLZXldLmRlcGVuZGVuY2llcztcbiAgICBpZiAoZGVwc1twcm9wZXJ0eV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtwcm9wZXJ0eX0gYWxyZWFkeSBleGlzdHNgKTtcbiAgICB9XG4gICAgZGVwc1twcm9wZXJ0eV0gPSBuZXcgQ29tcG9uZW50KGZhY3RvcnkpO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
