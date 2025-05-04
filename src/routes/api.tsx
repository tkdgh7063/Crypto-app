import {
  ICoin,
  IErrorProps,
  IHistorical,
  IInfoData,
  IPriceData,
  ChartError,
  IError,
} from "../api";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function coinsFetcher(): Promise<ICoin[] | IError> {
  return fetch(`${BASE_URL}/coins`)
    .then((r) => {
      return r.json();
    })
    .catch((e) => {
      return { error: "API Error" };
    });
}

export function coinInfoFetcher(coinId: String): Promise<IInfoData | IError> {
  return fetch(`${BASE_URL}/coins/${coinId}`)
    .then((r) => {
      return r.json();
    })
    .catch((e) => {
      return { error: "API Error" };
    });
}

export function coinTickersFetcher(coinId: string): Promise<IPriceData> {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((r) => r.json());
}

export function coinHistoryFetcher(
  coinId: string
): Promise<IHistorical[] | ChartError> {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((r) => r.json());
}
