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
    _assert2.default.throws(() => new _component2.default('dummy'), err => err.message === `'dummy' is not a function`);
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

    _assert2.default.throws(() => comp.addDependency('dep', MyDep), err => err.message === `dep already exists`);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC9jb21wb25lbnQuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQSxTQUFTLFdBQVQsRUFBc0IsTUFBTTtBQUMxQixLQUFHLHVCQUFILEVBQTRCLE1BQU07UUFDMUIsVUFBTixNQUFNLE9BQU4sQ0FBYyxFQUFkLENBRGdDOzs7QUFJaEMsVUFBTSxPQUFPLHdCQUFjLE9BQWQsQ0FBUCxDQUowQjtBQUtoQyxxQkFBTyxLQUFQLENBQWEsS0FBSyxPQUFMLEVBQWMsT0FBM0IsRUFMZ0M7R0FBTixDQUE1QixDQUQwQjs7QUFTMUIsS0FBRyxvQkFBSCxFQUF5QixNQUFNO0FBQzdCLHFCQUFPLE1BQVAsQ0FDRSxNQUFNLHdCQUFjLE9BQWQsQ0FBTixFQUNBLE9BQVMsSUFBSSxPQUFKLEtBQWdCLENBQUMseUJBQUQsQ0FBaEIsQ0FGWCxDQUQ2QjtHQUFOLENBQXpCLENBVDBCOztBQWUxQixLQUFHLGdDQUFILEVBQXFDLE1BQU07UUFDbkMsVUFBTixNQUFNLE9BQU4sQ0FBYyxFQUFkLENBRHlDOzs7QUFJekMsVUFBTSxPQUFPLHdCQUFjLE9BQWQsQ0FBUCxDQUptQztBQUt6QyxxQkFBTyxLQUFQLENBQWEsS0FBSyxTQUFMLEVBQWdCLFNBQTdCLEVBTHlDOztBQU96QyxTQUFLLFNBQUwsR0FBaUIsV0FBakIsQ0FQeUM7QUFRekMscUJBQU8sS0FBUCxDQUFhLEtBQUssU0FBTCxFQUFnQixXQUE3QixFQVJ5QztHQUFOLENBQXJDLENBZjBCOztBQTBCMUIsS0FBRywyQkFBSCxFQUFnQyxNQUFNO1FBQzlCLFVBQU4sTUFBTSxPQUFOLENBQWMsRUFBZCxDQURvQzs7O0FBSXBDLFVBQU0sT0FBTyx3QkFBYyxPQUFkLENBQVAsQ0FKOEI7QUFLcEMscUJBQU8sS0FBUCxDQUFhLEtBQUssSUFBTCxFQUFXLFNBQXhCLEVBTG9DOztBQU9wQyxTQUFLLElBQUwsR0FBWSxNQUFaLENBUG9DO0FBUXBDLHFCQUFPLEtBQVAsQ0FBYSxLQUFLLElBQUwsRUFBVyxNQUF4QixFQVJvQztHQUFOLENBQWhDLENBMUIwQjs7QUFxQzFCLEtBQUcsMkJBQUgsRUFBZ0MsTUFBTTtRQUM5QixVQUFOLE1BQU0sT0FBTixDQUFjLEVBQWQsQ0FEb0M7OztBQUlwQyxVQUFNLE9BQU8sd0JBQWMsT0FBZCxDQUFQLENBSjhCO0FBS3BDLHFCQUFPLEtBQVAsQ0FBYSxLQUFLLElBQUwsRUFBVyxTQUF4QixFQUxvQzs7QUFPcEMsU0FBSyxJQUFMLEdBQVksTUFBWixDQVBvQztBQVFwQyxxQkFBTyxLQUFQLENBQWEsS0FBSyxJQUFMLEVBQVcsTUFBeEIsRUFSb0M7R0FBTixDQUFoQyxDQXJDMEI7O0FBZ0QxQixLQUFHLG1DQUFILEVBQXdDLE1BQU07UUFDdEMsUUFBTixNQUFNLEtBQU4sQ0FBWSxFQUFaLENBRDRDO1FBSXRDLFVBQU4sTUFBTSxPQUFOLENBQWMsRUFBZCxDQUo0Qzs7O0FBTzVDLFVBQU0sT0FBTyx3QkFBYyxPQUFkLENBQVAsQ0FQc0M7QUFRNUMscUJBQU8sU0FBUCxDQUFpQixLQUFLLFlBQUwsRUFBbUIsRUFBcEMsRUFSNEM7O0FBVTVDLFNBQUssYUFBTCxDQUFtQixLQUFuQixFQUEwQixLQUExQixFQVY0QztBQVc1QyxxQkFBTyxTQUFQLENBQWlCLEtBQUssWUFBTCxFQUFtQixFQUFFLEtBQUssd0JBQWMsS0FBZCxDQUFMLEVBQXRDLEVBWDRDOztBQWE1QyxxQkFBTyxNQUFQLENBQ0UsTUFBTSxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsRUFBMEIsS0FBMUIsQ0FBTixFQUNBLE9BQVMsSUFBSSxPQUFKLEtBQWdCLENBQUMsa0JBQUQsQ0FBaEIsQ0FGWCxDQWI0QztHQUFOLENBQXhDLENBaEQwQjtDQUFOLENBQXRCIiwiZmlsZSI6ImludGVybmFsL2NvbXBvbmVudC9jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5cblxuZGVzY3JpYmUoJ0NvbXBvbmVudCcsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gZmFjdG9yeScsICgpID0+IHtcbiAgICBjbGFzcyBNeUNsYXNzIHtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudChNeUNsYXNzKTtcbiAgICBhc3NlcnQuZXF1YWwoY29tcC5mYWN0b3J5LCBNeUNsYXNzKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gXCJpZFwiJywgKCkgPT4ge1xuICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAoKSA9PiBuZXcgQ29tcG9uZW50KCdkdW1teScpLFxuICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGAnZHVtbXknIGlzIG5vdCBhIGZ1bmN0aW9uYCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc2V0IGFuZCBnZXQgXCJuYW1lc3BhY2VcIicsICgpID0+IHtcbiAgICBjbGFzcyBNeUNsYXNzIHtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudChNeUNsYXNzKTtcbiAgICBhc3NlcnQuZXF1YWwoY29tcC5uYW1lc3BhY2UsIHVuZGVmaW5lZCk7XG5cbiAgICBjb21wLm5hbWVzcGFjZSA9ICduYW1lc3BhY2UnO1xuICAgIGFzc2VydC5lcXVhbChjb21wLm5hbWVzcGFjZSwgJ25hbWVzcGFjZScpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNldCBhbmQgZ2V0IFwibmFtZVwiJywgKCkgPT4ge1xuICAgIGNsYXNzIE15Q2xhc3Mge1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KE15Q2xhc3MpO1xuICAgIGFzc2VydC5lcXVhbChjb21wLm5hbWUsIHVuZGVmaW5lZCk7XG5cbiAgICBjb21wLm5hbWUgPSAnbmFtZSc7XG4gICAgYXNzZXJ0LmVxdWFsKGNvbXAubmFtZSwgJ25hbWUnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzZXQgYW5kIGdldCBcInR5cGVcIicsICgpID0+IHtcbiAgICBjbGFzcyBNeUNsYXNzIHtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudChNeUNsYXNzKTtcbiAgICBhc3NlcnQuZXF1YWwoY29tcC50eXBlLCB1bmRlZmluZWQpO1xuXG4gICAgY29tcC50eXBlID0gJ3R5cGUnO1xuICAgIGFzc2VydC5lcXVhbChjb21wLnR5cGUsICd0eXBlJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgYWRkIGFuZCBnZXQgXCJkZXBlbmRlbmNpZXNcIicsICgpID0+IHtcbiAgICBjbGFzcyBNeURlcCB7XG4gICAgfVxuXG4gICAgY2xhc3MgTXlDbGFzcyB7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoTXlDbGFzcyk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChjb21wLmRlcGVuZGVuY2llcywge30pO1xuXG4gICAgY29tcC5hZGREZXBlbmRlbmN5KCdkZXAnLCBNeURlcCk7XG4gICAgYXNzZXJ0LmRlZXBFcXVhbChjb21wLmRlcGVuZGVuY2llcywgeyBkZXA6IG5ldyBDb21wb25lbnQoTXlEZXApIH0pO1xuXG4gICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICgpID0+IGNvbXAuYWRkRGVwZW5kZW5jeSgnZGVwJywgTXlEZXApLFxuICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGBkZXAgYWxyZWFkeSBleGlzdHNgKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
