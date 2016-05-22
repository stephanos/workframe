import requireDirectory from 'require-directory';


class Scanner {

  constructor(pickExport, ignoreFile) {
    this.pickExport = pickExport;
    this.ignoreFile = ignoreFile;
  }

  scan(dirPath) {
    const result = [];

    requireDirectory(module, dirPath, {
      visit: (obj) => {
        Object.keys(obj).forEach((exportKey) => {
          const exportVal = obj[exportKey];
          if (this.pickExport(exportVal)) {
            result.push(exportVal);
          }
        });
      },
      exclude: this.ignoreFile,
    });

    return result;
  }
}


export default Scanner;
