'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

let EventStore = class EventStore {

  constructor(storage, idGenerator, clock) {
    this.storage = storage;
    this.idGenerator = idGenerator;
    this.clock = clock;
  }

  addEvents(events) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const commitId = _this.idGenerator.next();
      const commitStamp = _this.clock.now();
      const eventsLen = events.size;

      const uncommittedEvents = events.map(function (evt, idx) {
        return evt.mergeDeep((0, _immutable.Map)({
          id: `${ commitId }-${ idx.toString() }`,
          commit: {
            id: commitId,
            timestamp: commitStamp,
            sequence: idx,
            size: eventsLen
          }
        }));
      });

      // TODO: aggregateRevision:
      return _this.storage.addEvents(uncommittedEvents);
    })();
  }

  getEventStream(aggregateRef, qryOpts) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const events = yield _this2.storage.getEventStream(aggregateRef, qryOpts);
      const aggregateRevision = events.isEmpty() ? -1 : events.last().getIn(['aggregate', 'revision']);
      return (0, _immutable.Map)({
        aggregate: {
          context: aggregateRef.context,
          name: aggregateRef.name,
          id: aggregateRef.id,
          revision: aggregateRevision
        },
        events
      });
    })();
  }
};
exports.default = EventStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2VzL3N0b3JlL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFHTSxhQUFOLE1BQU0sVUFBTixDQUFpQjs7QUFFZixjQUFZLE9BQVosRUFBcUIsV0FBckIsRUFBa0MsS0FBbEMsRUFBeUM7QUFDdkMsU0FBSyxPQUFMLEdBQWUsT0FBZixDQUR1QztBQUV2QyxTQUFLLFdBQUwsR0FBbUIsV0FBbkIsQ0FGdUM7QUFHdkMsU0FBSyxLQUFMLEdBQWEsS0FBYixDQUh1QztHQUF6Qzs7QUFNQSxZQUFnQixNQUFoQixFQUF3Qjs7OztBQUN0QixZQUFNLFdBQVcsTUFBSyxXQUFMLENBQWlCLElBQWpCLEVBQVg7QUFDTixZQUFNLGNBQWMsTUFBSyxLQUFMLENBQVcsR0FBWCxFQUFkO0FBQ04sWUFBTSxZQUFZLE9BQU8sSUFBUDs7QUFFbEIsWUFBTSxvQkFBb0IsT0FBTyxHQUFQLENBQVcsVUFBQyxHQUFELEVBQU0sR0FBTjtlQUNuQyxJQUFJLFNBQUosQ0FBYyxvQkFBSTtBQUNoQixjQUFJLENBQUMsR0FBRSxRQUFILEVBQVksQ0FBWixHQUFlLElBQUksUUFBSixFQUFmLEVBQThCLENBQWxDO0FBQ0Esa0JBQVE7QUFDTixnQkFBSSxRQUFKO0FBQ0EsdUJBQVcsV0FBWDtBQUNBLHNCQUFVLEdBQVY7QUFDQSxrQkFBTSxTQUFOO1dBSkY7U0FGWSxDQUFkO09BRG1DLENBQS9COzs7QUFhTixhQUFPLE1BQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsaUJBQXZCLENBQVA7U0FsQnNCO0dBQXhCOztBQXFCQSxpQkFBcUIsWUFBckIsRUFBbUMsT0FBbkMsRUFBNEM7Ozs7QUFDMUMsWUFBTSxTQUFTLE1BQU0sT0FBSyxPQUFMLENBQWEsY0FBYixDQUE0QixZQUE1QixFQUEwQyxPQUExQyxDQUFOO0FBQ2YsWUFBTSxvQkFBb0IsT0FBTyxPQUFQLEtBQW1CLENBQUMsQ0FBRCxHQUFLLE9BQU8sSUFBUCxHQUFjLEtBQWQsQ0FBb0IsQ0FBQyxXQUFELEVBQWMsVUFBZCxDQUFwQixDQUF4QjtBQUMxQixhQUFPLG9CQUFJO0FBQ1QsbUJBQVc7QUFDVCxtQkFBUyxhQUFhLE9BQWI7QUFDVCxnQkFBTSxhQUFhLElBQWI7QUFDTixjQUFJLGFBQWEsRUFBYjtBQUNKLG9CQUFVLGlCQUFWO1NBSkY7QUFNQSxjQVBTO09BQUosQ0FBUDtTQUgwQztHQUE1QztDQTdCRjtrQkE2Q2UiLCJmaWxlIjoiaW50ZXJuYWwvZXMvc3RvcmUvc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuXG5cbmNsYXNzIEV2ZW50U3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkR2VuZXJhdG9yLCBjbG9jaykge1xuICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgdGhpcy5pZEdlbmVyYXRvciA9IGlkR2VuZXJhdG9yO1xuICAgIHRoaXMuY2xvY2sgPSBjbG9jaztcbiAgfVxuXG4gIGFzeW5jIGFkZEV2ZW50cyhldmVudHMpIHtcbiAgICBjb25zdCBjb21taXRJZCA9IHRoaXMuaWRHZW5lcmF0b3IubmV4dCgpO1xuICAgIGNvbnN0IGNvbW1pdFN0YW1wID0gdGhpcy5jbG9jay5ub3coKTtcbiAgICBjb25zdCBldmVudHNMZW4gPSBldmVudHMuc2l6ZTtcblxuICAgIGNvbnN0IHVuY29tbWl0dGVkRXZlbnRzID0gZXZlbnRzLm1hcCgoZXZ0LCBpZHgpID0+XG4gICAgICBldnQubWVyZ2VEZWVwKE1hcCh7XG4gICAgICAgIGlkOiBgJHtjb21taXRJZH0tJHtpZHgudG9TdHJpbmcoKX1gLFxuICAgICAgICBjb21taXQ6IHtcbiAgICAgICAgICBpZDogY29tbWl0SWQsXG4gICAgICAgICAgdGltZXN0YW1wOiBjb21taXRTdGFtcCxcbiAgICAgICAgICBzZXF1ZW5jZTogaWR4LFxuICAgICAgICAgIHNpemU6IGV2ZW50c0xlbixcbiAgICAgICAgfSxcbiAgICAgICAgLy8gVE9ETzogYWdncmVnYXRlUmV2aXNpb246XG4gICAgICB9KSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5hZGRFdmVudHModW5jb21taXR0ZWRFdmVudHMpO1xuICB9XG5cbiAgYXN5bmMgZ2V0RXZlbnRTdHJlYW0oYWdncmVnYXRlUmVmLCBxcnlPcHRzKSB7XG4gICAgY29uc3QgZXZlbnRzID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldEV2ZW50U3RyZWFtKGFnZ3JlZ2F0ZVJlZiwgcXJ5T3B0cyk7XG4gICAgY29uc3QgYWdncmVnYXRlUmV2aXNpb24gPSBldmVudHMuaXNFbXB0eSgpID8gLTEgOiBldmVudHMubGFzdCgpLmdldEluKFsnYWdncmVnYXRlJywgJ3JldmlzaW9uJ10pO1xuICAgIHJldHVybiBNYXAoe1xuICAgICAgYWdncmVnYXRlOiB7XG4gICAgICAgIGNvbnRleHQ6IGFnZ3JlZ2F0ZVJlZi5jb250ZXh0LFxuICAgICAgICBuYW1lOiBhZ2dyZWdhdGVSZWYubmFtZSxcbiAgICAgICAgaWQ6IGFnZ3JlZ2F0ZVJlZi5pZCxcbiAgICAgICAgcmV2aXNpb246IGFnZ3JlZ2F0ZVJldmlzaW9uLFxuICAgICAgfSxcbiAgICAgIGV2ZW50cyxcbiAgICB9KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50U3RvcmU7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
