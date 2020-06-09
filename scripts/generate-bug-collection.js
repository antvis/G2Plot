/**
 * 生成 bug 收集
 */

const path = require('path');
const fs = require('fs');

// eslint-disable-next-line no-undef
const resolve = (pathname) => path.join(__dirname, pathname);

function isFile(source) {
  return fs.lstatSync(source).isFile();
}

function getFiles(source) {
  return fs
    .readdirSync(source)
    .map(function (name) {
      return path.join(source, name);
    })
    .filter(isFile);
}

function generateFile() {
  const targetFilePathname = resolve('../__tests__/bugs/collection-spec.ts');
  // 清空文件
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.writeFile(targetFilePathname, '', {}, () => {});
  fs.appendFile(
    targetFilePathname,
    `setInterval(() => {
      const dom = document.querySelector('#__jest-electron-test-results__');
      if (dom && document.body.contains(dom)) {
        document.body.removeChild(dom);
      }
    }, 100);\n`,
    {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {}
  );
  const files = getFiles(resolve('../__tests__/bugs'));
  files.forEach((file) => {
    const data = fs.readFileSync(file, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fs.appendFile(targetFilePathname, data, {}, () => {});
  });
}

generateFile();
