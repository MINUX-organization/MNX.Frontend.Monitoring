import { Crypto, useCryptoRepository } from "@/entities/crypto";
import { filterByAll } from "@/shared/lib/utils/filter-by-all";
import { useStateObject } from "@/shared/lib/utils/state-object";
import _ from "lodash";
import { useEffect } from "react";

export function useCryptoSearch() {
  const { setCryptosList, getCryptosList, isLoading } = useCryptoRepository();

  const filteredCryptosList = useStateObject<Crypto[] | undefined>([]);
  const cryptosListSource = useStateObject<Crypto[] | undefined>([]);
  const cryptoSeacrh = useStateObject<string | undefined>('');

  const cryptosList = getCryptosList();

  useEffect(() => {
    if (isLoading) return;
    if (!getCryptosList) return;

    filteredCryptosList.setValue(cryptosList);
    cryptosListSource.setValue(cryptosList);

    return () => {
      if (!isLoading) {
        setCryptosList(cryptosList);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (!cryptosList || !cryptosListSource.value || !filteredCryptosList.value) return;
    if (cryptosListSource.value.length === 0) return;
    if (filteredCryptosList.value.length === cryptosList.length) return;

    if (cryptosList.length > filteredCryptosList.value.length) {
      const addedItem = _.differenceWith(cryptosList, filteredCryptosList.value, _.isEqual)[0];
      if (!addedItem) return; 
      cryptosListSource.setValue((prev) => [...prev!, addedItem]);
    } else {
      const deletedItem = _.differenceWith(filteredCryptosList.value, cryptosList, _.isEqual)[0];
      if (!deletedItem) return; 
      cryptosListSource.setValue((prev) => prev?.filter((crypto) => crypto?.shortName !== deletedItem?.shortName));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCryptosList()?.length]);

  useEffect(() => {
    if (cryptosListSource.value?.length === 0) return;
    handleOnchange(cryptoSeacrh.value);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptosListSource.value?.length])

const handleOnchange = (value?: string) => {
    cryptoSeacrh.setValue(value);

    if (value === '' || !value) {
      if (_.isEqual(cryptosListSource.value, filteredCryptosList.value)) {
        return;
      }

      filteredCryptosList.setValue(cryptosListSource.value);
      setCryptosList(cryptosListSource.value);
      
      return;
    }
    console.log(cryptosListSource.value)
    const filteredCryptos: Crypto[] = filterByAll(cryptosListSource.value, value!);

    if (_.isEqual(filteredCryptos, filteredCryptosList.value)) return;

    filteredCryptosList.setValue(filteredCryptos);
    setCryptosList(filteredCryptos);
  }

  return {
    handleOnchange,
  };
}