const { execa } = require("execa");

async function execaStreaming(cmd, args = [], opts = {}) {
  // Stream stdio so the user sees underlying installer prompts/output
  await execa(cmd, args, { stdio: "inherit", ...opts });
}

module.exports = { execaStreaming };
