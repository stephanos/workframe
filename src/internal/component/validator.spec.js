import assert from 'assert';
import where from 'data-driven';

import Validator from './validator';


class MyComponent {}
const validator = new Validator();

describe('Validator', () => {
  describe('validation of "name"', () => {
    it('should succeed for valid value', () => {
      validator.validateName(MyComponent, 'name');
    });

    where([
      { value: undefined }, { value: 0 }, { value: null }, { value: '' },
      { value: 'invalid-name' }, { value: 'invalid_name' }, { value: 'invalid:name' },
    ], () => {
      it('should fail for invalid value', (ctx) => {
        assert.throws(
          () => validator.validateName(MyComponent, ctx.value),
          (err) => err.message === `invalid component: '${ctx.value}' must be string with characters only`);
      });
    });
  });

  describe('validation of "dependencies"', () => {
    const MyType = {
      injectTypeWhitelist: ['Type'],
    };

    it('should succeed for empty dependencies', () => {
      validator.validateDependencies(MyComponent, MyType, {});
    });

    it('should succeed for valid dependency', () => {
      validator.validateDependencies(MyComponent, MyType, {
        myDependency: {
          type: {
            typeName: 'Type',
          },
        },
      });
    });

    it('should fail for invalid dependency', () => {
      assert.throws(
        () => validator.validateDependencies(MyComponent, MyType, {
          myDependency: {
            name: 'MyDependency',
            type: {
              typeName: 'Invalid',
            },
          },
        }),
        (err) => err.message === `invalid dependency 'MyDependency' of 'myDependency' in 'MyComponent': type 'Invalid' is not allowed`);
    });
  });
});
