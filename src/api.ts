export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface IErrorProps {
  type: string;
  hard_limit: string;
  soft_limit: string;
  error: string;
  block_duration: string;
}

export interface IWhitepaper {
  link: string;
  thumbnail: string;
}

export interface ITags {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

export interface ITeam {
  id: string;
  name: string;
  position: string;
}

export interface ILinks {
  explorer?: string[] | null;
  facebook?: string[] | null;
  reddit?: string[] | null;
  source_code?: string[] | null;
  website?: string[] | null;
  youtube?: string[] | null;
  medium?: string[] | null;
}

export interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: "coin" | "token";
  logo: string;
  tags: ITags[];
  team: ITeam[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type?: string | null;
  org_structure?: string | null;
  hash_algorithm?: string | null;
  first_data_at: string;
  last_data_at: string;
  links: ILinks;
  whitepaper: IWhitepaper;
}

export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

export interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export interface IError {
  error: string;
}
