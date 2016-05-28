async function transitionComponentState(container, state) {
  const promises = [];
  // Object.keys(items).forEach((key) => {
  //   if (!items.hasOwnProperty(key)) {
  //     return;
  //   }
  //
  //   const method = items[key][mode];
  //   if (!method) {
  //     return;
  //   }
  //
  //   promises.push(items[key]::method());
  // });
  await Promise.all(promises);
}


export {
  transitionComponentState,
};
