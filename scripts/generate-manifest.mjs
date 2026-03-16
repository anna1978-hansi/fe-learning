#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const contentRoot = process.argv[2] || "前端常见数据结构与算法";
const outputFile = "manifest.json";

const includeExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".md",
  ".txt",
  ".json",
  ".css",
  ".html",
]);

const ignoreDirs = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".idea",
  ".vscode",
]);

function normalizeToPosix(p) {
  return p.split(path.sep).join("/");
}

async function walk(dirAbs, list) {
  const entries = await fs.readdir(dirAbs, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".nojekyll") continue;
    if (ignoreDirs.has(entry.name)) continue;

    const absPath = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      await walk(absPath, list);
      continue;
    }
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!includeExtensions.has(ext)) continue;

    const relativePath = normalizeToPosix(path.relative(repoRoot, absPath));
    list.push(relativePath);
  }
}

async function main() {
  const contentRootAbs = path.join(repoRoot, contentRoot);
  try {
    await fs.access(contentRootAbs);
  } catch {
    console.error(`找不到目录: ${contentRoot}`);
    process.exit(1);
  }

  const files = [];
  await walk(contentRootAbs, files);
  files.sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));

  const payload = {
    generatedAt: new Date().toISOString(),
    contentRoot: normalizeToPosix(contentRoot),
    fileCount: files.length,
    files,
  };

  await fs.writeFile(
    path.join(repoRoot, outputFile),
    JSON.stringify(payload, null, 2) + "\n",
    "utf8"
  );

  console.log(`manifest 已生成: ${outputFile}（共 ${files.length} 个文件）`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

