"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint no-param-reassign:0 */

let ResourceFactory = class ResourceFactory {

  annotate(path, method) {
    return (target, key) => {
      target[key].path = path;
      target[key].method = method;
    };
  }
};
exports.default = ResourceFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2h0dHAvcmVzb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztJQUVNLGtCQUFOLE1BQU0sZUFBTixDQUFzQjs7QUFFcEIsV0FBUyxJQUFULEVBQWUsTUFBZixFQUF1QjtBQUNyQixXQUFPLENBQUMsTUFBRCxFQUFTLEdBQVQsS0FBaUI7QUFDdEIsYUFBTyxHQUFQLEVBQVksSUFBWixHQUFtQixJQUFuQixDQURzQjtBQUV0QixhQUFPLEdBQVAsRUFBWSxNQUFaLEdBQXFCLE1BQXJCLENBRnNCO0tBQWpCLENBRGM7R0FBdkI7Q0FGRjtrQkFXZSIsImZpbGUiOiJpbnRlcm5hbC9odHRwL3Jlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAgKi9cblxuY2xhc3MgUmVzb3VyY2VGYWN0b3J5IHtcblxuICBhbm5vdGF0ZShwYXRoLCBtZXRob2QpIHtcbiAgICByZXR1cm4gKHRhcmdldCwga2V5KSA9PiB7XG4gICAgICB0YXJnZXRba2V5XS5wYXRoID0gcGF0aDtcbiAgICAgIHRhcmdldFtrZXldLm1ldGhvZCA9IG1ldGhvZDtcbiAgICB9O1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2VGYWN0b3J5O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
