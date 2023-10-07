import Elysia from "elysia";
import { AES, enc } from "crypto-js";
import { FILE_DEST, FILE_XDATA } from "../config";

export const cryptoServices = new Elysia({ name: "crypto@services" })
  .decorate(
    "hash",
    async (password: string) =>
      await Bun.password.hash(password, { algorithm: "bcrypt" }),
  )
  .decorate(
    "isMatch",
    async (password: string, encryped: string) =>
      await Bun.password.verify(password, encryped),
  )
  .decorate("encrypt", async (secretCode: string) => {
    const file = Bun.file(FILE_XDATA);
    const data = await file.json();
    const encrypedData = AES.encrypt(data, secretCode).toString();
    Bun.write(FILE_DEST, encrypedData);
  })
  .decorate("decrypt", async (secretCode: string) => {
    const file = Bun.file(FILE_XDATA);
    const data = await file.json();
    const decryptedBytes = AES.decrypt(data, secretCode);
    return JSON.parse(decryptedBytes.toString(enc.Utf8));
  });
