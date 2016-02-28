'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _dataDriven = require('data-driven');

var _dataDriven2 = _interopRequireDefault(_dataDriven);

var _validator = require('./validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let MyComponent = class MyComponent {};

const validator = new _validator2.default();

describe('Validator', () => {
  describe('validation of "name"', () => {
    it('should succeed for valid value', () => {
      validator.validateName(MyComponent, 'name');
    });

    (0, _dataDriven2.default)([{ value: undefined }, { value: 0 }, { value: null }, { value: '' }, { value: 'invalid-name' }, { value: 'invalid_name' }, { value: 'invalid:name' }], () => {
      it('should fail for invalid value', ctx => {
        _assert2.default.throws(() => validator.validateName(MyComponent, ctx.value), err => err.message === `invalid component: '${ ctx.value }' must be string with characters only`);
      });
    });
  });

  describe('validation of "dependencies"', () => {
    const MyType = {
      injectTypeWhitelist: ['Type']
    };

    it('should succeed for empty dependencies', () => {
      validator.validateDependencies(MyComponent, MyType, {});
    });

    it('should succeed for valid dependency', () => {
      validator.validateDependencies(MyComponent, MyType, {
        myDependency: {
          type: {
            typeName: 'Type'
          }
        }
      });
    });

    it('should fail for invalid dependency', () => {
      _assert2.default.throws(() => validator.validateDependencies(MyComponent, MyType, {
        myDependency: {
          name: 'MyDependency',
          type: {
            typeName: 'Invalid'
          }
        }
      }), err => err.message === `invalid dependency 'MyDependency' of 'myDependency' in 'MyComponent': type 'Invalid' is not allowed`);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC92YWxpZGF0b3Iuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTU0sY0FBTixNQUFNLFdBQU4sQ0FBa0IsRUFBbEI7O0FBQ0EsTUFBTSxZQUFZLHlCQUFaOztBQUVOLFNBQVMsV0FBVCxFQUFzQixNQUFNO0FBQzFCLFdBQVMsc0JBQVQsRUFBaUMsTUFBTTtBQUNyQyxPQUFHLGdDQUFILEVBQXFDLE1BQU07QUFDekMsZ0JBQVUsWUFBVixDQUF1QixXQUF2QixFQUFvQyxNQUFwQyxFQUR5QztLQUFOLENBQXJDLENBRHFDOztBQUtyQyw4QkFBTSxDQUNKLEVBQUUsT0FBTyxTQUFQLEVBREUsRUFDa0IsRUFBRSxPQUFPLENBQVAsRUFEcEIsRUFDZ0MsRUFBRSxPQUFPLElBQVAsRUFEbEMsRUFDaUQsRUFBRSxPQUFPLEVBQVAsRUFEbkQsRUFFSixFQUFFLE9BQU8sY0FBUCxFQUZFLEVBRXVCLEVBQUUsT0FBTyxjQUFQLEVBRnpCLEVBRWtELEVBQUUsT0FBTyxjQUFQLEVBRnBELENBQU4sRUFHRyxNQUFNO0FBQ1AsU0FBRywrQkFBSCxFQUFvQyxPQUFTO0FBQzNDLHlCQUFPLE1BQVAsQ0FDRSxNQUFNLFVBQVUsWUFBVixDQUF1QixXQUF2QixFQUFvQyxJQUFJLEtBQUosQ0FBMUMsRUFDQSxPQUFTLElBQUksT0FBSixLQUFnQixDQUFDLG9CQUFELEdBQXVCLElBQUksS0FBSixFQUFVLHFDQUFqQyxDQUFoQixDQUZYLENBRDJDO09BQVQsQ0FBcEMsQ0FETztLQUFOLENBSEgsQ0FMcUM7R0FBTixDQUFqQyxDQUQwQjs7QUFrQjFCLFdBQVMsOEJBQVQsRUFBeUMsTUFBTTtBQUM3QyxVQUFNLFNBQVM7QUFDYiwyQkFBcUIsQ0FBQyxNQUFELENBQXJCO0tBREksQ0FEdUM7O0FBSzdDLE9BQUcsdUNBQUgsRUFBNEMsTUFBTTtBQUNoRCxnQkFBVSxvQkFBVixDQUErQixXQUEvQixFQUE0QyxNQUE1QyxFQUFvRCxFQUFwRCxFQURnRDtLQUFOLENBQTVDLENBTDZDOztBQVM3QyxPQUFHLHFDQUFILEVBQTBDLE1BQU07QUFDOUMsZ0JBQVUsb0JBQVYsQ0FBK0IsV0FBL0IsRUFBNEMsTUFBNUMsRUFBb0Q7QUFDbEQsc0JBQWM7QUFDWixnQkFBTTtBQUNKLHNCQUFVLE1BQVY7V0FERjtTQURGO09BREYsRUFEOEM7S0FBTixDQUExQyxDQVQ2Qzs7QUFtQjdDLE9BQUcsb0NBQUgsRUFBeUMsTUFBTTtBQUM3Qyx1QkFBTyxNQUFQLENBQ0UsTUFBTSxVQUFVLG9CQUFWLENBQStCLFdBQS9CLEVBQTRDLE1BQTVDLEVBQW9EO0FBQ3hELHNCQUFjO0FBQ1osZ0JBQU0sY0FBTjtBQUNBLGdCQUFNO0FBQ0osc0JBQVUsU0FBVjtXQURGO1NBRkY7T0FESSxDQUFOLEVBUUEsT0FBUyxJQUFJLE9BQUosS0FBZ0IsQ0FBQyxtR0FBRCxDQUFoQixDQVRYLENBRDZDO0tBQU4sQ0FBekMsQ0FuQjZDO0dBQU4sQ0FBekMsQ0FsQjBCO0NBQU4sQ0FBdEIiLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L3ZhbGlkYXRvci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHdoZXJlIGZyb20gJ2RhdGEtZHJpdmVuJztcblxuaW1wb3J0IFZhbGlkYXRvciBmcm9tICcuL3ZhbGlkYXRvcic7XG5cblxuY2xhc3MgTXlDb21wb25lbnQge31cbmNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcblxuZGVzY3JpYmUoJ1ZhbGlkYXRvcicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ3ZhbGlkYXRpb24gb2YgXCJuYW1lXCInLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzdWNjZWVkIGZvciB2YWxpZCB2YWx1ZScsICgpID0+IHtcbiAgICAgIHZhbGlkYXRvci52YWxpZGF0ZU5hbWUoTXlDb21wb25lbnQsICduYW1lJyk7XG4gICAgfSk7XG5cbiAgICB3aGVyZShbXG4gICAgICB7IHZhbHVlOiB1bmRlZmluZWQgfSwgeyB2YWx1ZTogMCB9LCB7IHZhbHVlOiBudWxsIH0sIHsgdmFsdWU6ICcnIH0sXG4gICAgICB7IHZhbHVlOiAnaW52YWxpZC1uYW1lJyB9LCB7IHZhbHVlOiAnaW52YWxpZF9uYW1lJyB9LCB7IHZhbHVlOiAnaW52YWxpZDpuYW1lJyB9LFxuICAgIF0sICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCBmb3IgaW52YWxpZCB2YWx1ZScsIChjdHgpID0+IHtcbiAgICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgICAoKSA9PiB2YWxpZGF0b3IudmFsaWRhdGVOYW1lKE15Q29tcG9uZW50LCBjdHgudmFsdWUpLFxuICAgICAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgaW52YWxpZCBjb21wb25lbnQ6ICcke2N0eC52YWx1ZX0nIG11c3QgYmUgc3RyaW5nIHdpdGggY2hhcmFjdGVycyBvbmx5YCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ZhbGlkYXRpb24gb2YgXCJkZXBlbmRlbmNpZXNcIicsICgpID0+IHtcbiAgICBjb25zdCBNeVR5cGUgPSB7XG4gICAgICBpbmplY3RUeXBlV2hpdGVsaXN0OiBbJ1R5cGUnXSxcbiAgICB9O1xuXG4gICAgaXQoJ3Nob3VsZCBzdWNjZWVkIGZvciBlbXB0eSBkZXBlbmRlbmNpZXMnLCAoKSA9PiB7XG4gICAgICB2YWxpZGF0b3IudmFsaWRhdGVEZXBlbmRlbmNpZXMoTXlDb21wb25lbnQsIE15VHlwZSwge30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzdWNjZWVkIGZvciB2YWxpZCBkZXBlbmRlbmN5JywgKCkgPT4ge1xuICAgICAgdmFsaWRhdG9yLnZhbGlkYXRlRGVwZW5kZW5jaWVzKE15Q29tcG9uZW50LCBNeVR5cGUsIHtcbiAgICAgICAgbXlEZXBlbmRlbmN5OiB7XG4gICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdHlwZU5hbWU6ICdUeXBlJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgZm9yIGludmFsaWQgZGVwZW5kZW5jeScsICgpID0+IHtcbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+IHZhbGlkYXRvci52YWxpZGF0ZURlcGVuZGVuY2llcyhNeUNvbXBvbmVudCwgTXlUeXBlLCB7XG4gICAgICAgICAgbXlEZXBlbmRlbmN5OiB7XG4gICAgICAgICAgICBuYW1lOiAnTXlEZXBlbmRlbmN5JyxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgdHlwZU5hbWU6ICdJbnZhbGlkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgaW52YWxpZCBkZXBlbmRlbmN5ICdNeURlcGVuZGVuY3knIG9mICdteURlcGVuZGVuY3knIGluICdNeUNvbXBvbmVudCc6IHR5cGUgJ0ludmFsaWQnIGlzIG5vdCBhbGxvd2VkYCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
