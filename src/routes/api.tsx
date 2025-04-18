const BASE_URL = `https://api.coinpaprika.com/v1`;

export function coinsFetcher() {
  return fetch(`${BASE_URL}/coins`).then((r) => r.json());
}

export function coinInfoFetcher(coinId: String) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((r) => r.json());
}

export function coinTickersFetcher(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((r) => r.json());
}
