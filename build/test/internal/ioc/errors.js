'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let ResolveError = exports.ResolveError = class ResolveError extends Error {

  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ResolveError';
  }
};
let KeyError = exports.KeyError = class KeyError extends Error {

  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'KeyError';
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2lvYy9lcnJvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFBYSxzQ0FBTixNQUFNLFlBQU4sU0FBMkIsS0FBM0IsQ0FBaUM7O0FBRXRDLGNBQVksT0FBWixFQUFxQjtBQUNuQixVQUFNLE9BQU4sRUFEbUI7QUFFbkIsU0FBSyxPQUFMLEdBQWUsT0FBZixDQUZtQjtBQUduQixTQUFLLElBQUwsR0FBWSxjQUFaLENBSG1CO0dBQXJCO0NBRks7SUFTTSw4QkFBTixNQUFNLFFBQU4sU0FBdUIsS0FBdkIsQ0FBNkI7O0FBRWxDLGNBQVksT0FBWixFQUFxQjtBQUNuQixVQUFNLE9BQU4sRUFEbUI7QUFFbkIsU0FBSyxPQUFMLEdBQWUsT0FBZixDQUZtQjtBQUduQixTQUFLLElBQUwsR0FBWSxVQUFaLENBSG1CO0dBQXJCO0NBRksiLCJmaWxlIjoiaW50ZXJuYWwvaW9jL2Vycm9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBSZXNvbHZlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5uYW1lID0gJ1Jlc29sdmVFcnJvcic7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEtleUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMubmFtZSA9ICdLZXlFcnJvcic7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==