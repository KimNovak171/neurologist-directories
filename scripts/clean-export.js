const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");

if (!fs.existsSync(outDir)) {
  process.exit(0);
}

function walkAndDeleteTxt(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndDeleteTxt(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (ext.toLowerCase() === ".txt") {
        if (entry.name.toLowerCase() === "robots.txt") {
          continue;
        }
        fs.unlinkSync(fullPath);
      }
    }
  }
}

walkAndDeleteTxt(outDir);
