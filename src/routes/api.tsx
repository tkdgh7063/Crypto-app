const BASE_URL = `https://api.coinpaprika.com/v1`;

export function coinsFetcher() {
  return fetch(`${BASE_URL}/coins`).then((r) => r.json());
}

export function coinInfoFetcher(coinId: String) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((r) => r.json());
}

export function coinTickersFetcher(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((r) => r.json());
}

export function coinHistoryFetcher(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((r) => r.json());
}
