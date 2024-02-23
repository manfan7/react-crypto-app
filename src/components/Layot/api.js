import { cryptoAssets, cryptoData } from "../../data";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "ZkQaHXPtbfUmKiDk79Ow2zYscwAsCINJSVTly2BgOho=",
  },
};

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    fetch("https://openapiv1.coinstats.app/coins", options).then(
      (cryptoData) => {
        if (cryptoData.ok) {
          resolve(cryptoData.json());
        }
      }
    );
  });
}
export function FetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 2000);
  });
}
