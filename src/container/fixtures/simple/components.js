import { Component, Inject } from '../../component2/decorators';

export class ServiceA {
  depB;
}
Reflect.defineMetadata('decorator', [{ type: Component, parameters: [] }], ServiceA);
Reflect.defineMetadata('decorator', [{ type: Inject, parameters: [] }], ServiceA, 'depB');

export class ServiceB {
  depC;
}
Reflect.defineMetadata('decorator', [{ type: Component, parameters: [] }], ServiceB);
Reflect.defineMetadata('decorator', [{ type: Inject, parameters: [] }], ServiceB, 'depC');

export class ServiceC {}
Reflect.defineMetadata('decorator', [{ type: Component, parameters: [] }], ServiceC);

export class UtilD {}
