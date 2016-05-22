import path from 'path';
import requireDirectory from 'require-directory';


class Scanner {

  constructor(pickExport, ignoreFile) {
    this.pickExport = pickExport;
    this.ignoreFile = ignoreFile;
  }

  scan(filePath) {
    if (!path.isAbsolute(filePath)) {
      throw new Error('file path must be absolute');
    }

    const result = [];

    requireDirectory(module, filePath, {
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
