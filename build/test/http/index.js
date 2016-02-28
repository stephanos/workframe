'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Method = undefined;
exports.Resource = Resource;

var _methods = require('../internal/http/methods');

var _methods2 = _interopRequireDefault(_methods);

var _resource = require('../internal/http/resource');

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Method = _methods2.default;


const resourceFactory = new _resource2.default();
function Resource() {
  return resourceFactory.annotate(...arguments);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHAvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O1FBT2dCOzs7Ozs7Ozs7Ozs7UUFIUDs7O0FBRVQsTUFBTSxrQkFBa0Isd0JBQWxCO0FBQ0MsU0FBUyxRQUFULEdBQTJCO0FBQ2hDLFNBQU8sZ0JBQWdCLFFBQWhCLENBQXlCLFlBQXpCLENBQVAsQ0FEZ0M7Q0FBM0IiLCJmaWxlIjoiaHR0cC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNZXRob2QgZnJvbSAnLi4vaW50ZXJuYWwvaHR0cC9tZXRob2RzJztcbmltcG9ydCBSZXNvdXJjZUZhY3RvcnkgZnJvbSAnLi4vaW50ZXJuYWwvaHR0cC9yZXNvdXJjZSc7XG5cblxuZXhwb3J0IHsgTWV0aG9kIH07XG5cbmNvbnN0IHJlc291cmNlRmFjdG9yeSA9IG5ldyBSZXNvdXJjZUZhY3RvcnkoKTtcbmV4cG9ydCBmdW5jdGlvbiBSZXNvdXJjZSguLi5hcmdzKSB7XG4gIHJldHVybiByZXNvdXJjZUZhY3RvcnkuYW5ub3RhdGUoLi4uYXJncyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
