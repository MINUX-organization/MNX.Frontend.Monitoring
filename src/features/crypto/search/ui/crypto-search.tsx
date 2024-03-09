import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { UiSearch } from "@/shared/ui/ui-search";
import styles from "./cryptoSearch.module.scss";
import _ from "lodash";
import clsx from "clsx";
import { ChangeEvent, useEffect } from "react";
import { useStateObject } from "@/shared/lib/utils/state-object";

export function CryptoSearch({ 
  className 
} : { 
  className?: string 
}) {
  const { setCryptosList, getCryptosList, isLoading } = useCryptoRepository(); 
  const cryptosList = useStateObject<Crypto[] | undefined>([]);

  useEffect(() => {
    if (isLoading) return;
    cryptosList.setValue(getCryptosList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target?.value)
    const filteredCrypto: Crypto[] = _.filter(cryptosList.value, (crypto) => {
      return _.includes(_.lowerCase(crypto?.fullName), _.lowerCase(e?.target?.value)) ||
        _.includes(_.lowerCase(crypto?.shortName), _.lowerCase(e?.target?.value)) || 
        _.includes(_.lowerCase(crypto?.algorithm), _.lowerCase(e?.target?.value))
    });
    console.log(filteredCrypto)
    setCryptosList(filteredCrypto);
  }

  return (
    <UiSearch
      className={clsx(className, styles['crypto-search'])}
      onChange={handleOnchange}
      placeholder="Search"
    />
  )
}