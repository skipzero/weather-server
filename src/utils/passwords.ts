import * as bcrypt from "bcrypt";

export function makeHash(password: string) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function compareHash (password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed);
}