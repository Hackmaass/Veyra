import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Going to localhost...");
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  
  console.log("Waiting for splineApp...");
  await page.waitForFunction('!!window.splineApp', { timeout: 15000 }).catch(e => console.log("Timeout waiting for splineApp"));
  
  console.log("Evaluating...");
  const result = await page.evaluate(() => {
    const app = window.splineApp;
    if (!app) return { error: "No app found" };
    
    const variables = typeof app.getVariables === 'function' ? app.getVariables() : 'No variables API';
    
    const objs = [];
    const allNames = [];
    const traverse = (o) => {
       if (!o) return;
       if (o.name) allNames.push({ name: o.name, type: o.type });
       if (o.type === 'Text' || (o.name && o.name.toLowerCase().includes('text'))) {
          objs.push({ name: o.name, type: o.type, text: o.text || o.content });
       }
       if (o.children) {
          o.children.forEach(traverse);
       }
    };
    
    if (app._scene) traverse(app._scene);
    else if (app.scene) traverse(app.scene);
    
    let runtimeObjects = [];
    if (app.getObjects) {
       runtimeObjects = app.getObjects().map(o => ({name: o.name, type: o.type}));
    }
    
    return { variables, objs, allNames: allNames.filter(n => n.type === 'Text'), runtimeObjects: runtimeObjects.filter(n => n.type === 'Text') };
  });
  
  console.log("RESULTS:", JSON.stringify(result, null, 2));
  await browser.close();
})();
