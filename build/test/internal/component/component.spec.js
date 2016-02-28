'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Component', () => {
  it('should return factory', () => {
    let MyClass = class MyClass {};


    const comp = new _component2.default(MyClass);
    _assert2.default.equal(comp.factory, MyClass);
  });

  it('should return "id"', () => {
    _assert2.default.throws(() => new _component2.default('dummy'), err => err.message === '\'dummy\' is not a function');
  });

  it('should set and get "namespace"', () => {
    let MyClass = class MyClass {};


    const comp = new _component2.default(MyClass);
    _assert2.default.equal(comp.namespace, undefined);

    comp.namespace = 'namespace';
    _assert2.default.equal(comp.namespace, 'namespace');
  });

  it('should set and get "name"', () => {
    let MyClass = class MyClass {};


    const comp = new _component2.default(MyClass);
    _assert2.default.equal(comp.name, undefined);

    comp.name = 'name';
    _assert2.default.equal(comp.name, 'name');
  });

  it('should set and get "type"', () => {
    let MyClass = class MyClass {};


    const comp = new _component2.default(MyClass);
    _assert2.default.equal(comp.type, undefined);

    comp.type = 'type';
    _assert2.default.equal(comp.type, 'type');
  });

  it('should add and get "dependencies"', () => {
    let MyDep = class MyDep {};
    let MyClass = class MyClass {};


    const comp = new _component2.default(MyClass);
    _assert2.default.deepEqual(comp.dependencies, {});

    comp.addDependency('dep', MyDep);
    _assert2.default.deepEqual(comp.dependencies, { dep: new _component2.default(MyDep) });

    _assert2.default.throws(() => comp.addDependency('dep', MyDep), err => err.message === 'dep already exists');
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC9jb21wb25lbnQuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQSxTQUFTLFdBQVQsRUFBc0IsTUFBTTtBQUMxQixLQUFHLHVCQUFILEVBQTRCLE1BQU07UUFDMUIsVUFBTixNQUFNLE9BQU4sQ0FBYyxFQUFkLENBRGdDOzs7QUFJaEMsVUFBTSxPQUFPLHdCQUFjLE9BQWQsQ0FBUCxDQUowQjtBQUtoQyxxQkFBTyxLQUFQLENBQWEsS0FBSyxPQUFMLEVBQWMsT0FBM0IsRUFMZ0M7R0FBTixDQUE1QixDQUQwQjs7QUFTMUIsS0FBRyxvQkFBSCxFQUF5QixNQUFNO0FBQzdCLHFCQUFPLE1BQVAsQ0FDRSxNQUFNLHdCQUFjLE9BQWQsQ0FBTixFQUNBLE9BQVMsSUFBSSxPQUFKLEtBQWdCLDZCQUFoQixDQUZYLENBRDZCO0dBQU4sQ0FBekIsQ0FUMEI7O0FBZTFCLEtBQUcsZ0NBQUgsRUFBcUMsTUFBTTtRQUNuQyxVQUFOLE1BQU0sT0FBTixDQUFjLEVBQWQsQ0FEeUM7OztBQUl6QyxVQUFNLE9BQU8sd0JBQWMsT0FBZCxDQUFQLENBSm1DO0FBS3pDLHFCQUFPLEtBQVAsQ0FBYSxLQUFLLFNBQUwsRUFBZ0IsU0FBN0IsRUFMeUM7O0FBT3pDLFNBQUssU0FBTCxHQUFpQixXQUFqQixDQVB5QztBQVF6QyxxQkFBTyxLQUFQLENBQWEsS0FBSyxTQUFMLEVBQWdCLFdBQTdCLEVBUnlDO0dBQU4sQ0FBckMsQ0FmMEI7O0FBMEIxQixLQUFHLDJCQUFILEVBQWdDLE1BQU07UUFDOUIsVUFBTixNQUFNLE9BQU4sQ0FBYyxFQUFkLENBRG9DOzs7QUFJcEMsVUFBTSxPQUFPLHdCQUFjLE9BQWQsQ0FBUCxDQUo4QjtBQUtwQyxxQkFBTyxLQUFQLENBQWEsS0FBSyxJQUFMLEVBQVcsU0FBeEIsRUFMb0M7O0FBT3BDLFNBQUssSUFBTCxHQUFZLE1BQVosQ0FQb0M7QUFRcEMscUJBQU8sS0FBUCxDQUFhLEtBQUssSUFBTCxFQUFXLE1BQXhCLEVBUm9DO0dBQU4sQ0FBaEMsQ0ExQjBCOztBQXFDMUIsS0FBRywyQkFBSCxFQUFnQyxNQUFNO1FBQzlCLFVBQU4sTUFBTSxPQUFOLENBQWMsRUFBZCxDQURvQzs7O0FBSXBDLFVBQU0sT0FBTyx3QkFBYyxPQUFkLENBQVAsQ0FKOEI7QUFLcEMscUJBQU8sS0FBUCxDQUFhLEtBQUssSUFBTCxFQUFXLFNBQXhCLEVBTG9DOztBQU9wQyxTQUFLLElBQUwsR0FBWSxNQUFaLENBUG9DO0FBUXBDLHFCQUFPLEtBQVAsQ0FBYSxLQUFLLElBQUwsRUFBVyxNQUF4QixFQVJvQztHQUFOLENBQWhDLENBckMwQjs7QUFnRDFCLEtBQUcsbUNBQUgsRUFBd0MsTUFBTTtRQUN0QyxRQUFOLE1BQU0sS0FBTixDQUFZLEVBQVosQ0FENEM7UUFJdEMsVUFBTixNQUFNLE9BQU4sQ0FBYyxFQUFkLENBSjRDOzs7QUFPNUMsVUFBTSxPQUFPLHdCQUFjLE9BQWQsQ0FBUCxDQVBzQztBQVE1QyxxQkFBTyxTQUFQLENBQWlCLEtBQUssWUFBTCxFQUFtQixFQUFwQyxFQVI0Qzs7QUFVNUMsU0FBSyxhQUFMLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBVjRDO0FBVzVDLHFCQUFPLFNBQVAsQ0FBaUIsS0FBSyxZQUFMLEVBQW1CLEVBQUUsS0FBSyx3QkFBYyxLQUFkLENBQUwsRUFBdEMsRUFYNEM7O0FBYTVDLHFCQUFPLE1BQVAsQ0FDRSxNQUFNLEtBQUssYUFBTCxDQUFtQixLQUFuQixFQUEwQixLQUExQixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0Isb0JBQWhCLENBRlgsQ0FiNEM7R0FBTixDQUF4QyxDQWhEMEI7Q0FBTixDQUF0QiIsImZpbGUiOiJpbnRlcm5hbC9jb21wb25lbnQvY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuXG5cbmRlc2NyaWJlKCdDb21wb25lbnQnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIGZhY3RvcnknLCAoKSA9PiB7XG4gICAgY2xhc3MgTXlDbGFzcyB7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoTXlDbGFzcyk7XG4gICAgYXNzZXJ0LmVxdWFsKGNvbXAuZmFjdG9yeSwgTXlDbGFzcyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIFwiaWRcIicsICgpID0+IHtcbiAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgKCkgPT4gbmV3IENvbXBvbmVudCgnZHVtbXknKSxcbiAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSAnXFwnZHVtbXlcXCcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzZXQgYW5kIGdldCBcIm5hbWVzcGFjZVwiJywgKCkgPT4ge1xuICAgIGNsYXNzIE15Q2xhc3Mge1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KE15Q2xhc3MpO1xuICAgIGFzc2VydC5lcXVhbChjb21wLm5hbWVzcGFjZSwgdW5kZWZpbmVkKTtcblxuICAgIGNvbXAubmFtZXNwYWNlID0gJ25hbWVzcGFjZSc7XG4gICAgYXNzZXJ0LmVxdWFsKGNvbXAubmFtZXNwYWNlLCAnbmFtZXNwYWNlJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc2V0IGFuZCBnZXQgXCJuYW1lXCInLCAoKSA9PiB7XG4gICAgY2xhc3MgTXlDbGFzcyB7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoTXlDbGFzcyk7XG4gICAgYXNzZXJ0LmVxdWFsKGNvbXAubmFtZSwgdW5kZWZpbmVkKTtcblxuICAgIGNvbXAubmFtZSA9ICduYW1lJztcbiAgICBhc3NlcnQuZXF1YWwoY29tcC5uYW1lLCAnbmFtZScpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNldCBhbmQgZ2V0IFwidHlwZVwiJywgKCkgPT4ge1xuICAgIGNsYXNzIE15Q2xhc3Mge1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KE15Q2xhc3MpO1xuICAgIGFzc2VydC5lcXVhbChjb21wLnR5cGUsIHVuZGVmaW5lZCk7XG5cbiAgICBjb21wLnR5cGUgPSAndHlwZSc7XG4gICAgYXNzZXJ0LmVxdWFsKGNvbXAudHlwZSwgJ3R5cGUnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBhZGQgYW5kIGdldCBcImRlcGVuZGVuY2llc1wiJywgKCkgPT4ge1xuICAgIGNsYXNzIE15RGVwIHtcbiAgICB9XG5cbiAgICBjbGFzcyBNeUNsYXNzIHtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudChNeUNsYXNzKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbXAuZGVwZW5kZW5jaWVzLCB7fSk7XG5cbiAgICBjb21wLmFkZERlcGVuZGVuY3koJ2RlcCcsIE15RGVwKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbXAuZGVwZW5kZW5jaWVzLCB7IGRlcDogbmV3IENvbXBvbmVudChNeURlcCkgfSk7XG5cbiAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgKCkgPT4gY29tcC5hZGREZXBlbmRlbmN5KCdkZXAnLCBNeURlcCksXG4gICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gJ2RlcCBhbHJlYWR5IGV4aXN0cycpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
