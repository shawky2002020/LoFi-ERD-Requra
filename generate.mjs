import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screens = [
  "Landing", "Login", "Register", "Dashboard", "NewProject", "Upload", "Processing",
  "Results", "StoryDetail", "Export", "StakeholderView", "Settings"
];

const jsxSource = fs.readFileSync(path.join(__dirname, 'src', 'App.jsx'), 'utf8');

let cleanJsx = jsxSource.replace(/import\s*{.*}\s*from\s*['"]react['"];?/g, '');
cleanJsx = cleanJsx.replace(/export\s+default\s+/g, '');

const outputHtmlDir = path.join(__dirname, 'screens_html');
const outputImgDir = path.join(__dirname, 'screenshots');

if (!fs.existsSync(outputHtmlDir)) fs.mkdirSync(outputHtmlDir);
if (!fs.existsSync(outputImgDir)) fs.mkdirSync(outputImgDir);

(async () => {
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];
    const fileName = `${(i+1).toString().padStart(2, '0')}_${screen}`;
    
    // Set the initial state to the current screen
    const modifiedJsx = cleanJsx.replace(/useState\("Landing"\)/, `useState("${screen}")`);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${screen} - Requra Prototype</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; padding: 0; font-family: monospace; background-color: #fafafa; }
    * { box-sizing: border-box; }
    /* Hide the navigation bar at the bottom */
    #root > div > div:first-child { display: none !important; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React;
    ${modifiedJsx}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;

    const htmlPath = path.join(outputHtmlDir, `${fileName}.html`);
    fs.writeFileSync(htmlPath, html);
    console.log(`Saved ${htmlPath}`);

    // Windows paths in file:// URIs need careful formatting
    const fileUri = 'file:///' + htmlPath.replace(/\\/g, '/');
    console.log(`Navigating to ${fileUri}...`);
    
    await page.goto(fileUri, { waitUntil: 'networkidle0' });
    
    try {
        await page.waitForFunction('document.querySelector("#root").children.length > 0', { timeout: 10000 });
        await new Promise(r => setTimeout(r, 800)); // give extra time for components to settle
    } catch(e) {
        console.error("Timeout waiting for React to render on " + screen);
    }

    const screenshotPath = path.join(outputImgDir, `${fileName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot ${screenshotPath}`);
  }

  await browser.close();
  console.log('All generations and screenshots completed successfully!');
})();
