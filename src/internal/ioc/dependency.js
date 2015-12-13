// import uuid from '../util/uuid';
//
// const factoryKey = 'factory';
//
//
// class Dependency {
//
//   constructor(descriptor) {
//     this.descriptor = descriptor;
//   }
//
//   get factory() {
//     return this.descriptor[factoryKey];
//   }
//
//   set factory(Factory) {
//     if (this.descriptor[factoryKey]) {
//       throw new Error(`dependency already exists`);
//     }
//
//     this.descriptor[factoryKey] = Factory;
//     this.descriptor.initializer = (input) => null;
//   }
// }
//
//
// export default Dependency;
