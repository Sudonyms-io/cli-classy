//import { ParsedTokenTypes, ParsedTokenFlags, ParsedToken } from "@sudo-nymd/text-parser";
import { ParsedTokenTypes, ParsedTokenFlags, ParsedToken, PluginTokenSpec, plugins, Parser } from "../../../text-parser";

export type StyleFunction = (text: string, token?: ParsedToken) => string;

export { ParsedToken, ParsedTokenFlags, ParsedTokenTypes, plugins, PluginTokenSpec, Parser }