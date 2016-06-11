import path from 'path';
import requireDirectory from 'require-directory';


class Scanner {

  constructor(pickExport, ignoreFile) {
    this.pickExport = pickExport;
    this.ignoreFile = ignoreFile;
  }

  scan(rootDir) {
    if (!path.isAbsolute(rootDir)) {
      throw new Error('file path must be absolute');
    }

    const result = [];

    requireDirectory(module, rootDir, {
      visit: (obj) => {
        Object.keys(obj).forEach((exportKey) => {
          const exportVal = obj[exportKey];
          if (this.pickExport(exportVal)) {
            result.push(exportVal);
          }
        });
      },
      exclude: (filePath) => this.ignoreFile(filePath, rootDir),
    });

    return result;
  }
}


export default Scanner;
