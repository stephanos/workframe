'use strict';

var _class, _temp; /* eslint no-unused-vars: 0 */


var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _injector = require('./injector');

var _injector2 = _interopRequireDefault(_injector);

var _component = require('../component/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

let MyDependency = (_temp = _class = class MyDependency {}, _class.__id = 'my-dep', _temp);


describe('inject', () => {
  it('should add dependency', () => {
    var _dec, _desc, _value, _class2, _descriptor;

    let MyComponent = (_dec = _injector2.default.inject(MyDependency), (_class2 = class MyComponent {
      constructor() {
        _initDefineProp(this, 'dependency', _descriptor, this);
      }

    }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'dependency', [_dec], {
      enumerable: true,
      initializer: null
    })), _class2));


    const comp = new _component2.default(MyComponent);
    _assert2.default.deepEqual(Object.keys(comp.dependencies), ['dependency']);
    _assert2.default.deepEqual(comp.dependencies.dependency.factory, MyDependency);
  });

  it('should fail when a property was already injected', () => {
    _assert2.default.throws(() => {
      var _dec2, _dec3, _desc2, _value2, _class4, _descriptor2;

      let MyComponent = (_dec2 = _injector2.default.inject(MyDependency), _dec3 = _injector2.default.inject(MyDependency), (_class4 = class MyComponent {
        constructor() {
          _initDefineProp(this, 'dependency', _descriptor2, this);
        }

      }, (_descriptor2 = _applyDecoratedDescriptor(_class4.prototype, 'dependency', [_dec2, _dec3], {
        enumerable: true,
        initializer: null
      })), _class4));
    }, err => err.message === `unable to inject into 'dependency' of 'MyComponent': dependency already exists`);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2lvYy9pbmplY3Rvci5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT00saUNBQU4sTUFBTSxZQUFOLENBQW1CLEVBQW5CLFNBQ1MsT0FBTzs7O0FBR2hCLFNBQVMsUUFBVCxFQUFtQixNQUFNO0FBQ3ZCLEtBQUcsdUJBQUgsRUFBNEIsTUFBTTs7O1FBQzFCLHNCQUVILG1CQUFTLE1BQVQsQ0FBZ0IsWUFBaEIsY0FGSCxNQUFNLFdBQU4sQ0FBa0I7Ozs7O0tBQWxCOzs7bUJBRGdDOzs7QUFPaEMsVUFBTSxPQUFPLHdCQUFjLFdBQWQsQ0FBUCxDQVAwQjtBQVFoQyxxQkFBTyxTQUFQLENBQWlCLE9BQU8sSUFBUCxDQUFZLEtBQUssWUFBTCxDQUE3QixFQUFpRCxDQUFDLFlBQUQsQ0FBakQsRUFSZ0M7QUFTaEMscUJBQU8sU0FBUCxDQUFpQixLQUFLLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBNkIsT0FBN0IsRUFBc0MsWUFBdkQsRUFUZ0M7R0FBTixDQUE1QixDQUR1Qjs7QUFhdkIsS0FBRyxrREFBSCxFQUF1RCxNQUFNO0FBQzNELHFCQUFPLE1BQVAsQ0FBYyxNQUFNOzs7VUFDWix1QkFFSCxtQkFBUyxNQUFULENBQWdCLFlBQWhCLFdBQ0EsbUJBQVMsTUFBVCxDQUFnQixZQUFoQixjQUhILE1BQU0sV0FBTixDQUFrQjs7Ozs7T0FBbEI7OztxQkFEa0I7S0FBTixFQU9YLE9BQ0QsSUFBSSxPQUFKLEtBQWdCLENBQUMsOEVBQUQsQ0FBaEIsQ0FSRixDQUQyRDtHQUFOLENBQXZELENBYnVCO0NBQU4sQ0FBbkIiLCJmaWxlIjoiaW50ZXJuYWwvaW9jL2luamVjdG9yLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IDAgKi9cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IEluamVjdG9yIGZyb20gJy4vaW5qZWN0b3InO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnQvY29tcG9uZW50JztcblxuXG5jbGFzcyBNeURlcGVuZGVuY3kge1xuICBzdGF0aWMgX19pZCA9ICdteS1kZXAnO1xufVxuXG5kZXNjcmliZSgnaW5qZWN0JywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGFkZCBkZXBlbmRlbmN5JywgKCkgPT4ge1xuICAgIGNsYXNzIE15Q29tcG9uZW50IHtcblxuICAgICAgQEluamVjdG9yLmluamVjdChNeURlcGVuZGVuY3kpXG4gICAgICBkZXBlbmRlbmN5O1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KE15Q29tcG9uZW50KTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKE9iamVjdC5rZXlzKGNvbXAuZGVwZW5kZW5jaWVzKSwgWydkZXBlbmRlbmN5J10pO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoY29tcC5kZXBlbmRlbmNpZXMuZGVwZW5kZW5jeS5mYWN0b3J5LCBNeURlcGVuZGVuY3kpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBhIHByb3BlcnR5IHdhcyBhbHJlYWR5IGluamVjdGVkJywgKCkgPT4ge1xuICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgY2xhc3MgTXlDb21wb25lbnQge1xuXG4gICAgICAgIEBJbmplY3Rvci5pbmplY3QoTXlEZXBlbmRlbmN5KVxuICAgICAgICBASW5qZWN0b3IuaW5qZWN0KE15RGVwZW5kZW5jeSlcbiAgICAgICAgZGVwZW5kZW5jeTtcbiAgICAgIH1cbiAgICB9LCAoZXJyKSA9PlxuICAgICAgZXJyLm1lc3NhZ2UgPT09IGB1bmFibGUgdG8gaW5qZWN0IGludG8gJ2RlcGVuZGVuY3knIG9mICdNeUNvbXBvbmVudCc6IGRlcGVuZGVuY3kgYWxyZWFkeSBleGlzdHNgKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
