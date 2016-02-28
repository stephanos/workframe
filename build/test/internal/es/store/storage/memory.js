'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

let MemoryStorage = class MemoryStorage {

  constructor(idGenerator, clock) {
    this.clock = clock;
    this.idGenerator = idGenerator;

    this.clear();
  }

  connect() {
    return _asyncToGenerator(function* () {
      return;
    })();
  }

  disconnect() {
    return _asyncToGenerator(function* () {
      return;
    })();
  }

  addEvents(events) {
    var _this = this;

    return _asyncToGenerator(function* () {
      return new Promise(function (resolve, reject) {
        const eventsWithId = events.map(function (evt) {
          return evt.merge({ _id: evt.get('id') });
        });
        _this.db.insert(eventsWithId.toJS(), function (err, newDocs) {
          if (err) reject(err);else resolve(newDocs);
        });
      });
    })();
  }

  getEventStream(ref) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      return new Promise(function (resolve, reject) {
        const query = {
          'aggregate.context': ref.context,
          'aggregate.name': ref.name,
          'aggregate.id': ref.id
        };
        _this2.db.find(query).sort({ aggregate: { revision: 1 } }).exec(function (err, found) {
          if (err) reject(err);else {
            const foundWithoutId = (0, _immutable.fromJS)(found).map(function (evt) {
              return evt.delete('_id');
            });
            resolve(foundWithoutId);
          }
        });
      });
    })();
  }

  clear() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      _this3.db = new _nedb2.default();
    })();
  }
};
exports.default = MemoryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2VzL3N0b3JlL3N0b3JhZ2UvbWVtb3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJTSxnQkFBTixNQUFNLGFBQU4sQ0FBb0I7O0FBRWxCLGNBQVksV0FBWixFQUF5QixLQUF6QixFQUFnQztBQUM5QixTQUFLLEtBQUwsR0FBYSxLQUFiLENBRDhCO0FBRTlCLFNBQUssV0FBTCxHQUFtQixXQUFuQixDQUY4Qjs7QUFJOUIsU0FBSyxLQUFMLEdBSjhCO0dBQWhDOztBQU9BLFlBQWdCOztBQUNkO1NBRGM7R0FBaEI7O0FBSUEsZUFBbUI7O0FBQ2pCO1NBRGlCO0dBQW5COztBQUlBLFlBQWdCLE1BQWhCLEVBQXdCOzs7O0FBQ3RCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxjQUFNLGVBQWUsT0FBTyxHQUFQLENBQVcsVUFBQyxHQUFEO2lCQUFTLElBQUksS0FBSixDQUFVLEVBQUUsS0FBSyxJQUFJLEdBQUosQ0FBUSxJQUFSLENBQUwsRUFBWjtTQUFULENBQTFCLENBRGdDO0FBRXRDLGNBQUssRUFBTCxDQUFRLE1BQVIsQ0FBZSxhQUFhLElBQWIsRUFBZixFQUFvQyxVQUFDLEdBQUQsRUFBTSxPQUFOLEVBQWtCO0FBQ3BELGNBQUksR0FBSixFQUFTLE9BQU8sR0FBUCxFQUFULEtBQ0ssUUFBUSxPQUFSLEVBREw7U0FEa0MsQ0FBcEMsQ0FGc0M7T0FBckIsQ0FBbkI7U0FEc0I7R0FBeEI7O0FBVUEsaUJBQXFCLEdBQXJCLEVBQTBCOzs7O0FBQ3hCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxjQUFNLFFBQVE7QUFDWiwrQkFBcUIsSUFBSSxPQUFKO0FBQ3JCLDRCQUFrQixJQUFJLElBQUo7QUFDbEIsMEJBQWdCLElBQUksRUFBSjtTQUhaLENBRGdDO0FBTXRDLGVBQUssRUFBTCxDQUFRLElBQVIsQ0FBYSxLQUFiLEVBQW9CLElBQXBCLENBQXlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBVixFQUFiLEVBQTNCLEVBQXlELElBQXpELENBQThELFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDNUUsY0FBSSxHQUFKLEVBQVMsT0FBTyxHQUFQLEVBQVQsS0FDSztBQUNILGtCQUFNLGlCQUFpQix1QkFBTyxLQUFQLEVBQWMsR0FBZCxDQUFrQixVQUFDLEdBQUQ7cUJBQVMsSUFBSSxNQUFKLENBQVcsS0FBWDthQUFULENBQW5DLENBREg7QUFFSCxvQkFBUSxjQUFSLEVBRkc7V0FETDtTQUQ0RCxDQUE5RCxDQU5zQztPQUFyQixDQUFuQjtTQUR3QjtHQUExQjs7QUFpQkEsVUFBYzs7OztBQUNaLGFBQUssRUFBTCxHQUFVLG9CQUFWO1NBRFk7R0FBZDtDQTVDRjtrQkFrRGUiLCJmaWxlIjoiaW50ZXJuYWwvZXMvc3RvcmUvc3RvcmFnZS9tZW1vcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YXN0b3JlIGZyb20gJ25lZGInO1xuaW1wb3J0IHsgZnJvbUpTIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuXG5jbGFzcyBNZW1vcnlTdG9yYWdlIHtcblxuICBjb25zdHJ1Y3RvcihpZEdlbmVyYXRvciwgY2xvY2spIHtcbiAgICB0aGlzLmNsb2NrID0gY2xvY2s7XG4gICAgdGhpcy5pZEdlbmVyYXRvciA9IGlkR2VuZXJhdG9yO1xuXG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3luYyBkaXNjb25uZWN0KCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzeW5jIGFkZEV2ZW50cyhldmVudHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZXZlbnRzV2l0aElkID0gZXZlbnRzLm1hcCgoZXZ0KSA9PiBldnQubWVyZ2UoeyBfaWQ6IGV2dC5nZXQoJ2lkJykgfSkpO1xuICAgICAgdGhpcy5kYi5pbnNlcnQoZXZlbnRzV2l0aElkLnRvSlMoKSwgKGVyciwgbmV3RG9jcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlKG5ld0RvY3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRFdmVudFN0cmVhbShyZWYpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgICdhZ2dyZWdhdGUuY29udGV4dCc6IHJlZi5jb250ZXh0LFxuICAgICAgICAnYWdncmVnYXRlLm5hbWUnOiByZWYubmFtZSxcbiAgICAgICAgJ2FnZ3JlZ2F0ZS5pZCc6IHJlZi5pZCxcbiAgICAgIH07XG4gICAgICB0aGlzLmRiLmZpbmQocXVlcnkpLnNvcnQoeyBhZ2dyZWdhdGU6IHsgcmV2aXNpb246IDEgfSB9KS5leGVjKChlcnIsIGZvdW5kKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFdpdGhvdXRJZCA9IGZyb21KUyhmb3VuZCkubWFwKChldnQpID0+IGV2dC5kZWxldGUoJ19pZCcpKTtcbiAgICAgICAgICByZXNvbHZlKGZvdW5kV2l0aG91dElkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjbGVhcigpIHtcbiAgICB0aGlzLmRiID0gbmV3IERhdGFzdG9yZSgpO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWVtb3J5U3RvcmFnZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
