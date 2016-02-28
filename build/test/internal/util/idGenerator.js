'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IdGenerator = class IdGenerator {

  static next() {
    return _nodeUuid2.default.v1();
  }
};
exports.default = IdGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL3V0aWwvaWRHZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBS00sY0FBTixNQUFNLFdBQU4sQ0FBa0I7O0FBRWhCLFNBQU8sSUFBUCxHQUFzQjtBQUNwQixXQUFPLG1CQUFLLEVBQUwsRUFBUCxDQURvQjtHQUF0QjtDQUZGO2tCQVFlIiwiZmlsZSI6ImludGVybmFsL3V0aWwvaWRHZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgVVVJRCBmcm9tICdub2RlLXV1aWQnO1xuXG5cbmNsYXNzIElkR2VuZXJhdG9yIHtcblxuICBzdGF0aWMgbmV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBVVUlELnYxKCk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBJZEdlbmVyYXRvcjtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
