import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const assetGroups = [
  {
    outputDir: path.join(rootDir, "public", "figma", "thank-you"),
    assets: [
      {
        baseName: "hero-pets",
        url: "https://www.figma.com/api/mcp/asset/1b90ac89-e586-47dd-8cbf-b3d3a26e1291",
      },
    ],
  },
  {
    outputDir: path.join(rootDir, "public", "figma", "contact-us"),
    assets: [
      {
        baseName: "studio-visual",
        url: "https://www.figma.com/api/mcp/asset/2b723f4f-e698-42e2-ba75-d561fd06943a",
      },
    ],
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

async function downloadAsset(outputDir, { baseName, url }) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${baseName}: ${response.status} ${response.statusText}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const extension = inferExtension(response.headers.get("content-type"), bytes);
  const fileName = `${baseName}.${extension}`;

  await writeFile(path.join(outputDir, fileName), bytes);

  return {
    baseName,
    fileName,
    outputDir: path.relative(rootDir, outputDir),
  };
}

const results = [];

for (const group of assetGroups) {
  await mkdir(group.outputDir, { recursive: true });

  for (const asset of group.assets) {
    results.push(await downloadAsset(group.outputDir, asset));
  }
}

console.table(results);
