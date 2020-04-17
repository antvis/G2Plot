const puppeteer = require('puppeteer');
const resemble = require('resemblejs');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

// const headless = process.argv[2] === '--headless';
const headless = false;
// TODO: 暂不支持 headless
// > headless 和 headful 产出的图片不一致。

const demoDir = path.resolve(__dirname, '../demos');

const snapshotDir = path.resolve(__dirname, '../demos/assets/screenshots');

const ignore = /(general|line-animation|gauge|liqiud|progress)/gi;

const htmls = fs
  .readdirSync(demoDir)
  .filter((item) => path.extname(item) === '.ts')
  .filter((filename) => {
    ignore.lastIndex = -1;
    return !ignore.test(filename);
  });

function ps() {
  let cb = null;
  const p = new Promise((resolve) => {
    cb = resolve;
  });
  return [p, cb];
}

function sleep(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 载入原始图片
function loadImg(src) {
  const img = new Image();
  const { clientHeight, clientWidth } = document.querySelector('#canvas canvas');
  img.height = clientHeight;
  img.width = clientWidth;
  img.src = src;
  document.body.appendChild(img);
}

// 添加action 按钮
function renderActions() {
  let pass;
  let unpass;
  const ps = new Promise((resolve, reject) => {
    pass = resolve;
    unpass = reject;
  });
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '20px';
  div.style.right = '20px';

  const passBtn = document.createElement('button');
  passBtn.innerHTML = '接受变更';
  passBtn.onclick = pass;
  div.appendChild(passBtn);
  const unpassBtn = document.createElement('button');
  unpassBtn.innerHTML = '不接受变更';
  unpassBtn.onclick = unpass;
  unpassBtn.style.marginLeft = '16px';
  div.appendChild(unpassBtn);
  document.body.appendChild(div);
  return ps;
}

/** 覆盖图片 并log */
function writeFile(pngPath, pngSource, name) {
  fs.writeFileSync(pngPath, pngSource, 'base64');
  console.log(colors.green(`wirte ${name}`));
}

const prefix = 'data:image/png;base64,';
function compare(source1, source2) {
  return new Promise((resolve) => {
    resemble(`${prefix}${source1}`)
      .compareTo(`${prefix}${source2}`)
      .ignoreAntialiasing()
      .onComplete((data) => {
        resolve(data);
      });
  });
}
puppeteer
  .launch({
    headless,
    defaultViewport: { width: 800, height: 600, deviceScaleFactor: 2 },
  })
  .then(async (browser) => {
    const pages = [];
    for await (const item of htmls) {
      const [load, cb] = ps();
      const page = await browser.newPage();
      page.on('load', cb);
      const name = path.basename(item, '.ts');
      await page.goto(`http://localhost:2046/demos/${name}.html`);
      await load;
      await sleep();
      const pngSource = await page.evaluate(function () {
        return document.querySelector('#canvas canvas').toDataURL().split(',')[1];
      });

      const pngPath = path.join(snapshotDir, `${name}.png`);
      if (!fs.existsSync(pngPath)) {
        writeFile(pngPath, pngSource, name);
        await page.close();
      } else {
        const old = fs.readFileSync(pngPath, 'base64');
        if (pngSource === old) {
          console.log(colors.green(`${name} is match`));
          await page.close();
        } else {
          const result = await compare(old, pngSource);
          if (result.rawMisMatchPercentage < 0.01) {
            console.log(colors.green(`${name} is matched`));
            await page.close();
          } else {
            if (!headless) {
              await page.evaluate(loadImg, `${prefix}${result.getBuffer().toString('base64')}`);
              await page.evaluate(loadImg, `${prefix}${old}`);
              pages.push(
                page
                  .evaluate(renderActions)
                  .then(() => {
                    writeFile(pngPath, pngSource, name);
                  })
                  .catch(() => {
                    console.log(colors.red(`${name} is not matched (${result.rawMisMatchPercentage})`));
                  })
                  .finally(async () => {
                    await page.close();
                  })
              );
            } else {
              console.log(colors.red(`${name} is not matched (${result.rawMisMatchPercentage})`));
              await page.close();
            }
          }
        }
      }
    }
    await Promise.all(pages);
    await browser.close();
  });
