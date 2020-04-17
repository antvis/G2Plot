const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const renderString = nunjucks.renderString;
nunjucks.configure({
  autoescape: false,
});
const htmlTemplate = fs.readFileSync(path.join(__dirname, '../demos/template/page.njk'), 'utf-8');

function isFile(source) {
  return fs.lstatSync(source).isFile();
}

function trimJS(source) {
  let start = 0;
  let end = 0;
  for (let i = 0; i < source.length; i++) {
    const line = source[i].trim();
    if (!line || line.startsWith('//')) {
      start++;
    } else {
      break;
    }
  }

  for (let i = source.length - 1; i > 0; i--) {
    const line = source[i].trim();
    if (!line || line.startsWith('//') || line === 'export {}' || line === 'export {};') {
      end++;
    } else {
      break;
    }
  }

  return source.slice(start, source.length - end);
}

function composeHtml(filename) {
  const tabs = new Array(6).fill(' ').join('');
  const js = fs.readFileSync(filename, 'utf-8').split('\n');
  const title = js.shift().slice(3);
  const html = renderString(htmlTemplate, {
    content: trimJS(js)
      .map((item) => `${tabs}${item}`)
      .join('\n'),
    title,
  });

  return html;
}

function getFiles(source) {
  return fs
    .readdirSync(source)
    .map(function (name) {
      return path.join(source, name);
    })
    .filter(isFile);
}

exports.index = function (req, res) {
  const demoFiles = getFiles(path.join(__dirname, '../demos'))
    .filter((filename) => {
      return path.extname(filename) === '.ts';
    })
    .map((filename) => {
      const bn = path.basename(filename, '.ts');
      const file = {
        screenshot: `/demos/assets/screenshots/${bn}.png`,
        basename: bn,
        content: composeHtml(filename),
        filename,
      };
      return file;
    });
  const template = fs.readFileSync(path.join(__dirname, '../demos/template/index.njk'), 'utf8');
  res.end(renderString(template, { demoFiles }));
};

exports.page = function (req, res) {
  const demoFiles = getFiles(path.join(__dirname, '../demos'))
    .filter((filename) => {
      return path.extname(filename) === '.ts';
    })
    .map((filename) => {
      return path.basename(filename, '.ts');
    });
  const { target } = req.params;
  if (demoFiles.includes(target)) {
    res.end(composeHtml(path.join(__dirname, `../demos/${target}.ts`)));
  } else {
    next();
  }
};
// module.exports = function(req, res, next) {
//   const demoFiles = getFiles(path.join(__dirname, '../demos')).filter((filename) => {
//     return path.extname(filename) === '.ts';
//   });
//   if (req.method === 'GET') {
//     if (req.url === '/demos/index.html' || req.url === '/demos') {
//       demoFiles.map((filename) => {
//         const bn = path.basename(filename, '.ts');
//         const file = {
//           screenshot: `/demos/assets/screenshots/${bn}.png`,
//           basename: bn,
//           content: composeHtml(filename),
//           filename,
//         };
//         return file;
//       });
//       const template = fs.readFileSync(path.join(__dirname, '../demos/template/index.njk'), 'utf8');
//       res.end(renderString(template, { demoFiles }));
//     } else {
//       if (/\/demos/(.)/req.url)
//       next();
//     }
//   } else {
//     next();
//   }
// };
