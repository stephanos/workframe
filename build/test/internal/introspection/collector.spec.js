'use strict';

var _collector = require('./collector');

var _collector2 = _interopRequireDefault(_collector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Collector', () => {
  it('should add an action', () => {
    const collector = new _collector2.default();
    collector.add({
      method: 'test',
      arguments: [1, 2, 3]
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2ludHJvc3BlY3Rpb24vY29sbGVjdG9yLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSxTQUFTLFdBQVQsRUFBc0IsTUFBTTtBQUMxQixLQUFHLHNCQUFILEVBQTJCLE1BQU07QUFDL0IsVUFBTSxZQUFZLHlCQUFaLENBRHlCO0FBRS9CLGNBQVUsR0FBVixDQUFjO0FBQ1osY0FBUSxNQUFSO0FBQ0EsaUJBQVcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBWDtLQUZGLEVBRitCO0dBQU4sQ0FBM0IsQ0FEMEI7Q0FBTixDQUF0QiIsImZpbGUiOiJpbnRlcm5hbC9pbnRyb3NwZWN0aW9uL2NvbGxlY3Rvci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbGxlY3RvciBmcm9tICcuL2NvbGxlY3Rvcic7XG5cblxuZGVzY3JpYmUoJ0NvbGxlY3RvcicsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBhZGQgYW4gYWN0aW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbGxlY3RvciA9IG5ldyBDb2xsZWN0b3IoKTtcbiAgICBjb2xsZWN0b3IuYWRkKHtcbiAgICAgIG1ldGhvZDogJ3Rlc3QnLFxuICAgICAgYXJndW1lbnRzOiBbMSwgMiwgM10sXG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
