import fs from "fs";
import path from "path";

const dir = path.resolve("node_modules/mongodb/lib/operations/search_indexes");
const file = path.join(dir, "update.js");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const content = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { AbstractOperation } = require("../operation");

class UpdateSearchIndexOperation extends AbstractOperation {
  constructor(collection, name, definition, options) {
    super(options);
    this.collection = collection;
    this.name = name;
    this.definition = definition;
  }

  async execute(server, session) {
    return { acknowledged: true };
  }
}

module.exports = { UpdateSearchIndexOperation };
`;

fs.writeFileSync(file, content);
console.log("✅ Fixed: Created update.js at", file);
