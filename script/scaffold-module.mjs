import { mkdirSync, writeFileSync, readFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const SRC = join(import.meta.dirname, "..", "src");
const MODULES = join(SRC, "modules");
const ROUTES_FILE = join(SRC, "routes.tsx");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function kebabToPascal(str) {
  return str
    .split("-")
    .map(capitalize)
    .join("");
}

function kebabToCamel(str) {
  const pascal = kebabToPascal(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function createModule(name) {
  const dir = join(MODULES, name);

  mkdirSync(join(dir, "components"), { recursive: true });
  mkdirSync(join(dir, "services"), { recursive: true });
  mkdirSync(join(dir, "css"), { recursive: true });

  writeFileSync(
    join(dir, `${name}.tsx`),
    `import "./css/${name}.css";\n\nfunction ${kebabToPascal(name)}() {\n  return (\n    <div className="${name}">\n      <h1>${kebabToPascal(name)}</h1>\n    </div>\n  );\n}\n\nexport default ${kebabToPascal(name)};\n`
  );

  writeFileSync(join(dir, `${name}.json`), "{}\n");

  writeFileSync(join(dir, "components", "index.ts"), "export {};\n");

  writeFileSync(join(dir, "services", "index.ts"), "export {};\n");

  writeFileSync(join(dir, "css", `${name}.css`), `.${name} {\n}\n`);

  // Append route under the Layout's children array
  const componentName = kebabToPascal(name);
  const importLine = `import ${componentName} from "./modules/${name}/${name}";\n`;
  const routeEntry = `        { path: "/${name}", element: <${componentName} /> },\n`;

  const routesContent = readFileSync(ROUTES_FILE, "utf-8");
  if (!routesContent.includes(importLine.trim())) {
    // Insert import before the last import
    const lastImportIdx = routesContent.lastIndexOf("import ");
    const endOfLine = routesContent.indexOf("\n", lastImportIdx);
    const updated =
      routesContent.slice(0, endOfLine + 1) +
      importLine +
      routesContent.slice(endOfLine + 1);
    // Append route entry before the closing of the children array (];)
    const closingIdx = updated.lastIndexOf("];");
    const final =
      updated.slice(0, closingIdx) + routeEntry + updated.slice(closingIdx);
    writeFileSync(ROUTES_FILE, final);
  }

  console.log(`Created module: ${name}`);
  console.log(`  ${dir}`);
  console.log(`  Route: /${name}`);
}

function createPage(parent, name) {
  const parentDir = join(MODULES, parent);
  const dir = join(parentDir, name);

  mkdirSync(join(dir, "css"), { recursive: true });

  const componentName = `${kebabToPascal(parent)}${kebabToPascal(name)}`;
  const className = `${parent}-${name}`;

  writeFileSync(
    join(dir, "page.tsx"),
    `import "./css/page.css";\n\nfunction ${componentName}() {\n  return (\n    <div className="${className}">\n      <h2>${componentName}</h2>\n    </div>\n  );\n}\n\nexport default ${componentName};\n`
  );

  writeFileSync(join(dir, "page.json"), "{}\n");

  writeFileSync(join(dir, "css", "page.css"), `.${className} {\n}\n`);

  // Append route under the Layout's children array
  const importLine = `import ${componentName} from "./modules/${parent}/${name}/page";\n`;
  const routeEntry = `        { path: "/${parent}/${name}", element: <${componentName} /> },\n`;

  const routesContent = readFileSync(ROUTES_FILE, "utf-8");
  if (!routesContent.includes(importLine.trim())) {
    const lastImportIdx = routesContent.lastIndexOf("import ");
    const endOfLine = routesContent.indexOf("\n", lastImportIdx);
    const updated =
      routesContent.slice(0, endOfLine + 1) +
      importLine +
      routesContent.slice(endOfLine + 1);
    const closingIdx = updated.lastIndexOf("];");
    const final =
      updated.slice(0, closingIdx) + routeEntry + updated.slice(closingIdx);
    writeFileSync(ROUTES_FILE, final);
  }

  console.log(`Created page: ${parent}/${name}`);
  console.log(`  ${dir}`);
  console.log(`  Route: /${parent}/${name}`);
}

// CLI
const [command, ...args] = process.argv.slice(2).filter((a) => a !== "--");

if (command === "module" && args.length >= 1) {
  createModule(args[0]);
} else if (command === "page" && args.length >= 2) {
  createPage(args[0], args[1]);
} else {
  console.log("Usage:");
  console.log("  npm run scaffold module <name>         Create a new module");
  console.log("  npm run scaffold page <parent> <name>  Create a sub-page");
}
