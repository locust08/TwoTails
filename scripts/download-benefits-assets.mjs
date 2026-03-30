import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "figma", "benefits");

const assets = [
  {
    baseName: "hero-bg",
    url: "https://www.figma.com/api/mcp/asset/62c6ecef-c83f-41a0-af3c-21031cc2f5ac",
  },
  {
    baseName: "hero-chevron",
    url: "https://www.figma.com/api/mcp/asset/8b9557c9-2dae-4052-bca2-a92fdcf568c8",
  },
  {
    baseName: "icon-sensitive",
    url: "https://www.figma.com/api/mcp/asset/191e14a7-9a51-45f0-b5d3-459935596de5",
  },
  {
    baseName: "icon-protein-a",
    url: "https://www.figma.com/api/mcp/asset/7f3e6a1c-6a90-432e-b9f5-0e9a3fcfcb1a",
  },
  {
    baseName: "icon-protein-b",
    url: "https://www.figma.com/api/mcp/asset/68f18a0a-d103-4683-8c23-966978ed5059",
  },
  {
    baseName: "icon-omega",
    url: "https://www.figma.com/api/mcp/asset/393bd9ca-ff86-48d0-9507-58b9c5eff4e7",
  },
  {
    baseName: "icon-grain-free",
    url: "https://www.figma.com/api/mcp/asset/ec79566c-a927-4dc6-ad2e-20fc40cc6203",
  },
  {
    baseName: "icon-no-artificial",
    url: "https://www.figma.com/api/mcp/asset/94e071da-efa5-4356-b200-fd91bc429b5c",
  },
  {
    baseName: "ingredient-duck",
    url: "https://www.figma.com/api/mcp/asset/705ef78f-1c4e-463f-961a-1674906d3439",
  },
  {
    baseName: "ingredient-tuna",
    url: "https://www.figma.com/api/mcp/asset/2958434f-4d8f-40a1-84d6-139876b62625",
  },
  {
    baseName: "blend-bg",
    url: "https://www.figma.com/api/mcp/asset/36c07189-6d37-44c9-99b0-4973a8abca55",
  },
  {
    baseName: "check",
    url: "https://www.figma.com/api/mcp/asset/43acff3c-46f3-462b-8d16-f98c51a27cc6",
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
