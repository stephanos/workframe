'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _errors = require('./errors');

const nameRegex = new RegExp('^([a-zA-Z])+$');

let Validator = class Validator {

  validateName(input, name) {
    if (name === undefined || !(0, _util.isString)(name) || !nameRegex.test(name)) {
      throw new _errors.CreateComponentError(`'${ name }' must be string with characters only`);
    }
  }

  validateDependencies(input, type, dependencies) {
    for (const property in dependencies) {
      if (dependencies.hasOwnProperty(property)) {
        const dependency = dependencies[property];
        const depTypeName = dependency.type.typeName;
        if (type.injectTypeWhitelist.indexOf(depTypeName) === -1) {
          throw new Error(`invalid dependency '${ dependency.name }' of '${ property }' in '${ input.name }': type '${ depTypeName }' is not allowed`);
        }
      }
    }
  }
};
exports.default = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC92YWxpZGF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQU0sWUFBWSxJQUFJLE1BQUosQ0FBVyxlQUFYLENBQVo7O0lBR0EsWUFBTixNQUFNLFNBQU4sQ0FBZ0I7O0FBRWQsZUFBYSxLQUFiLEVBQW9CLElBQXBCLEVBQTBCO0FBQ3hCLFFBQUksU0FBUyxTQUFULElBQXNCLENBQUMsb0JBQVMsSUFBVCxDQUFELElBQW1CLENBQUMsVUFBVSxJQUFWLENBQWUsSUFBZixDQUFELEVBQXVCO0FBQ2xFLFlBQU0saUNBQXlCLENBQUMsQ0FBRCxHQUFJLElBQUosRUFBUyxxQ0FBVCxDQUF6QixDQUFOLENBRGtFO0tBQXBFO0dBREY7O0FBTUEsdUJBQXFCLEtBQXJCLEVBQTRCLElBQTVCLEVBQWtDLFlBQWxDLEVBQWdEO0FBQzlDLFNBQUssTUFBTSxRQUFOLElBQWtCLFlBQXZCLEVBQXFDO0FBQ25DLFVBQUksYUFBYSxjQUFiLENBQTRCLFFBQTVCLENBQUosRUFBMkM7QUFDekMsY0FBTSxhQUFhLGFBQWEsUUFBYixDQUFiLENBRG1DO0FBRXpDLGNBQU0sY0FBYyxXQUFXLElBQVgsQ0FBZ0IsUUFBaEIsQ0FGcUI7QUFHekMsWUFBSSxLQUFLLG1CQUFMLENBQXlCLE9BQXpCLENBQWlDLFdBQWpDLE1BQWtELENBQUMsQ0FBRCxFQUFJO0FBQ3hELGdCQUFNLElBQUksS0FBSixDQUFVLENBQUMsb0JBQUQsR0FBdUIsV0FBVyxJQUFYLEVBQWdCLE1BQXZDLEdBQStDLFFBQS9DLEVBQXdELE1BQXhELEdBQWdFLE1BQU0sSUFBTixFQUFXLFNBQTNFLEdBQXNGLFdBQXRGLEVBQWtHLGdCQUFsRyxDQUFWLENBQU4sQ0FEd0Q7U0FBMUQ7T0FIRjtLQURGO0dBREY7Q0FSRjtrQkFzQmUiLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L3ZhbGlkYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBDcmVhdGVDb21wb25lbnRFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcblxuXG5jb25zdCBuYW1lUmVnZXggPSBuZXcgUmVnRXhwKCdeKFthLXpBLVpdKSskJyk7XG5cblxuY2xhc3MgVmFsaWRhdG9yIHtcblxuICB2YWxpZGF0ZU5hbWUoaW5wdXQsIG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkIHx8ICFpc1N0cmluZyhuYW1lKSB8fCAhbmFtZVJlZ2V4LnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBDcmVhdGVDb21wb25lbnRFcnJvcihgJyR7bmFtZX0nIG11c3QgYmUgc3RyaW5nIHdpdGggY2hhcmFjdGVycyBvbmx5YCk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVEZXBlbmRlbmNpZXMoaW5wdXQsIHR5cGUsIGRlcGVuZGVuY2llcykge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGVwZW5kZW5jaWVzKSB7XG4gICAgICBpZiAoZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICBjb25zdCBkZXBlbmRlbmN5ID0gZGVwZW5kZW5jaWVzW3Byb3BlcnR5XTtcbiAgICAgICAgY29uc3QgZGVwVHlwZU5hbWUgPSBkZXBlbmRlbmN5LnR5cGUudHlwZU5hbWU7XG4gICAgICAgIGlmICh0eXBlLmluamVjdFR5cGVXaGl0ZWxpc3QuaW5kZXhPZihkZXBUeXBlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGRlcGVuZGVuY3kgJyR7ZGVwZW5kZW5jeS5uYW1lfScgb2YgJyR7cHJvcGVydHl9JyBpbiAnJHtpbnB1dC5uYW1lfSc6IHR5cGUgJyR7ZGVwVHlwZU5hbWV9JyBpcyBub3QgYWxsb3dlZGApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVmFsaWRhdG9yO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
