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
      }), err => err.message === 'invalid dependency \'MyDependency\' of \'myDependency\' in \'MyComponent\': type \'Invalid\' is not allowed');
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC92YWxpZGF0b3Iuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTU0sY0FBTixNQUFNLFdBQU4sQ0FBa0IsRUFBbEI7O0FBQ0EsTUFBTSxZQUFZLHlCQUFaOztBQUVOLFNBQVMsV0FBVCxFQUFzQixNQUFNO0FBQzFCLFdBQVMsc0JBQVQsRUFBaUMsTUFBTTtBQUNyQyxPQUFHLGdDQUFILEVBQXFDLE1BQU07QUFDekMsZ0JBQVUsWUFBVixDQUF1QixXQUF2QixFQUFvQyxNQUFwQyxFQUR5QztLQUFOLENBQXJDLENBRHFDOztBQUtyQyw4QkFBTSxDQUNKLEVBQUUsT0FBTyxTQUFQLEVBREUsRUFDa0IsRUFBRSxPQUFPLENBQVAsRUFEcEIsRUFDZ0MsRUFBRSxPQUFPLElBQVAsRUFEbEMsRUFDaUQsRUFBRSxPQUFPLEVBQVAsRUFEbkQsRUFFSixFQUFFLE9BQU8sY0FBUCxFQUZFLEVBRXVCLEVBQUUsT0FBTyxjQUFQLEVBRnpCLEVBRWtELEVBQUUsT0FBTyxjQUFQLEVBRnBELENBQU4sRUFHRyxNQUFNO0FBQ1AsU0FBRywrQkFBSCxFQUFvQyxPQUFTO0FBQzNDLHlCQUFPLE1BQVAsQ0FDRSxNQUFNLFVBQVUsWUFBVixDQUF1QixXQUF2QixFQUFvQyxJQUFJLEtBQUosQ0FBMUMsRUFDQSxPQUFTLElBQUksT0FBSixLQUFnQixDQUFDLG9CQUFELEdBQXVCLElBQUksS0FBSixFQUFVLHFDQUFqQyxDQUFoQixDQUZYLENBRDJDO09BQVQsQ0FBcEMsQ0FETztLQUFOLENBSEgsQ0FMcUM7R0FBTixDQUFqQyxDQUQwQjs7QUFrQjFCLFdBQVMsOEJBQVQsRUFBeUMsTUFBTTtBQUM3QyxVQUFNLFNBQVM7QUFDYiwyQkFBcUIsQ0FBQyxNQUFELENBQXJCO0tBREksQ0FEdUM7O0FBSzdDLE9BQUcsdUNBQUgsRUFBNEMsTUFBTTtBQUNoRCxnQkFBVSxvQkFBVixDQUErQixXQUEvQixFQUE0QyxNQUE1QyxFQUFvRCxFQUFwRCxFQURnRDtLQUFOLENBQTVDLENBTDZDOztBQVM3QyxPQUFHLHFDQUFILEVBQTBDLE1BQU07QUFDOUMsZ0JBQVUsb0JBQVYsQ0FBK0IsV0FBL0IsRUFBNEMsTUFBNUMsRUFBb0Q7QUFDbEQsc0JBQWM7QUFDWixnQkFBTTtBQUNKLHNCQUFVLE1BQVY7V0FERjtTQURGO09BREYsRUFEOEM7S0FBTixDQUExQyxDQVQ2Qzs7QUFtQjdDLE9BQUcsb0NBQUgsRUFBeUMsTUFBTTtBQUM3Qyx1QkFBTyxNQUFQLENBQ0UsTUFBTSxVQUFVLG9CQUFWLENBQStCLFdBQS9CLEVBQTRDLE1BQTVDLEVBQW9EO0FBQ3hELHNCQUFjO0FBQ1osZ0JBQU0sY0FBTjtBQUNBLGdCQUFNO0FBQ0osc0JBQVUsU0FBVjtXQURGO1NBRkY7T0FESSxDQUFOLEVBUUEsT0FBUyxJQUFJLE9BQUosS0FBZ0IsNkdBQWhCLENBVFgsQ0FENkM7S0FBTixDQUF6QyxDQW5CNkM7R0FBTixDQUF6QyxDQWxCMEI7Q0FBTixDQUF0QiIsImZpbGUiOiJpbnRlcm5hbC9jb21wb25lbnQvdmFsaWRhdG9yLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgd2hlcmUgZnJvbSAnZGF0YS1kcml2ZW4nO1xuXG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gJy4vdmFsaWRhdG9yJztcblxuXG5jbGFzcyBNeUNvbXBvbmVudCB7fVxuY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcigpO1xuXG5kZXNjcmliZSgnVmFsaWRhdG9yJywgKCkgPT4ge1xuICBkZXNjcmliZSgndmFsaWRhdGlvbiBvZiBcIm5hbWVcIicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgZm9yIHZhbGlkIHZhbHVlJywgKCkgPT4ge1xuICAgICAgdmFsaWRhdG9yLnZhbGlkYXRlTmFtZShNeUNvbXBvbmVudCwgJ25hbWUnKTtcbiAgICB9KTtcblxuICAgIHdoZXJlKFtcbiAgICAgIHsgdmFsdWU6IHVuZGVmaW5lZCB9LCB7IHZhbHVlOiAwIH0sIHsgdmFsdWU6IG51bGwgfSwgeyB2YWx1ZTogJycgfSxcbiAgICAgIHsgdmFsdWU6ICdpbnZhbGlkLW5hbWUnIH0sIHsgdmFsdWU6ICdpbnZhbGlkX25hbWUnIH0sIHsgdmFsdWU6ICdpbnZhbGlkOm5hbWUnIH0sXG4gICAgXSwgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIGZvciBpbnZhbGlkIHZhbHVlJywgKGN0eCkgPT4ge1xuICAgICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAgICgpID0+IHZhbGlkYXRvci52YWxpZGF0ZU5hbWUoTXlDb21wb25lbnQsIGN0eC52YWx1ZSksXG4gICAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGBpbnZhbGlkIGNvbXBvbmVudDogJyR7Y3R4LnZhbHVlfScgbXVzdCBiZSBzdHJpbmcgd2l0aCBjaGFyYWN0ZXJzIG9ubHlgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgndmFsaWRhdGlvbiBvZiBcImRlcGVuZGVuY2llc1wiJywgKCkgPT4ge1xuICAgIGNvbnN0IE15VHlwZSA9IHtcbiAgICAgIGluamVjdFR5cGVXaGl0ZWxpc3Q6IFsnVHlwZSddLFxuICAgIH07XG5cbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgZm9yIGVtcHR5IGRlcGVuZGVuY2llcycsICgpID0+IHtcbiAgICAgIHZhbGlkYXRvci52YWxpZGF0ZURlcGVuZGVuY2llcyhNeUNvbXBvbmVudCwgTXlUeXBlLCB7fSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgZm9yIHZhbGlkIGRlcGVuZGVuY3knLCAoKSA9PiB7XG4gICAgICB2YWxpZGF0b3IudmFsaWRhdGVEZXBlbmRlbmNpZXMoTXlDb21wb25lbnQsIE15VHlwZSwge1xuICAgICAgICBteURlcGVuZGVuY3k6IHtcbiAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB0eXBlTmFtZTogJ1R5cGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBmb3IgaW52YWxpZCBkZXBlbmRlbmN5JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gdmFsaWRhdG9yLnZhbGlkYXRlRGVwZW5kZW5jaWVzKE15Q29tcG9uZW50LCBNeVR5cGUsIHtcbiAgICAgICAgICBteURlcGVuZGVuY3k6IHtcbiAgICAgICAgICAgIG5hbWU6ICdNeURlcGVuZGVuY3knLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICB0eXBlTmFtZTogJ0ludmFsaWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09ICdpbnZhbGlkIGRlcGVuZGVuY3kgXFwnTXlEZXBlbmRlbmN5XFwnIG9mIFxcJ215RGVwZW5kZW5jeVxcJyBpbiBcXCdNeUNvbXBvbmVudFxcJzogdHlwZSBcXCdJbnZhbGlkXFwnIGlzIG5vdCBhbGxvd2VkJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
