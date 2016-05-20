import requireDirectory from 'require-directory';


function scan(module, pickExport, ignoreFile) {
  const result = [];

  requireDirectory(module, {
    visit: (obj) => {
      Object.keys(obj).forEach((exportKey) => {
        const exportVal = obj[exportKey];
        if (pickExport(exportVal)) {
          result.push(exportVal);
        }
      });
    },
    exclude: ignoreFile, // (path) => /.\.spec.js$/.test(path), // TODO: make configurable
  });

  return result;
}


export default scan;
