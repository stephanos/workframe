'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('../component/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Injector = class Injector {

  static inject(reference) {
    return (target, key, descriptor) => {
      const component = new _component2.default(target.constructor);
      try {
        component.addDependency(key, reference);
      } catch (err) {
        throw new Error(`unable to inject into '${ key }' of '${ target.constructor.name }': ${ err.message }`);
      }
      descriptor.writable = true;
      descriptor.initializer = () => undefined;
      return descriptor;
    };
  }
}; /* eslint no-param-reassign:0 */

exports.default = Injector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2lvYy9pbmplY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFJTSxXQUFOLE1BQU0sUUFBTixDQUFlOztBQUViLFNBQU8sTUFBUCxDQUFjLFNBQWQsRUFBeUI7QUFDdkIsV0FBTyxDQUFDLE1BQUQsRUFBUyxHQUFULEVBQWMsVUFBZCxLQUE2QjtBQUNsQyxZQUFNLFlBQVksd0JBQWMsT0FBTyxXQUFQLENBQTFCLENBRDRCO0FBRWxDLFVBQUk7QUFDRixrQkFBVSxhQUFWLENBQXdCLEdBQXhCLEVBQTZCLFNBQTdCLEVBREU7T0FBSixDQUVFLE9BQU8sR0FBUCxFQUFZO0FBQ1osY0FBTSxJQUFJLEtBQUosQ0FBVSxDQUFDLHVCQUFELEdBQTBCLEdBQTFCLEVBQThCLE1BQTlCLEdBQXNDLE9BQU8sV0FBUCxDQUFtQixJQUFuQixFQUF3QixHQUE5RCxHQUFtRSxJQUFJLE9BQUosRUFBWSxDQUF6RixDQUFOLENBRFk7T0FBWjtBQUdGLGlCQUFXLFFBQVgsR0FBc0IsSUFBdEIsQ0FQa0M7QUFRbEMsaUJBQVcsV0FBWCxHQUF5QixNQUFNLFNBQU4sQ0FSUztBQVNsQyxhQUFPLFVBQVAsQ0FUa0M7S0FBN0IsQ0FEZ0I7R0FBekI7Q0FGRjs7a0JBa0JlIiwiZmlsZSI6ImludGVybmFsL2lvYy9pbmplY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowICovXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudC9jb21wb25lbnQnO1xuXG5cbmNsYXNzIEluamVjdG9yIHtcblxuICBzdGF0aWMgaW5qZWN0KHJlZmVyZW5jZSkge1xuICAgIHJldHVybiAodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQodGFyZ2V0LmNvbnN0cnVjdG9yKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbXBvbmVudC5hZGREZXBlbmRlbmN5KGtleSwgcmVmZXJlbmNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuYWJsZSB0byBpbmplY3QgaW50byAnJHtrZXl9JyBvZiAnJHt0YXJnZXQuY29uc3RydWN0b3IubmFtZX0nOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgfVxuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBkZXNjcmlwdG9yLmluaXRpYWxpemVyID0gKCkgPT4gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEluamVjdG9yO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
