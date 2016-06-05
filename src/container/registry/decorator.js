/* eslint no-param-reassign: 0 */
export default function Inject() {
  return (target, key, descriptor) => {
    descriptor.writable = true;
    return descriptor;
  };
}
