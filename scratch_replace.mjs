import fs from 'fs';
import path from 'path';

const srcDir = 'd:/Projects/Veyra/src';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace backgrounds
      content = content.replace(/bg-\[#([0-9a-fA-F]{6})\](?:\/(\d+))?/g, (match, hex, opacity) => {
        const op = opacity ? `/${opacity}` : '';
        // If it's a very dark color (mostly black/dark brown), map to white
        if (['0e0c09', '15120d', '16130e', '14110d', '110f0c', '11100d', '0d0c0a', '0a0907'].includes(hex.toLowerCase())) {
          return `bg-[#fdfbf7]${op}`;
        }
        // If it's a medium dark color, map to beige/light gray
        if (['2a2218', '201a13', '221c15', '251f17', '1c1712', '1f1913', '17130e', '1d1812', '1b1712', '32281d', '211b14', '1a1510'].includes(hex.toLowerCase())) {
          return `bg-white${op}`;
        }
        return `bg-[#fcfaf6]${op}`;
      });

      // Replace text colors
      content = content.replace(/text-\[#([0-9a-fA-F]{6})\]/g, (match, hex) => {
        if (['f5efe3', 'f6efe1', 'ffffff'].includes(hex.toLowerCase())) {
          return 'text-[#2c2825]';
        }
        if (['d3c7b2', 'dacfb9', 'd6cab5', 'dac9ab'].includes(hex.toLowerCase())) {
          return 'text-[#5c554d]';
        }
        return 'text-[#3d3833]';
      });

      // Replace border colors
      content = content.replace(/border-\[#([0-9a-fA-F]{6})\](?:\/(\d+))?/g, (match, hex, opacity) => {
        const op = opacity ? `/${opacity}` : '';
        return `border-[#e3dcd1]${op}`;
      });

      // Fix specific hardcoded shadows
      content = content.replace(/shadow-\[0_([0-9]+px)_([0-9]+px)_rgba\([0-9,]+,0\.[0-9]+\)\]/g, (match, y, blur) => {
        return `shadow-[0_${y}_${blur}_rgba(44,40,37,0.06)]`;
      });
      content = content.replace(/shadow-\[0_0_([0-9]+px)_rgba\([0-9,]+,0\.[0-9]+\)\]/g, (match, blur) => {
        return `shadow-[0_0_${blur}_rgba(44,40,37,0.04)]`;
      });

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir(srcDir);
console.log('Replacement complete.');
