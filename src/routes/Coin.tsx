import { JSX } from "react";
import {
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { coinInfoFetcher, coinTickersFetcher } from "./api";
import { useQuery } from "react-query";
import { isDarkAtom } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
  justify-content: space-between;
  align-items: center;
`;

const Home = styled.button`
  background: rgba(1, 1, 1, 0);
  border: none;
  color: #00cec9;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: #55efc4;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Toggle = styled.button``;

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

const MyLink = styled.a``;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  height: 40px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 0px;
  border-radius: 10px;
  a {
    display: block;
    color: ${(props) => (props.$isActive ? "#55efc4" : props.theme.textColor)};
  }
`;

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

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => coinInfoFetcher(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => coinTickersFetcher(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);

  const toggleTheme = () => setDarkAtom((prev) => !prev);

  const loading = infoLoading || tickersLoading;
  const history = useHistory();

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={process.env.PUBLIC_URL + "/"}>Go Home</Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
        <Toggle onClick={toggleTheme}>
          {isDark ? "🌞Light Mode" : "🌙Dark Mode"}
        </Toggle>
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
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>symbol</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>type</span>
                <span>{infoData?.type.toUpperCase()}</span>
              </OverviewItem>
              <OverviewItem>
                <span>price</span>
                <span>{`$ ${tickersData?.quotes.USD.price.toFixed(3)}`}</span>
              </OverviewItem>
            </OverviewItemWrapper>
          </Overview>
          <LogoContainer>
            <Logo src={infoData?.logo} />
          </LogoContainer>
          <Description>
            {infoData?.description === "" || undefined
              ? "No Description"
              : infoData?.description}
          </Description>
          <Overview>
            {/* TODO: replace O, X signs to icons later */}
            <OverviewTitle>Status</OverviewTitle>
            <OverviewItemWrapper>
              <OverviewItem>
                <span>is_active</span>
                <span>{infoData?.is_active ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>is_new</span>
                <span>{infoData?.is_new ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>open_source</span>
                <span>{infoData?.open_source ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>hardware_wallet</span>
                <span>{infoData?.hardware_wallet ? "O" : "X"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>message</span>
                <span>
                  {infoData?.message === "" || undefined
                    ? "None"
                    : infoData?.message}
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
                  {infoData?.development_status
                    ? infoData?.development_status
                    : "None"}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>proof_type</span>
                <span>
                  {infoData?.proof_type ? infoData?.proof_type : "None"}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>org_structure</span>
                <span>
                  {infoData?.org_structure ? infoData?.org_structure : "None"}
                </span>
              </OverviewItem>
              <OverviewItem>
                <span>hash_algorithm</span>
                <span>
                  {infoData?.hash_algorithm ? infoData?.hash_algorithm : "None"}
                </span>
              </OverviewItem>
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            <OverviewTitle>Team Info</OverviewTitle>
            <OverviewItemWrapper>
              {infoData?.team.map((t) => (
                <OverviewItem>{t.name}</OverviewItem>
              ))}
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            {/* TODO: align numbers in same columns to look better later */}
            <OverviewTitle>Tag Info</OverviewTitle>
            <OverviewItemWrapper>
              {infoData?.tags.map((t) => (
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
                const urls = infoData?.links[category];
                if (urls && urls.length > 0) {
                  acc.push(
                    <LinkWrapper key={category}>
                      <OverviewItem>{category.toUpperCase()}</OverviewItem>
                      {urls.map((url) => (
                        <MyLink href={url} target="_blank">
                          {category} {/* replace category with icon later */}
                        </MyLink>
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
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>max supply</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </OverviewItemWrapper>
          </Overview>
          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/chart`}>
                Chart
              </Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/price`}>
                Price
              </Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/:coinId/price`}>
              {tickersData ? <Price data={tickersData} /> : "Loading Price..."}
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
