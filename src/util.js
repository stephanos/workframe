export function isComponent(input) {
  return input.namespace !== undefined
    && input.type !== undefined
    && input.id !== undefined;
}
