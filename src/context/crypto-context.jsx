import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, FetchAssets } from "../components/Layot/api";
import { percentDiff } from "../components/Layot/utils";
const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});
export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);

      return {
        ...asset,
        grow: asset.price < coin.price,
        growPercent: percentDiff(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      };
    });
  }
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await FetchAssets();
      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }
  return (
    <CryptoContext.Provider value={{ assets, crypto, loading, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}
export default CryptoContext;
export function useCrypto() {
  return useContext(CryptoContext);
}
