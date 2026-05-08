// 自动为指定分类的文章注入加密密码
// 只需将文章归入对应分类，无需手动添加 password 字段
// 密码来源：环境变量 > .env 文件（本地开发用）

const fs = require("fs");
const path = require("path");

// 读取 .env 文件（仅本地开发用）
function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env");
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...val] = trimmed.split("=");
      env[key.trim()] = val.join("=").trim();
    }
  }
  return env;
}

const fileEnv = loadEnvFile();

// 优先使用环境变量（GitHub Actions），其次使用 .env 文件
const defaultPasswords = {
  暑期实习面经: process.env.ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE || fileEnv["ENCRYPT_SUMMERINTERNSHIPINTERVIEWEXPERIENCE"] || "",
  // 可添加更多分类：
  // '日记': process.env.ENCRYPT_日记 || fileEnv['ENCRYPT_日记'] || '',
};

hexo.extend.filter.register("before_post_render", function (data) {
  if (data.password) return data;

  const cats = data.categories;
  if (cats && cats.length) {
    const catNames = cats.map((c) => (typeof c === "string" ? c : c.name));

    for (const [cat, pwd] of Object.entries(defaultPasswords)) {
      if (catNames.includes(cat)) {
        data.password = pwd;
        break;
      }
    }
  }

  return data;
});
