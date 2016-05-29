/* eslint no-param-reassign: 0 */
export function Component() {
  return () => {};
}

export function Inject() {
  return (target, key, descriptor) => {
    descriptor.writable = true;
    return descriptor;
  };
}
