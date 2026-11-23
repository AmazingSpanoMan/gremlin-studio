import fs from "fs/promises";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.resolve(__filename, "../..");

async function generateReleaseData() {
  const dataFilePath = path.resolve(__dirname, "src", "data", "release-data.json");
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });

  try {
    const response = await fetch(
      "https://api.github.com/repos/zmkfirmware/zmk-studio/releases/latest",
      {
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {},
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    await fs.writeFile(dataFilePath, JSON.stringify(data));
    console.log("Release data generated successfully!");
  } catch (error) {
    console.warn("Could not fetch release data, writing fallback:", error);
    try {
      await fs.access(dataFilePath);
    } catch {
      await fs.writeFile(
        dataFilePath,
        JSON.stringify({ tag_name: "v0.4.0", assets: [] })
      );
    }
  }
}

generateReleaseData();
