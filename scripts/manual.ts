/**
 * 同步所有 example/xx/basic 目录下所有 API 文档到 docs/manual/plots
 * @author kn
 */
const fs = require('fs');
const path = require('path');

const sourceFilePath = path.resolve('./site/examples');
const targetFilePath = path.resolve('./site/docs/manual/plots');
const excludeFilesPath = ['gallery']; // 不处理的路径
const includeFiles = ['API.zh.md', 'API.en.md'];

const apiGenerator = (sourcePath, targetPath, titlePath) => {
  // 内容不多，同步读取即可
  const titleInfo = fs.readFileSync(titlePath, 'utf-8');
  fs.writeFileSync(targetPath, `${titleInfo}\n`, { encoding: 'utf-8' });
  fs.readFile(sourcePath, 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
    }
    fs.appendFile(targetPath, data, (err) => {
      if (!err) {
        console.log(`${targetPath} 文件生成完毕`);
      }
    });
  });
};

/**
 * 文件扫描，获取所有 API.zh.md API.en.md 文件路径
 * @param {foldPath} string 扫描路径
 */
const scanFiles = (foldPath, dir) => {
  try {
    const files = fs.readdirSync(foldPath);
    files.forEach((fileName) => {
      const director = path.join(foldPath + '/', fileName);
      const stats = fs.statSync(director);
      if (stats.isDirectory()) {
        scanFiles(director, dir ? `${dir}.${fileName}` : fileName);
      }

      if (stats.isFile() && includeFiles.includes(fileName) && dir.indexOf('basic') !== -1) {
        const chartName = dir.split('.')[0];
        const lang = fileName.split('.')[1];
        if (!excludeFilesPath.includes(chartName)) {
          const apiSourcePath = path.resolve(__dirname, sourceFilePath, dir.split('.').join('/'), fileName);
          const titlePath = path.resolve(__dirname, sourceFilePath, dir.split('.').join('/'), `index.${lang}.md`);
          const apiTargetPath = path.resolve(__dirname, targetFilePath, `${chartName}.${lang}.md`);
          apiGenerator(apiSourcePath, apiTargetPath, titlePath);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// @ts-ignore
scanFiles(sourceFilePath);
