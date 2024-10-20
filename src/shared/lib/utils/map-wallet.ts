import { Crypto } from "@/entities/crypto"
import { FormInput } from "../../../features/wallet/form/ui/wallet-form"
import _ from "lodash"

export function mapWallet(data: FormInput, cryptosList?: Crypto[]) {
  const findedCrypto = _.find(cryptosList, ['id', data.cryptocurrency.id])

  if (!findedCrypto) return
  
  return {
    name: data.name,
    address: data.address,
    cryptocurrencyId: findedCrypto.id
  }
}