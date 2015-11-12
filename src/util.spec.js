import assert from 'assert';

import {isComponent} from './util';


describe('Util', () => {
  describe('validation', () => {
    it('should succeed for valid component', () => {
      class Behavior {
        static id = 'my-id';
        static type = 'my-type';
        static namespace = 'my-ns';
      }

      assert.ok(isComponent(Behavior));
    });

    it('should fail for input without id', () => {
      class Behavior {
        static type = 'my-type';
        static namespace = 'my-ns';
      }

      assert.ok(!isComponent(Behavior));
    });

    it('should fail for input without namespace', () => {
      class Behavior {
        static id = 'my-id';
        static type = 'my-type';
      }

      assert.ok(!isComponent(Behavior));
    });

    it('should fail for input without type', () => {
      class Behavior {
        static id = 'my-id';
        static namespace = 'my-ns';
      }

      assert.ok(!isComponent(Behavior));
    });
  });
});
