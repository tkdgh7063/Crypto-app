import {
  ICoin,
  IHistorical,
  IInfoData,
  IPriceData,
  ChartError,
  IErrorProps,
  IError,
} from "../api";

const BASE_URL = `https://crypto-proxy-server-hcxn.onrender.com`;

export async function coinsFetcher(): Promise<ICoin[] | IErrorProps | IError> {
  try {
    const r = await fetch(`${BASE_URL}/coins`);
    return await r.json();
  } catch (e) {
    return { error: "API Error" };
  }
}

export async function coinInfoFetcher(
  coinId: String
): Promise<IInfoData | IErrorProps | IError> {
  try {
    const r = await fetch(`${BASE_URL}/coins/${coinId}`);
    return await r.json();
  } catch (e) {
    return { error: "API Error" };
  }
}

export async function coinTickersFetcher(
  coinId: string
): Promise<IPriceData | IErrorProps | IError> {
  try {
    const r = await fetch(`${BASE_URL}/tickers/${coinId}`);
    return await r.json();
  } catch (e) {
    return { error: "API Error" };
  }
}

export async function coinHistoryFetcher(
  coinId: string
): Promise<IHistorical[] | ChartError | IError> {
  const r = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  );
  return await r.json();
}
