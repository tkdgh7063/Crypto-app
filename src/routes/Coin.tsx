import { JSX, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  header + div {
    margin-bottom: 12px;
  }
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 25px;
`;

const OverviewTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: -18px 0px 20px;
  text-transform: uppercase;
`;

const OverviewItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 110%;
  gap: 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  span:first-child {
    font-size: 16px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  span:nth-child(2) {
    font-weight: 400;
    font-size: 14px;
  }
`;

const Description = styled.p`
  margin: 15px 0px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div:first-child {
    font-weight: 600;
    margin-bottom: 5px;
  }
`;

const LinkIcon = styled.div``;

const Link = styled.a``;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface ITags {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
interface ITeam {
  id: string;
  name: string;
  position: string;
}

const linkCategories = [
  "explorer",
  "facebook",
  "reddit",
  "source_code",
  "website",
  "youtube",
  "medium",
] as const;

// TODO: add link icons for each categories
// [github, explorer(magnify), website(global | home)]
const linkIcons = [""] as const;

interface ILinks {
  explorer?: string[] | null;
  facebook?: string[] | null;
  reddit?: string[] | null;
  source_code?: string[] | null;
  website?: string[] | null;
  youtube?: string[] | null;
  medium?: string[] | null;
}

interface IWhitepaper {
  link: string;
  thumbnail: string;
}

interface IInfoData {
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
  whitepaper: IWhitepaper[];
}

interface IQuote {
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
}

interface IQuotes {
  [currency: string]: IQuote;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: IQuotes[];
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  // TODO: use Promise.all() on fetch 2 urls for efficiency
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : "Loading..."}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewTitle>Basic</OverviewTitle>
            <OverviewItemWrapper>
              <OverviewItem>
                <span>rank</span>
                <span>{info?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>symbol</span>
                <span>${info?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>type</span>
                <span>{info?.type.toUpperCase()}</span>
              </OverviewItem>
            </OverviewItemWrapper>
          </Overview>
          <LogoContainer>
            <Logo src={info?.logo} />
          </LogoContainer>
          <Description>
            {info?.description === "" || undefined
              ? "No Description"
              : info?.description}
          </Description>
          <Overview>
            {/* TODO: replace O, X signs to icons later */}
            <OverviewTitle>Status</OverviewTitle>
            <OverviewItemWrapper>
              <OverviewItem>
                <span>is_active</span>
                <span>{info?.is_active ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>is_new</span>
                <span>{info?.is_new ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>open_source</span>
                <span>{info?.open_source ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>hardware_wallet</span>
                <span>{info?.hardware_wallet ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>message</span>
                <span>
                  {info?.message === "" || undefined ? "None" : info?.message}
                </span>
              </OverviewItem>
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            <OverviewTitle>Technology</OverviewTitle>
            <OverviewItemWrapper>
              <OverviewItem>
                <span>development_status</span>
                <span>
                  {info?.development_status ? info?.development_status : "None"}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>proof_type</span>
                <span>{info?.proof_type ? info?.proof_type : "None"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>org_structure</span>
                <span>
                  {info?.org_structure ? info?.org_structure : "None"}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>hash_algorithm</span>
                <span>
                  {info?.hash_algorithm ? info?.hash_algorithm : "None"}
                </span>
              </OverviewItem>
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            <OverviewTitle>Team Info</OverviewTitle>
            <OverviewItemWrapper>
              {info?.team.map((t) => (
                <OverviewItem>{t.name}</OverviewItem>
              ))}
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            {/* TODO: align numbers in same columns to look better later */}
            <OverviewTitle>Tag Info</OverviewTitle>
            <OverviewItemWrapper>
              {info?.tags.map((t) => (
                <OverviewItemWrapper>
                  <OverviewItem>{t.name}</OverviewItem>
                  <OverviewItem>{t.coin_counter}</OverviewItem>
                  <OverviewItem>{t.ico_counter}</OverviewItem>
                </OverviewItemWrapper>
              ))}
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            <OverviewTitle>Links</OverviewTitle>
            <OverviewItemWrapper>
              {linkCategories.reduce<JSX.Element[]>((acc, category) => {
                const urls = info?.links[category];
                if (urls && urls.length > 0) {
                  acc.push(
                    <LinkWrapper key={category}>
                      <OverviewItem>{category.toUpperCase()}</OverviewItem>
                      {urls.map((url) => (
                        <Link href={url} target="_blank">
                          {category} {/* replace category with icon later */}
                        </Link>
                      ))}
                    </LinkWrapper>
                  );
                }
                return acc;
              }, [])}
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            <OverviewTitle>Ticker</OverviewTitle>
            <OverviewItemWrapper>
              <OverviewItem>
                <span>total supply</span>
                <span>{priceInfo?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>max supply</span>
                <span>{priceInfo?.max_supply}</span>
              </OverviewItem>
            </OverviewItemWrapper>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Coin;
