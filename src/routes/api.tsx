import { ICoin, IErrorProps, IHistorical, IInfoData, IPriceData } from "../api";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function coinsFetcher(): Promise<ICoin[] | IErrorProps> {
  return fetch(`${BASE_URL}/coins`).then((r) => {
    return r.json();
  });
}

export function coinInfoFetcher(
  coinId: String
): Promise<IInfoData | IErrorProps> {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((r) => {
    return r.json();
  });
}

export function coinTickersFetcher(coinId: string): Promise<IPriceData> {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((r) => r.json());
}

export function coinHistoryFetcher(coinId: string): Promise<IHistorical[]> {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((r) => r.json());
}
