import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "figma", "feeding");

const assets = [
  { baseName: "hero-bg", url: "https://www.figma.com/api/mcp/asset/7febfb0c-2bb7-491e-811c-321e62a8dacd" },
  { baseName: "enjoy-photo", url: "https://www.figma.com/api/mcp/asset/6ae1f8c8-bca7-4687-b27f-0354cf99a17f" },
  { baseName: "enjoy-stars", url: "https://www.figma.com/api/mcp/asset/67599761-c2b8-4715-a08b-741310a46aab" },
  { baseName: "icon-serve-treat", url: "https://www.figma.com/api/mcp/asset/f1156031-9159-43fa-a6a0-3932a21741bd" },
  { baseName: "icon-reward-moments", url: "https://www.figma.com/api/mcp/asset/b5399116-75bc-40a6-83e6-a8dd5e66af55" },
  { baseName: "icon-dogs-cats", url: "https://www.figma.com/api/mcp/asset/e9e03f1b-39f0-4f6f-83eb-7715233ab019" },
  { baseName: "icon-life-stages", url: "https://www.figma.com/api/mcp/asset/77dc9cc5-c722-46c3-ab28-fe33c4704bbe" },
  { baseName: "routine-cat", url: "https://www.figma.com/api/mcp/asset/1ed7ca63-ed59-407d-9e04-27ff9c9b8cab" },
  { baseName: "routine-small-dog", url: "https://www.figma.com/api/mcp/asset/e136b306-869d-4f1c-b609-5e26758d4627" },
  { baseName: "routine-large-dog", url: "https://www.figma.com/api/mcp/asset/6c52b933-91eb-484d-baa8-0624809776c1" },
  { baseName: "icon-prepare-serve-dry", url: "https://www.figma.com/api/mcp/asset/d50696c3-b458-4f1b-a64b-43af46c5d138" },
  { baseName: "icon-prepare-rehydrate", url: "https://www.figma.com/api/mcp/asset/e1e644ea-3f4c-44f3-aa72-fcdcd26616c4" },
  { baseName: "icon-tip-calories", url: "https://www.figma.com/api/mcp/asset/d42883a0-4f60-4c66-83ea-143e9c6f057e" },
  { baseName: "icon-tip-monitor", url: "https://www.figma.com/api/mcp/asset/7462bb9f-0165-4c6e-aa19-4c72aa9034e9" },
  { baseName: "icon-tip-water", url: "https://www.figma.com/api/mcp/asset/6076affc-f9d7-421d-a32c-545369483df8" },
  { baseName: "suitable-photo", url: "https://www.figma.com/api/mcp/asset/8c263486-8ed5-4d75-babe-b7e269199048" },
  { baseName: "storage-photo", url: "https://www.figma.com/api/mcp/asset/c33012b2-d787-4c44-96c0-6af9df431667" },
  { baseName: "icon-storage-cool", url: "https://www.figma.com/api/mcp/asset/9204e345-1ad4-44f6-86c4-9ff46868434d" },
  { baseName: "icon-storage-reseal", url: "https://www.figma.com/api/mcp/asset/950eeda3-dcc2-4d30-bedc-09d126dea91c" },
  { baseName: "icon-storage-pack", url: "https://www.figma.com/api/mcp/asset/5b8167fa-eff0-4920-a5f1-96b022dd6ddd" },
  { baseName: "icon-faq-suitability", url: "https://www.figma.com/api/mcp/asset/afc9c6f0-297b-4e4b-bde6-d815729de385" },
  { baseName: "icon-faq-puppies", url: "https://www.figma.com/api/mcp/asset/fc748059-9030-4cc6-a829-285ae4ffc0d6" },
  { baseName: "icon-faq-ingredients", url: "https://www.figma.com/api/mcp/asset/abd0ec16-5dbd-4b67-abd2-c59be7032c51" },
  { baseName: "icon-faq-grain-free", url: "https://www.figma.com/api/mcp/asset/a45b2821-7d9b-469e-9314-361486f59e23" },
  { baseName: "icon-faq-additives", url: "https://www.figma.com/api/mcp/asset/72a68dd4-0cff-47e2-a9fb-49abfe9d8a31" },
  { baseName: "icon-faq-sensitivities", url: "https://www.figma.com/api/mcp/asset/adcd1115-d822-485c-94b1-ff5dc787ff83" },
  { baseName: "icon-faq-meal", url: "https://www.figma.com/api/mcp/asset/547e3f17-eb35-4241-81a9-eeeb589cb720" },
  { baseName: "icon-faq-daily", url: "https://www.figma.com/api/mcp/asset/860f086e-5e81-4644-9589-598f12571d74" },
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
