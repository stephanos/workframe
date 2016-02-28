'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let factory; /* eslint camelcase:0 */

let typeVerify;
let validator;
let registry;

describe('Factory', () => {
  var _class, _temp;

  let MyType = (_temp = _class = class MyType {}, _class.verify = c => typeVerify(c), _class.isSingleton = true, _class.typeName = 'Component', _class.injectTypeWhitelist = ['Component'], _temp);


  beforeEach(() => {
    typeVerify = _sinon2.default.stub();
    registry = {
      add: _sinon2.default.spy()
    };
    validator = {
      validateName: _sinon2.default.stub(),
      validateNamespace: _sinon2.default.stub(),
      validateDependencies: _sinon2.default.stub()
    };
    factory = new _factory2.default([MyType], registry, validator);
  });

  describe('should create a component', () => {
    it('with correct name', () => {
      let MyComponent = class MyComponent {};

      const component = factory.build(MyComponent);

      _assert2.default.equal(component.name, 'My');
    });

    it('with correct type', () => {
      let MyComponent = class MyComponent {};

      const component = factory.build(MyComponent);

      _assert2.default.equal(component.type, MyType);
    });

    it('with default dependencies', () => {
      let MyComponent = class MyComponent {};

      const component = factory.build(MyComponent);

      _assert2.default.deepEqual(component.dependencies, {});
    });

    it('and add it to the registry', () => {
      let MyComponent = class MyComponent {};

      const component = factory.build(MyComponent);

      _assert2.default.ok(registry.add.calledOnce);
      _assert2.default.deepEqual(registry.add.firstCall.args[0], component);
    });
  });

  describe('should fail to create a component', () => {
    it('when type verification fails', () => {
      let MyComponent = class MyComponent {};


      typeVerify.withArgs(MyComponent).throws(new Error('invalid'));

      _assert2.default.throws(() => factory.build(MyComponent), err => err.message === 'invalid');
    });

    it('when type is unknown', () => {
      let Invalid = class Invalid {};


      _assert2.default.throws(() => factory.build(Invalid), err => err.message === `invalid component: 'Invalid' is not a known type`);
    });

    it('when name is invalid', () => {
      let Invalid_NameComponent = class Invalid_NameComponent {};


      validator.validateName.throws(new Error('invalid name'));

      _assert2.default.throws(() => factory.build(Invalid_NameComponent), err => err.message === `invalid name`);
    });

    it('when dependencies are invalid', () => {
      let MyComponent = class MyComponent {};


      validator.validateDependencies.throws(new Error('invalid dependencies'));

      _assert2.default.throws(() => factory.build(MyComponent), err => err.message === `invalid dependencies`);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC9mYWN0b3J5LnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLElBQUksT0FBSjs7QUFDQSxJQUFJLFVBQUo7QUFDQSxJQUFJLFNBQUo7QUFDQSxJQUFJLFFBQUo7O0FBRUEsU0FBUyxTQUFULEVBQW9CLE1BQU07OztNQUNsQiwyQkFBTixNQUFNLE1BQU4sQ0FBYSxFQUFiLFNBQ1MsU0FBUyxLQUFPLFdBQVcsQ0FBWCxDQUFQLFNBQ1QsY0FBYyxhQUNkLFdBQVcsb0JBQ1gsc0JBQXNCLENBQUMsV0FBRCxVQUxQOzs7QUFReEIsYUFBVyxNQUFNO0FBQ2YsaUJBQWEsZ0JBQU0sSUFBTixFQUFiLENBRGU7QUFFZixlQUFXO0FBQ1QsV0FBSyxnQkFBTSxHQUFOLEVBQUw7S0FERixDQUZlO0FBS2YsZ0JBQVk7QUFDVixvQkFBYyxnQkFBTSxJQUFOLEVBQWQ7QUFDQSx5QkFBbUIsZ0JBQU0sSUFBTixFQUFuQjtBQUNBLDRCQUFzQixnQkFBTSxJQUFOLEVBQXRCO0tBSEYsQ0FMZTtBQVVmLGNBQVUsc0JBQXFCLENBQUMsTUFBRCxDQUFyQixFQUErQixRQUEvQixFQUF5QyxTQUF6QyxDQUFWLENBVmU7R0FBTixDQUFYLENBUndCOztBQXFCeEIsV0FBUywyQkFBVCxFQUFzQyxNQUFNO0FBQzFDLE9BQUcsbUJBQUgsRUFBd0IsTUFBTTtVQUN0QixjQUFOLE1BQU0sV0FBTixDQUFrQixFQUFsQixDQUQ0Qjs7QUFFNUIsWUFBTSxZQUFZLFFBQVEsS0FBUixDQUFjLFdBQWQsQ0FBWixDQUZzQjs7QUFJNUIsdUJBQU8sS0FBUCxDQUFhLFVBQVUsSUFBVixFQUFnQixJQUE3QixFQUo0QjtLQUFOLENBQXhCLENBRDBDOztBQVExQyxPQUFHLG1CQUFILEVBQXdCLE1BQU07VUFDdEIsY0FBTixNQUFNLFdBQU4sQ0FBa0IsRUFBbEIsQ0FENEI7O0FBRTVCLFlBQU0sWUFBWSxRQUFRLEtBQVIsQ0FBYyxXQUFkLENBQVosQ0FGc0I7O0FBSTVCLHVCQUFPLEtBQVAsQ0FBYSxVQUFVLElBQVYsRUFBZ0IsTUFBN0IsRUFKNEI7S0FBTixDQUF4QixDQVIwQzs7QUFlMUMsT0FBRywyQkFBSCxFQUFnQyxNQUFNO1VBQzlCLGNBQU4sTUFBTSxXQUFOLENBQWtCLEVBQWxCLENBRG9DOztBQUVwQyxZQUFNLFlBQVksUUFBUSxLQUFSLENBQWMsV0FBZCxDQUFaLENBRjhCOztBQUlwQyx1QkFBTyxTQUFQLENBQWlCLFVBQVUsWUFBVixFQUF3QixFQUF6QyxFQUpvQztLQUFOLENBQWhDLENBZjBDOztBQXNCMUMsT0FBRyw0QkFBSCxFQUFpQyxNQUFNO1VBQy9CLGNBQU4sTUFBTSxXQUFOLENBQWtCLEVBQWxCLENBRHFDOztBQUVyQyxZQUFNLFlBQVksUUFBUSxLQUFSLENBQWMsV0FBZCxDQUFaLENBRitCOztBQUlyQyx1QkFBTyxFQUFQLENBQVUsU0FBUyxHQUFULENBQWEsVUFBYixDQUFWLENBSnFDO0FBS3JDLHVCQUFPLFNBQVAsQ0FBaUIsU0FBUyxHQUFULENBQWEsU0FBYixDQUF1QixJQUF2QixDQUE0QixDQUE1QixDQUFqQixFQUFpRCxTQUFqRCxFQUxxQztLQUFOLENBQWpDLENBdEIwQztHQUFOLENBQXRDLENBckJ3Qjs7QUFvRHhCLFdBQVMsbUNBQVQsRUFBOEMsTUFBTTtBQUNsRCxPQUFHLDhCQUFILEVBQW1DLE1BQU07VUFDakMsY0FBTixNQUFNLFdBQU4sQ0FBa0IsRUFBbEIsQ0FEdUM7OztBQUd2QyxpQkFBVyxRQUFYLENBQW9CLFdBQXBCLEVBQWlDLE1BQWpDLENBQXdDLElBQUksS0FBSixDQUFVLFNBQVYsQ0FBeEMsRUFIdUM7O0FBS3ZDLHVCQUFPLE1BQVAsQ0FDRSxNQUFNLFFBQVEsS0FBUixDQUFjLFdBQWQsQ0FBTixFQUNBLE9BQVMsSUFBSSxPQUFKLEtBQWdCLFNBQWhCLENBRlgsQ0FMdUM7S0FBTixDQUFuQyxDQURrRDs7QUFXbEQsT0FBRyxzQkFBSCxFQUEyQixNQUFNO1VBQ3pCLFVBQU4sTUFBTSxPQUFOLENBQWMsRUFBZCxDQUQrQjs7O0FBRy9CLHVCQUFPLE1BQVAsQ0FDRSxNQUFNLFFBQVEsS0FBUixDQUFjLE9BQWQsQ0FBTixFQUNBLE9BQ0UsSUFBSSxPQUFKLEtBQWdCLENBQUMsZ0RBQUQsQ0FBaEIsQ0FISixDQUgrQjtLQUFOLENBQTNCLENBWGtEOztBQW9CbEQsT0FBRyxzQkFBSCxFQUEyQixNQUFNO1VBQ3pCLHdCQUFOLE1BQU0scUJBQU4sQ0FBNEIsRUFBNUIsQ0FEK0I7OztBQUcvQixnQkFBVSxZQUFWLENBQXVCLE1BQXZCLENBQThCLElBQUksS0FBSixDQUFVLGNBQVYsQ0FBOUIsRUFIK0I7O0FBSy9CLHVCQUFPLE1BQVAsQ0FDRSxNQUFNLFFBQVEsS0FBUixDQUFjLHFCQUFkLENBQU4sRUFDQSxPQUFTLElBQUksT0FBSixLQUFnQixDQUFDLFlBQUQsQ0FBaEIsQ0FGWCxDQUwrQjtLQUFOLENBQTNCLENBcEJrRDs7QUE4QmxELE9BQUcsK0JBQUgsRUFBb0MsTUFBTTtVQUNsQyxjQUFOLE1BQU0sV0FBTixDQUFrQixFQUFsQixDQUR3Qzs7O0FBR3hDLGdCQUFVLG9CQUFWLENBQStCLE1BQS9CLENBQXNDLElBQUksS0FBSixDQUFVLHNCQUFWLENBQXRDLEVBSHdDOztBQUt4Qyx1QkFBTyxNQUFQLENBQ0UsTUFBTSxRQUFRLEtBQVIsQ0FBYyxXQUFkLENBQU4sRUFDQSxPQUFTLElBQUksT0FBSixLQUFnQixDQUFDLG9CQUFELENBQWhCLENBRlgsQ0FMd0M7S0FBTixDQUFwQyxDQTlCa0Q7R0FBTixDQUE5QyxDQXBEd0I7Q0FBTixDQUFwQiIsImZpbGUiOiJpbnRlcm5hbC9jb21wb25lbnQvZmFjdG9yeS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IGNhbWVsY2FzZTowICovXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgQ29tcG9uZW50RmFjdG9yeSBmcm9tICcuL2ZhY3RvcnknO1xuXG5cbmxldCBmYWN0b3J5O1xubGV0IHR5cGVWZXJpZnk7XG5sZXQgdmFsaWRhdG9yO1xubGV0IHJlZ2lzdHJ5O1xuXG5kZXNjcmliZSgnRmFjdG9yeScsICgpID0+IHtcbiAgY2xhc3MgTXlUeXBlIHtcbiAgICBzdGF0aWMgdmVyaWZ5ID0gKGMpID0+IHR5cGVWZXJpZnkoYyk7XG4gICAgc3RhdGljIGlzU2luZ2xldG9uID0gdHJ1ZTtcbiAgICBzdGF0aWMgdHlwZU5hbWUgPSAnQ29tcG9uZW50JztcbiAgICBzdGF0aWMgaW5qZWN0VHlwZVdoaXRlbGlzdCA9IFsnQ29tcG9uZW50J107XG4gIH1cblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICB0eXBlVmVyaWZ5ID0gc2lub24uc3R1YigpO1xuICAgIHJlZ2lzdHJ5ID0ge1xuICAgICAgYWRkOiBzaW5vbi5zcHkoKSxcbiAgICB9O1xuICAgIHZhbGlkYXRvciA9IHtcbiAgICAgIHZhbGlkYXRlTmFtZTogc2lub24uc3R1YigpLFxuICAgICAgdmFsaWRhdGVOYW1lc3BhY2U6IHNpbm9uLnN0dWIoKSxcbiAgICAgIHZhbGlkYXRlRGVwZW5kZW5jaWVzOiBzaW5vbi5zdHViKCksXG4gICAgfTtcbiAgICBmYWN0b3J5ID0gbmV3IENvbXBvbmVudEZhY3RvcnkoW015VHlwZV0sIHJlZ2lzdHJ5LCB2YWxpZGF0b3IpO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2hvdWxkIGNyZWF0ZSBhIGNvbXBvbmVudCcsICgpID0+IHtcbiAgICBpdCgnd2l0aCBjb3JyZWN0IG5hbWUnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBNeUNvbXBvbmVudCB7fVxuICAgICAgY29uc3QgY29tcG9uZW50ID0gZmFjdG9yeS5idWlsZChNeUNvbXBvbmVudCk7XG5cbiAgICAgIGFzc2VydC5lcXVhbChjb21wb25lbnQubmFtZSwgJ015Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnd2l0aCBjb3JyZWN0IHR5cGUnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBNeUNvbXBvbmVudCB7fVxuICAgICAgY29uc3QgY29tcG9uZW50ID0gZmFjdG9yeS5idWlsZChNeUNvbXBvbmVudCk7XG5cbiAgICAgIGFzc2VydC5lcXVhbChjb21wb25lbnQudHlwZSwgTXlUeXBlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3aXRoIGRlZmF1bHQgZGVwZW5kZW5jaWVzJywgKCkgPT4ge1xuICAgICAgY2xhc3MgTXlDb21wb25lbnQge31cbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGZhY3RvcnkuYnVpbGQoTXlDb21wb25lbnQpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbXBvbmVudC5kZXBlbmRlbmNpZXMsIHt9KTtcbiAgICB9KTtcblxuICAgIGl0KCdhbmQgYWRkIGl0IHRvIHRoZSByZWdpc3RyeScsICgpID0+IHtcbiAgICAgIGNsYXNzIE15Q29tcG9uZW50IHt9XG4gICAgICBjb25zdCBjb21wb25lbnQgPSBmYWN0b3J5LmJ1aWxkKE15Q29tcG9uZW50KTtcblxuICAgICAgYXNzZXJ0Lm9rKHJlZ2lzdHJ5LmFkZC5jYWxsZWRPbmNlKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVnaXN0cnkuYWRkLmZpcnN0Q2FsbC5hcmdzWzBdLCBjb21wb25lbnQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2hvdWxkIGZhaWwgdG8gY3JlYXRlIGEgY29tcG9uZW50JywgKCkgPT4ge1xuICAgIGl0KCd3aGVuIHR5cGUgdmVyaWZpY2F0aW9uIGZhaWxzJywgKCkgPT4ge1xuICAgICAgY2xhc3MgTXlDb21wb25lbnQge31cblxuICAgICAgdHlwZVZlcmlmeS53aXRoQXJncyhNeUNvbXBvbmVudCkudGhyb3dzKG5ldyBFcnJvcignaW52YWxpZCcpKTtcblxuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gZmFjdG9yeS5idWlsZChNeUNvbXBvbmVudCksXG4gICAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSAnaW52YWxpZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3doZW4gdHlwZSBpcyB1bmtub3duJywgKCkgPT4ge1xuICAgICAgY2xhc3MgSW52YWxpZCB7fVxuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiBmYWN0b3J5LmJ1aWxkKEludmFsaWQpLFxuICAgICAgICAoZXJyKSA9PlxuICAgICAgICAgIGVyci5tZXNzYWdlID09PSBgaW52YWxpZCBjb21wb25lbnQ6ICdJbnZhbGlkJyBpcyBub3QgYSBrbm93biB0eXBlYCk7XG4gICAgfSk7XG5cbiAgICBpdCgnd2hlbiBuYW1lIGlzIGludmFsaWQnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBJbnZhbGlkX05hbWVDb21wb25lbnQge31cblxuICAgICAgdmFsaWRhdG9yLnZhbGlkYXRlTmFtZS50aHJvd3MobmV3IEVycm9yKCdpbnZhbGlkIG5hbWUnKSk7XG5cbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+IGZhY3RvcnkuYnVpbGQoSW52YWxpZF9OYW1lQ29tcG9uZW50KSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGBpbnZhbGlkIG5hbWVgKTtcbiAgICB9KTtcblxuICAgIGl0KCd3aGVuIGRlcGVuZGVuY2llcyBhcmUgaW52YWxpZCcsICgpID0+IHtcbiAgICAgIGNsYXNzIE15Q29tcG9uZW50IHt9XG5cbiAgICAgIHZhbGlkYXRvci52YWxpZGF0ZURlcGVuZGVuY2llcy50aHJvd3MobmV3IEVycm9yKCdpbnZhbGlkIGRlcGVuZGVuY2llcycpKTtcblxuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gZmFjdG9yeS5idWlsZChNeUNvbXBvbmVudCksXG4gICAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgaW52YWxpZCBkZXBlbmRlbmNpZXNgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
