export type MESSAGE_OPTION_TYPES = "CHAIN" | "TRANSACTION" | "CLEAR";
export interface MESSAGE_OPTION_INTERFACE {
  chain: MESSAGE_OPTION_TYPES;
  transaction: MESSAGE_OPTION_TYPES;
  clear: MESSAGE_OPTION_TYPES;
}
export const MESSAGE_OPTION: MESSAGE_OPTION_INTERFACE = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
  clear: "CLEAR",
};
