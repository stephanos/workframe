'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _errors = require('./errors');

/* eslint no-param-reassign:0 */


function checkIsNoDuplicate(container, id, component) {
  if (container._valueById[id] || container._componentById[id]) {
    throw new _errors.KeyError(`can not register '${ component.name }': already registered`);
  }
}

function createInstance(container, rootComponent, proxyFn) {
  const cache = {};

  function resolve(component, trace) {
    function traceToString(list) {
      return `'${ list.map(c => c.factory.name).join('\' -> \'') }'`;
    }

    if (trace.contains(component)) {
      throw new _errors.ResolveError(`unable to resolve '${ component.factory.name }': ` + `circular dependency ${ traceToString(trace.push(component)) }`);
    }

    if (container._componentById[component.id] === undefined) {
      let message = `unable to resolve '${ component.factory.name }': not found`;
      if (!trace.isEmpty()) {
        message += ` (trace: ${ traceToString(trace) })`;
      }
      throw new _errors.ResolveError(message);
    }

    const instance = container._valueById[component.id] || component.newInstance();
    container._valueById[component.id] = instance;

    const dependencies = container._dependenciesById[component.id];
    if (dependencies) {
      for (const property in dependencies) {
        if (dependencies.hasOwnProperty(property)) {
          const depComp = dependencies[property];
          const depVal = cache[depComp.id] || resolve(depComp, trace.push(component));
          instance[property] = depVal;
          cache[depComp.id] = depVal;
        }
      }
    }

    return proxyFn(instance);
  }

  return resolve(rootComponent, (0, _immutable.List)());
}

let Registry = class Registry {
  constructor() {
    this._valueById = {};
    this._idByComponent = {};
    this._componentById = {};
    this._dependenciesById = {};
    this._connectionByActor = {};
    this._connectionBySubject = {};
  }

  // TODO: use something like https://github.com/cpettitt/graphlib


  add(component) {
    const id = component.id;
    checkIsNoDuplicate(this, id, component);

    this._componentById[id] = component.factory;
    this._idByComponent[component.factory] = id;
    this._dependenciesById[id] = component.dependencies;
  }

  get(component) {
    let proxyFn = arguments.length <= 1 || arguments[1] === undefined ? input => input : arguments[1];

    return createInstance(this, component, proxyFn);
  }

  setConnection(actor, kind, subject) {
    this._connectionByActor[actor] = subject;

    this._connectionBySubject[subject] = this._connectionBySubject[subject] || [];
    this._connectionBySubject[subject].push(actor);
  }

  getConnection(kind, component) {
    return this._connectionBySubject[component][0];
  }
};
exports.default = Registry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2lvYy9yZWdpc3RyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTUEsU0FBUyxrQkFBVCxDQUE0QixTQUE1QixFQUF1QyxFQUF2QyxFQUEyQyxTQUEzQyxFQUFzRDtBQUNwRCxNQUFJLFVBQVUsVUFBVixDQUFxQixFQUFyQixLQUE0QixVQUFVLGNBQVYsQ0FBeUIsRUFBekIsQ0FBNUIsRUFBMEQ7QUFDNUQsVUFBTSxxQkFBYSxDQUFDLGtCQUFELEdBQXFCLFVBQVUsSUFBVixFQUFlLHFCQUFwQyxDQUFiLENBQU4sQ0FENEQ7R0FBOUQ7Q0FERjs7QUFNQSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUMsYUFBbkMsRUFBa0QsT0FBbEQsRUFBMkQ7QUFDekQsUUFBTSxRQUFRLEVBQVIsQ0FEbUQ7O0FBR3pELFdBQVMsT0FBVCxDQUFpQixTQUFqQixFQUE0QixLQUE1QixFQUFtQztBQUNqQyxhQUFTLGFBQVQsQ0FBdUIsSUFBdkIsRUFBNkI7QUFDM0IsYUFBTyxDQUFDLENBQUQsR0FBSSxLQUFLLEdBQUwsQ0FBUyxLQUFPLEVBQUUsT0FBRixDQUFVLElBQVYsQ0FBaEIsQ0FBZ0MsSUFBaEMsQ0FBcUMsVUFBckMsQ0FBSixFQUFxRCxDQUFyRCxDQUFQLENBRDJCO0tBQTdCOztBQUlBLFFBQUksTUFBTSxRQUFOLENBQWUsU0FBZixDQUFKLEVBQStCO0FBQzdCLFlBQU0seUJBQWlCLENBQUMsbUJBQUQsR0FBc0IsVUFBVSxPQUFWLENBQWtCLElBQWxCLEVBQXVCLEdBQTdDLElBQ3JCLENBQUMsb0JBQUQsR0FBdUIsY0FBYyxNQUFNLElBQU4sQ0FBVyxTQUFYLENBQWQsQ0FBdkIsRUFBNEQsQ0FEdkMsQ0FBdkIsQ0FENkI7S0FBL0I7O0FBS0EsUUFBSSxVQUFVLGNBQVYsQ0FBeUIsVUFBVSxFQUFWLENBQXpCLEtBQTJDLFNBQTNDLEVBQXNEO0FBQ3hELFVBQUksVUFBVSxDQUFDLG1CQUFELEdBQXNCLFVBQVUsT0FBVixDQUFrQixJQUFsQixFQUF1QixZQUE3QyxDQUFWLENBRG9EO0FBRXhELFVBQUksQ0FBQyxNQUFNLE9BQU4sRUFBRCxFQUFrQjtBQUNwQixtQkFBVyxDQUFDLFNBQUQsR0FBWSxjQUFjLEtBQWQsQ0FBWixFQUFpQyxDQUFqQyxDQUFYLENBRG9CO09BQXRCO0FBR0EsWUFBTSx5QkFBaUIsT0FBakIsQ0FBTixDQUx3RDtLQUExRDs7QUFRQSxVQUFNLFdBQVcsVUFBVSxVQUFWLENBQXFCLFVBQVUsRUFBVixDQUFyQixJQUFzQyxVQUFVLFdBQVYsRUFBdEMsQ0FsQmdCO0FBbUJqQyxjQUFVLFVBQVYsQ0FBcUIsVUFBVSxFQUFWLENBQXJCLEdBQXFDLFFBQXJDLENBbkJpQzs7QUFxQmpDLFVBQU0sZUFBZSxVQUFVLGlCQUFWLENBQTRCLFVBQVUsRUFBVixDQUEzQyxDQXJCMkI7QUFzQmpDLFFBQUksWUFBSixFQUFrQjtBQUNoQixXQUFLLE1BQU0sUUFBTixJQUFrQixZQUF2QixFQUFxQztBQUNuQyxZQUFJLGFBQWEsY0FBYixDQUE0QixRQUE1QixDQUFKLEVBQTJDO0FBQ3pDLGdCQUFNLFVBQVUsYUFBYSxRQUFiLENBQVYsQ0FEbUM7QUFFekMsZ0JBQU0sU0FBUyxNQUFNLFFBQVEsRUFBUixDQUFOLElBQXFCLFFBQVEsT0FBUixFQUFpQixNQUFNLElBQU4sQ0FBVyxTQUFYLENBQWpCLENBQXJCLENBRjBCO0FBR3pDLG1CQUFTLFFBQVQsSUFBcUIsTUFBckIsQ0FIeUM7QUFJekMsZ0JBQU0sUUFBUSxFQUFSLENBQU4sR0FBb0IsTUFBcEIsQ0FKeUM7U0FBM0M7T0FERjtLQURGOztBQVdBLFdBQU8sUUFBUSxRQUFSLENBQVAsQ0FqQ2lDO0dBQW5DOztBQW9DQSxTQUFPLFFBQVEsYUFBUixFQUF1QixzQkFBdkIsQ0FBUCxDQXZDeUQ7Q0FBM0Q7O0lBMkNNLFdBQU4sTUFBTSxRQUFOLENBQWU7O1NBRWIsYUFBYTtTQUNiLGlCQUFpQjtTQUNqQixpQkFBaUI7U0FDakIsb0JBQW9CO1NBR3BCLHFCQUFxQjtTQUNyQix1QkFBdUI7Ozs7QUFUVjs7QUFXYixNQUFJLFNBQUosRUFBZTtBQUNiLFVBQU0sS0FBSyxVQUFVLEVBQVYsQ0FERTtBQUViLHVCQUFtQixJQUFuQixFQUF5QixFQUF6QixFQUE2QixTQUE3QixFQUZhOztBQUliLFNBQUssY0FBTCxDQUFvQixFQUFwQixJQUEwQixVQUFVLE9BQVYsQ0FKYjtBQUtiLFNBQUssY0FBTCxDQUFvQixVQUFVLE9BQVYsQ0FBcEIsR0FBeUMsRUFBekMsQ0FMYTtBQU1iLFNBQUssaUJBQUwsQ0FBdUIsRUFBdkIsSUFBNkIsVUFBVSxZQUFWLENBTmhCO0dBQWY7O0FBU0EsTUFBSSxTQUFKLEVBQTJDO1FBQTVCLGdFQUFVLFNBQVcsS0FBWCxnQkFBa0I7O0FBQ3pDLFdBQU8sZUFBZSxJQUFmLEVBQXFCLFNBQXJCLEVBQWdDLE9BQWhDLENBQVAsQ0FEeUM7R0FBM0M7O0FBSUEsZ0JBQWMsS0FBZCxFQUFxQixJQUFyQixFQUEyQixPQUEzQixFQUFvQztBQUNsQyxTQUFLLGtCQUFMLENBQXdCLEtBQXhCLElBQWlDLE9BQWpDLENBRGtDOztBQUdsQyxTQUFLLG9CQUFMLENBQTBCLE9BQTFCLElBQXFDLEtBQUssb0JBQUwsQ0FBMEIsT0FBMUIsS0FBc0MsRUFBdEMsQ0FISDtBQUlsQyxTQUFLLG9CQUFMLENBQTBCLE9BQTFCLEVBQW1DLElBQW5DLENBQXdDLEtBQXhDLEVBSmtDO0dBQXBDOztBQU9BLGdCQUFjLElBQWQsRUFBb0IsU0FBcEIsRUFBK0I7QUFDN0IsV0FBTyxLQUFLLG9CQUFMLENBQTBCLFNBQTFCLEVBQXFDLENBQXJDLENBQVAsQ0FENkI7R0FBL0I7Q0EvQkY7a0JBcUNlIiwiZmlsZSI6ImludGVybmFsL2lvYy9yZWdpc3RyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowICovXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgUmVzb2x2ZUVycm9yLCBLZXlFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcblxuXG5mdW5jdGlvbiBjaGVja0lzTm9EdXBsaWNhdGUoY29udGFpbmVyLCBpZCwgY29tcG9uZW50KSB7XG4gIGlmIChjb250YWluZXIuX3ZhbHVlQnlJZFtpZF0gfHwgY29udGFpbmVyLl9jb21wb25lbnRCeUlkW2lkXSkge1xuICAgIHRocm93IG5ldyBLZXlFcnJvcihgY2FuIG5vdCByZWdpc3RlciAnJHtjb21wb25lbnQubmFtZX0nOiBhbHJlYWR5IHJlZ2lzdGVyZWRgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShjb250YWluZXIsIHJvb3RDb21wb25lbnQsIHByb3h5Rm4pIHtcbiAgY29uc3QgY2FjaGUgPSB7fTtcblxuICBmdW5jdGlvbiByZXNvbHZlKGNvbXBvbmVudCwgdHJhY2UpIHtcbiAgICBmdW5jdGlvbiB0cmFjZVRvU3RyaW5nKGxpc3QpIHtcbiAgICAgIHJldHVybiBgJyR7bGlzdC5tYXAoKGMpID0+IGMuZmFjdG9yeS5uYW1lKS5qb2luKCdcXCcgLT4gXFwnJyl9J2A7XG4gICAgfVxuXG4gICAgaWYgKHRyYWNlLmNvbnRhaW5zKGNvbXBvbmVudCkpIHtcbiAgICAgIHRocm93IG5ldyBSZXNvbHZlRXJyb3IoYHVuYWJsZSB0byByZXNvbHZlICcke2NvbXBvbmVudC5mYWN0b3J5Lm5hbWV9JzogYCArXG4gICAgICAgIGBjaXJjdWxhciBkZXBlbmRlbmN5ICR7dHJhY2VUb1N0cmluZyh0cmFjZS5wdXNoKGNvbXBvbmVudCkpfWApO1xuICAgIH1cblxuICAgIGlmIChjb250YWluZXIuX2NvbXBvbmVudEJ5SWRbY29tcG9uZW50LmlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IGB1bmFibGUgdG8gcmVzb2x2ZSAnJHtjb21wb25lbnQuZmFjdG9yeS5uYW1lfSc6IG5vdCBmb3VuZGA7XG4gICAgICBpZiAoIXRyYWNlLmlzRW1wdHkoKSkge1xuICAgICAgICBtZXNzYWdlICs9IGAgKHRyYWNlOiAke3RyYWNlVG9TdHJpbmcodHJhY2UpfSlgO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFJlc29sdmVFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGNvbnRhaW5lci5fdmFsdWVCeUlkW2NvbXBvbmVudC5pZF0gfHwgY29tcG9uZW50Lm5ld0luc3RhbmNlKCk7XG4gICAgY29udGFpbmVyLl92YWx1ZUJ5SWRbY29tcG9uZW50LmlkXSA9IGluc3RhbmNlO1xuXG4gICAgY29uc3QgZGVwZW5kZW5jaWVzID0gY29udGFpbmVyLl9kZXBlbmRlbmNpZXNCeUlkW2NvbXBvbmVudC5pZF07XG4gICAgaWYgKGRlcGVuZGVuY2llcykge1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBjb25zdCBkZXBDb21wID0gZGVwZW5kZW5jaWVzW3Byb3BlcnR5XTtcbiAgICAgICAgICBjb25zdCBkZXBWYWwgPSBjYWNoZVtkZXBDb21wLmlkXSB8fCByZXNvbHZlKGRlcENvbXAsIHRyYWNlLnB1c2goY29tcG9uZW50KSk7XG4gICAgICAgICAgaW5zdGFuY2VbcHJvcGVydHldID0gZGVwVmFsO1xuICAgICAgICAgIGNhY2hlW2RlcENvbXAuaWRdID0gZGVwVmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3h5Rm4oaW5zdGFuY2UpO1xuICB9XG5cbiAgcmV0dXJuIHJlc29sdmUocm9vdENvbXBvbmVudCwgTGlzdCgpKTtcbn1cblxuXG5jbGFzcyBSZWdpc3RyeSB7XG5cbiAgX3ZhbHVlQnlJZCA9IHt9O1xuICBfaWRCeUNvbXBvbmVudCA9IHt9O1xuICBfY29tcG9uZW50QnlJZCA9IHt9O1xuICBfZGVwZW5kZW5jaWVzQnlJZCA9IHt9O1xuXG4gIC8vIFRPRE86IHVzZSBzb21ldGhpbmcgbGlrZSBodHRwczovL2dpdGh1Yi5jb20vY3BldHRpdHQvZ3JhcGhsaWJcbiAgX2Nvbm5lY3Rpb25CeUFjdG9yID0ge307XG4gIF9jb25uZWN0aW9uQnlTdWJqZWN0ID0ge307XG5cbiAgYWRkKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IGlkID0gY29tcG9uZW50LmlkO1xuICAgIGNoZWNrSXNOb0R1cGxpY2F0ZSh0aGlzLCBpZCwgY29tcG9uZW50KTtcblxuICAgIHRoaXMuX2NvbXBvbmVudEJ5SWRbaWRdID0gY29tcG9uZW50LmZhY3Rvcnk7XG4gICAgdGhpcy5faWRCeUNvbXBvbmVudFtjb21wb25lbnQuZmFjdG9yeV0gPSBpZDtcbiAgICB0aGlzLl9kZXBlbmRlbmNpZXNCeUlkW2lkXSA9IGNvbXBvbmVudC5kZXBlbmRlbmNpZXM7XG4gIH1cblxuICBnZXQoY29tcG9uZW50LCBwcm94eUZuID0gKGlucHV0KSA9PiBpbnB1dCkge1xuICAgIHJldHVybiBjcmVhdGVJbnN0YW5jZSh0aGlzLCBjb21wb25lbnQsIHByb3h5Rm4pO1xuICB9XG5cbiAgc2V0Q29ubmVjdGlvbihhY3Rvciwga2luZCwgc3ViamVjdCkge1xuICAgIHRoaXMuX2Nvbm5lY3Rpb25CeUFjdG9yW2FjdG9yXSA9IHN1YmplY3Q7XG5cbiAgICB0aGlzLl9jb25uZWN0aW9uQnlTdWJqZWN0W3N1YmplY3RdID0gdGhpcy5fY29ubmVjdGlvbkJ5U3ViamVjdFtzdWJqZWN0XSB8fCBbXTtcbiAgICB0aGlzLl9jb25uZWN0aW9uQnlTdWJqZWN0W3N1YmplY3RdLnB1c2goYWN0b3IpO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbihraW5kLCBjb21wb25lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGlvbkJ5U3ViamVjdFtjb21wb25lbnRdWzBdO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cnk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=