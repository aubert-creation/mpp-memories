/**
 * @type {import('@remix-run/dev').AppConfig}
 */

const { getDependenciesToBundle } = require("@remix-run/dev");

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  //appDirectory: "app",
  //serverBuildTarget: "vercel",
  serverBuildDirectory: "server/build",
  serverDependenciesToBundle: [
    /^nanoid.*/,
    /^remark.*/,
    /^rehype.*/,
    /^unified.*/,
    /^micromark.*/,
    /^mdast.*/,
    /^@udecode\/plate-ui-dnd.*/,
    /^@udecode\/plate.*/,
    /^@udecode\/plate-serializer-md.*/,
    /^decode-named-character-reference.*/,
    /^character-entities.*/,
    /^unist-util-stringify-position.*/,
    /^character-reference-invalid.*/,
    /^is-decimal.*/,
    /^is-hexadecimal.*/,
    /^is-alphanumerical.*/,
    /^copy-to-clipboard.*/,
    /^unist-.*/,
    /^hast-util-parse-selector.*/,
    /^property-information.*/,
    /^hast-util-whitespace.*/,
    /^space-separated-tokens.*/,
    /^comma-separated-tokens.*/,
    /^zen-observable-ts.*/,
    /^ts-invariant.*/,
    /^zen-observable-ts.*/,
    /^is-alphabetical.*/,
    /^@sindresorhus\/slugify.*/,
    /^react-markdown.*/,
    /^micromark-util-symbol.*/,
    /^zwitch.*/,
    /^bail.*/,
    /^trough.*/,
    /^fault.*/,
    /^ccount.*/,
    /^parse-entities.*/,
    /^stringify-entities.*/,
    /^hastscript.*/,
    /^ts-invariant.*/,
    /^unist-util-map.*/,
    /^markdown-table.*/,
    /^longest-streak.*/,
    /^vfile.*/,
    /^vfile-message.*/,
    /^trim-lines.*/,
  ],

};