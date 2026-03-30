import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "figma", "about");

const assets = [
  {
    baseName: "hero-bg",
    url: "https://www.figma.com/api/mcp/asset/818f0e60-61d0-4c4b-83fe-456da60355bb",
  },
  {
    baseName: "freeze-stack",
    url: "https://www.figma.com/api/mcp/asset/10543205-7348-4878-86f3-a1dd9b9f9981",
  },
  {
    baseName: "ingredient-duck",
    url: "https://www.figma.com/api/mcp/asset/004aa6a2-8ba8-4cd2-8faf-1606e087e3e2",
  },
  {
    baseName: "ingredient-tuna",
    url: "https://www.figma.com/api/mcp/asset/ebd8f338-1a63-4f98-9b66-378e221668f0",
  },
];

function inferExtension(contentType, bytes) {
  const type = contentType?.toLowerCase() ?? "";

  if (type.includes("image/png")) return "png";
  if (type.includes("image/jpeg")) return "jpg";
  if (type.includes("image/webp")) return "webp";
  if (type.includes("image/svg+xml")) return "svg";

  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }

  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46
  ) {
    return "webp";
  }

  return "bin";
}

async function downloadAsset({ baseName, url }) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${baseName}: ${response.status} ${response.statusText}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const extension = inferExtension(response.headers.get("content-type"), bytes);
  const fileName = `${baseName}.${extension}`;
  const filePath = path.join(outputDir, fileName);

  await writeFile(filePath, bytes);

  return {
    baseName,
    contentType: response.headers.get("content-type") ?? "unknown",
    fileName,
  };
}

await mkdir(outputDir, { recursive: true });

const results = [];

for (const asset of assets) {
  results.push(await downloadAsset(asset));
}

console.table(results);
