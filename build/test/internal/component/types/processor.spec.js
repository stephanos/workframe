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


      _assert2.default.throws(() => _processor2.default.verify(Processor), err => err.message === `method 'process' must be defined`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9wcm9jZXNzb3Iuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQSxTQUFTLHdCQUFULEVBQW1DLE1BQU07QUFDdkMsS0FBRywyQ0FBSCxFQUFnRCxNQUFNO0FBQ3BELFVBQU0sZUFBZSxvQkFBdUIsbUJBQXZCLENBRCtCOztBQUdwRCxxQkFBTyxTQUFQLENBQWlCLFlBQWpCLEVBQStCLENBQUMsVUFBRCxFQUFhLFNBQWIsRUFBd0IsV0FBeEIsRUFBcUMsUUFBckMsQ0FBL0IsRUFIb0Q7R0FBTixDQUFoRCxDQUR1Qzs7QUFPdkMsV0FBUyxZQUFULEVBQXVCLE1BQU07QUFDM0IsT0FBRyxnQkFBSCxFQUFxQixNQUFNO1VBQ25CLFlBQU4sTUFBTSxTQUFOLENBQWdCO0FBQ2QsZ0JBQVEsTUFBUixFQUFnQjtBQUNkLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEYztTQUFoQjtPQURGLENBRHlCOzs7QUFPekIsMEJBQXVCLE1BQXZCLENBQThCLFNBQTlCLEVBUHlCO0tBQU4sQ0FBckIsQ0FEMkI7O0FBVzNCLE9BQUcseUNBQUgsRUFBOEMsTUFBTTtVQUM1QyxZQUFOLE1BQU0sU0FBTixDQUFnQixFQUFoQixDQURrRDs7O0FBSWxELHVCQUFPLE1BQVAsQ0FDRSxNQUFNLG9CQUF1QixNQUF2QixDQUE4QixTQUE5QixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0IsQ0FBQyxnQ0FBRCxDQUFoQixDQUZYLENBSmtEO0tBQU4sQ0FBOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFYMkIsR0FBTixDQUF2QixDQVB1QztDQUFOLENBQW5DIiwiZmlsZSI6ImludGVybmFsL2NvbXBvbmVudC90eXBlcy9wcm9jZXNzb3Iuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IFByb2Nlc3NvckNvbXBvbmVudFR5cGUgZnJvbSAnLi9wcm9jZXNzb3InO1xuXG5cbmRlc2NyaWJlKCdQcm9jZXNzb3JDb21wb25lbnRUeXBlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHdoaXRlbGlzdCBhbGxvd2VkIGluamVjdGFibGUgdHlwZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgYWxsb3dlZFR5cGVzID0gUHJvY2Vzc29yQ29tcG9uZW50VHlwZS5pbmplY3RUeXBlV2hpdGVsaXN0O1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChhbGxvd2VkVHlwZXMsIFsnQmVoYXZpb3InLCAnTXV0YXRvcicsICdQcm9jZXNzb3InLCAnVmlld2VyJ10pO1xuICB9KTtcblxuICBkZXNjcmliZSgndmFsaWRhdGlvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBQcm9jZXNzb3Ige1xuICAgICAgICBwcm9jZXNzKHNpZ25hbCkge1xuICAgICAgICAgIHRoaXMuc2lnbmFsID0gc2lnbmFsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIFByb2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KFByb2Nlc3Nvcik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgaWYgXCJwcm9jZXNzXCIgbWV0aG9kIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBQcm9jZXNzb3Ige1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiBQcm9jZXNzb3JDb21wb25lbnRUeXBlLnZlcmlmeShQcm9jZXNzb3IpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYG1ldGhvZCAncHJvY2VzcycgbXVzdCBiZSBkZWZpbmVkYCk7XG4gICAgfSk7XG5cbiAgICAvLyBpdCgnc2hvdWxkIGZhaWwgaWYgXCJwcm9jZXNzXCIgbWV0aG9kIGhhcyBsZXNzIHRoYW4gMSBwYXJhbWV0ZXInLCAoKSA9PiB7XG4gICAgLy8gICBjbGFzcyBQcm9jZXNzb3Ige1xuICAgIC8vICAgICBwcm9jZXNzKCkge1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IFByb2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KFByb2Nlc3NvciksXG4gICAgLy8gICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgbWV0aG9kICdwcm9jZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICAgIC8vXG4gICAgLy8gaXQoJ3Nob3VsZCBmYWlsIGlmIFwicHJvY2Vzc1wiIG1ldGhvZCBoYXMgbW9yZSB0aGFuIDEgcGFyYW1ldGVyJywgKCkgPT4ge1xuICAgIC8vICAgY2xhc3MgUHJvY2Vzc29yIHtcbiAgICAvLyAgICAgcHJvY2VzcyhvbmUsIHR3bykge1xuICAgIC8vICAgICAgIHRoaXMub25lID0gb25lO1xuICAgIC8vICAgICAgIHRoaXMudHdvID0gdHdvO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IFByb2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KFByb2Nlc3NvciksXG4gICAgLy8gICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgbWV0aG9kICdwcm9jZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
