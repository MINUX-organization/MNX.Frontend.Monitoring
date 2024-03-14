import _ from "lodash"
import { FormInput } from "../ui/pool-form"
import { Crypto } from "@/entities/crypto"

export function mapPool(data: FormInput, cryptosList?: Crypto[]) {
  const findedCrypto = _.find(cryptosList, ['fullName', data.cryptocurrency])

  if (!findedCrypto) return

  return {
    domain: data.domain,
    port: Number.parseInt(data.port),
    cryptocurrencyId: findedCrypto.id
  }
}