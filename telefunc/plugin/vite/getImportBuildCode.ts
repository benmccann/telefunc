export { getImportBuildCode }

function getImportBuildCode(): string {
  return `const { telefuncFiles } = require("./importTelefuncFiles.js");
const { __internal_setTelefuncFiles: setTelefuncFiles } = require("telefunc");
setTelefuncFiles(telefuncFiles);
`
}
