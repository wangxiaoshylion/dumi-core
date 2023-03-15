/*
 * @Descripttion:
 * @version:
 * @Author: tangshuo
 * @Date: 2023-03-02 11:23:29
 * @LastEditors: tangshuo
 * @LastEditTime: 2023-03-02 11:26:10
 */
const { readdirSync, existsSync, writeFileSync } = require("fs");
const { join } = require("path");
const prettier = require("prettier");

let packagesPath = join(__dirname, "../packages");
const pkgList = readdirSync(packagesPath)
  .filter((pkg) => pkg.charAt(0) !== ".")
  .map((pkg) => {
    const package_path = join(packagesPath, pkg);
    const existsPackage = existsSync(join(package_path, "package.json"));
    if (!existsPackage) {
      return null;
    }
    const json = require(join(package_path, "package.json"));
    return {
      name: json.name,
      version: json.version,
    };
  });

const file_content = `

export const version = {
    ${pkgList
      .map((pak) => {
        return `"${pak.name}": '${pak.version}'`;
      })
      .join(",\n    ")}    
}
`;

writeFileSync(
  join(packagesPath, "components", "/src/version.ts"),
  prettier.format(file_content, { parser: "typescript" }).toString(),
);
