import { Crypto, CryptosList } from "@/entities/crypto";
import styles from "./cryptos.page.module.scss";
import { useQuery } from "react-query";
import { getCryptocurrenciesList } from "@/shared/api";
import { useCryptoStore } from "@/entities/crypto/model/crypto.store";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useEffect } from "react";

export function Cryptos() {
  const { isLoading, error, data } = useQuery("cryptosList", getCryptocurrenciesList);
  const { setCryptosList, setIsCryptosListLoading } = useCryptoStore();

  useEffect(() => {
    if (data) setCryptosList(ZodSaveParse(data, Crypto.array()) ?? []);
    setIsCryptosListLoading(isLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])
  
  return (
    <div className={styles["cryptos-page"]}>
      <CryptosList/>
    </div>
  )
}