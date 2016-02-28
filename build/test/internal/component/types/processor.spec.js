'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ProcessorComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = _processor2.default.injectTypeWhitelist;

    _assert2.default.deepEqual(allowedTypes, ['Behavior', 'Mutator', 'Processor', 'Viewer']);
  });

  describe('validation', () => {
    it('should succeed', () => {
      let Processor = class Processor {
        process(signal) {
          this.signal = signal;
        }
      };


      _processor2.default.verify(Processor);
    });

    it('should fail if "process" method missing', () => {
      let Processor = class Processor {};


      _assert2.default.throws(() => _processor2.default.verify(Processor), err => err.message === 'method \'process\' must be defined');
    });

    // it('should fail if "process" method has less than 1 parameter', () => {
    //   class Processor {
    //     process() {
    //     }
    //   }
    //
    //   assert.throws(
    //     () => ProcessorComponentType.verify(Processor),
    //     (err) => err.message === `method 'process' must have exactly 1 parameter`);
    // });
    //
    // it('should fail if "process" method has more than 1 parameter', () => {
    //   class Processor {
    //     process(one, two) {
    //       this.one = one;
    //       this.two = two;
    //     }
    //   }
    //
    //   assert.throws(
    //     () => ProcessorComponentType.verify(Processor),
    //     (err) => err.message === `method 'process' must have exactly 1 parameter`);
    // });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9wcm9jZXNzb3Iuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQSxTQUFTLHdCQUFULEVBQW1DLE1BQU07QUFDdkMsS0FBRywyQ0FBSCxFQUFnRCxNQUFNO0FBQ3BELFVBQU0sZUFBZSxvQkFBdUIsbUJBQXZCLENBRCtCOztBQUdwRCxxQkFBTyxTQUFQLENBQWlCLFlBQWpCLEVBQStCLENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0IsV0FBeEIsRUFBcUMsUUFBckMsQ0FBL0IsRUFIb0Q7R0FBTixDQUFoRCxDQUR1Qzs7QUFPdkMsV0FBUyxZQUFULEVBQXVCLE1BQU07QUFDM0IsT0FBRyxnQkFBSCxFQUFxQixNQUFNO1VBQ25CLFlBQU4sTUFBTSxTQUFOLENBQWdCO0FBQ2QsZ0JBQVEsTUFBUixFQUFnQjtBQUNkLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEYztTQUFoQjtPQURGLENBRHlCOzs7QUFPekIsMEJBQXVCLE1BQXZCLENBQThCLFNBQTlCLEVBUHlCO0tBQU4sQ0FBckIsQ0FEMkI7O0FBVzNCLE9BQUcseUNBQUgsRUFBOEMsTUFBTTtVQUM1QyxZQUFOLE1BQU0sU0FBTixDQUFnQixFQUFoQixDQURrRDs7O0FBSWxELHVCQUFPLE1BQVAsQ0FDRSxNQUFNLG9CQUF1QixNQUF2QixDQUE4QixTQUE5QixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0Isb0NBQWhCLENBRlgsQ0FKa0Q7S0FBTixDQUE5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVgyQixHQUFOLENBQXZCLENBUHVDO0NBQU4sQ0FBbkMiLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L3R5cGVzL3Byb2Nlc3Nvci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5pbXBvcnQgUHJvY2Vzc29yQ29tcG9uZW50VHlwZSBmcm9tICcuL3Byb2Nlc3Nvcic7XG5cblxuZGVzY3JpYmUoJ1Byb2Nlc3NvckNvbXBvbmVudFR5cGUnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgd2hpdGVsaXN0IGFsbG93ZWQgaW5qZWN0YWJsZSB0eXBlcycsICgpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkVHlwZXMgPSBQcm9jZXNzb3JDb21wb25lbnRUeXBlLmluamVjdFR5cGVXaGl0ZWxpc3Q7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKGFsbG93ZWRUeXBlcywgWydCZWhhdmlvcicsICdNdXRhdG9yJywgJ1Byb2Nlc3NvcicsICdWaWV3ZXInXSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2YWxpZGF0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc3VjY2VlZCcsICgpID0+IHtcbiAgICAgIGNsYXNzIFByb2Nlc3NvciB7XG4gICAgICAgIHByb2Nlc3Moc2lnbmFsKSB7XG4gICAgICAgICAgdGhpcy5zaWduYWwgPSBzaWduYWw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgUHJvY2Vzc29yQ29tcG9uZW50VHlwZS52ZXJpZnkoUHJvY2Vzc29yKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBpZiBcInByb2Nlc3NcIiBtZXRob2QgbWlzc2luZycsICgpID0+IHtcbiAgICAgIGNsYXNzIFByb2Nlc3NvciB7XG4gICAgICB9XG5cbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+IFByb2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KFByb2Nlc3NvciksXG4gICAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSAnbWV0aG9kIFxcJ3Byb2Nlc3NcXCcgbXVzdCBiZSBkZWZpbmVkJyk7XG4gICAgfSk7XG5cbiAgICAvLyBpdCgnc2hvdWxkIGZhaWwgaWYgXCJwcm9jZXNzXCIgbWV0aG9kIGhhcyBsZXNzIHRoYW4gMSBwYXJhbWV0ZXInLCAoKSA9PiB7XG4gICAgLy8gICBjbGFzcyBQcm9jZXNzb3Ige1xuICAgIC8vICAgICBwcm9jZXNzKCkge1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IFByb2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KFByb2Nlc3NvciksXG4gICAgLy8gICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgbWV0aG9kICdwcm9jZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICAgIC8vXG4gICAgLy8gaXQoJ3Nob3VsZCBmYWlsIGlmIFwicHJvY2Vzc1wiIG1ldGhvZCBoYXMgbW9yZSB0aGFuIDEgcGFyYW1ldGVyJywgKCkgPT4ge1xuICAgIC8vICAgY2xhc3MgUHJvY2Vzc29yIHtcbiAgICAvLyAgICAgcHJvY2VzcyhvbmUsIHR3bykge1xuICAgIC8vICAgICAgIHRoaXMub25lID0gb25lO1xuICAgIC8vICAgICAgIHRoaXMudHdvID0gdHdvO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IFByb2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KFByb2Nlc3NvciksXG4gICAgLy8gICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgbWV0aG9kICdwcm9jZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
