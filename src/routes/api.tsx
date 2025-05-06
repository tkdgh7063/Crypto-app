import {
  ICoin,
  IHistorical,
  IInfoData,
  IPriceData,
  ChartError,
  IErrorProps,
} from "../api";

const BASE_URL = `https://crypto-proxy-server-hcxn.onrender.com`;

export function coinsFetcher(): Promise<ICoin[] | IErrorProps> {
  return fetch(`${BASE_URL}/coins`)
    .then((r) => {
      return r.json();
    })
    .catch((e) => {
      return { error: "API Error" };
    });
}

export function coinInfoFetcher(
  coinId: String
): Promise<IInfoData | IErrorProps> {
  return fetch(`${BASE_URL}/coins/${coinId}`)
    .then((r) => {
      return r.json();
    })
    .catch((e) => {
      return { error: "API Error" };
    });
}

export function coinTickersFetcher(
  coinId: string
): Promise<IPriceData | IErrorProps> {
  return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then((r) => {
      return r.json();
    })
    .catch((e) => {
      return { error: "API Error" };
    });
}

export function coinHistoryFetcher(
  coinId: string
): Promise<IHistorical[] | ChartError> {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((r) => r.json());
}
