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
import { IconType } from "react-icons/lib/iconBase";
import {
  FaReddit,
  FaFacebook,
  FaInternetExplorer,
  FaGithub,
  FaGlobe,
  FaYoutube,
  FaBlog,
} from "react-icons/fa";
import { IError, IInfoData, IPriceData } from "../api";

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

const TagItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px 60px;
  column-gap: 12px;
  row-gap: 8px;
  width: 100%;
`;

const TagName = styled.div`
  font-weight: 600;
  text-align: center;
  padding-right: 12.5%;
  color: white;
`;

const TagItem = styled.div`
  text-align: right;
  /* font-variant-numeric: tabular-nums; */
`;

const Whitepaper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const WpLink = styled.a``;

const WpThumb = styled.img``;

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

type iconProps = {
  category: LinkCategory;
};

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

const linkCategories: LinkCategory[] = [
  "explorer",
  "facebook",
  "reddit",
  "source_code",
  "website",
  "youtube",
  "medium",
];

type LinkCategory =
  | "explorer"
  | "facebook"
  | "reddit"
  | "source_code"
  | "website"
  | "youtube"
  | "medium";

// [github, explorer(magnify), website(global | home)]
const linkIcons: Record<LinkCategory, IconType> = {
  explorer: FaInternetExplorer,
  facebook: FaFacebook,
  reddit: FaReddit,
  source_code: FaGithub,
  website: FaGlobe,
  youtube: FaYoutube,
  medium: FaBlog,
};

const Error = styled.div`
  text-align: center;
`;

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<
    IInfoData | IError
  >(["info", coinId], () => coinInfoFetcher(coinId));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => coinTickersFetcher(coinId),
    {
      refetchInterval: (data) => {
        if (data && "error" in data) {
          return false;
        }
        return 10000;
      },
    }
  );

  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);

  const toggleTheme = () => setDarkAtom((prev) => !prev);

  const loading = infoLoading || tickersLoading;
  const history = useHistory();

  if (loading && infoData) {
    if ("error" in infoData) {
      const errorData = infoData as IError;
      return (
        <Container>
          <Error>{errorData?.error}</Error>
          <Description>Try again 1 hour later</Description>
        </Container>
      );
    }
  }

  const info = infoData as IInfoData;
  const price = tickersData as IPriceData;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={process.env.PUBLIC_URL + "/"}>
          <Home>Go to Home</Home>
        </Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
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
              <OverviewItem>
                <span>price</span>
                <span>{`$ ${price?.quotes.USD.price.toFixed(3)}`}</span>
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
            <OverviewTitle>Tag Info</OverviewTitle>
            <TagItemWrapper>
              {info?.tags.map((t) => (
                <>
                  <TagName>{t.name}</TagName>
                  <TagItem>{t.coin_counter}</TagItem>
                  <TagItem>{t.ico_counter}</TagItem>
                </>
              ))}
            </TagItemWrapper>
          </Overview>
          <Overview>
            {/* align logo links in grid if possible to look better */}
            <OverviewTitle>Links</OverviewTitle>
            <OverviewItemWrapper>
              {linkCategories.reduce<JSX.Element[]>((acc, category) => {
                const urls = info?.links[category];
                const IconComponent = linkIcons[category];
                if (urls && urls.length > 0) {
                  acc.push(
                    <LinkWrapper key={category}>
                      <OverviewItem>{category.toUpperCase()}</OverviewItem>
                      {urls.map((url) => (
                        <MyLink href={url} target="_blank" key={url}>
                          <IconComponent />
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
            <OverviewTitle>Whitepaper</OverviewTitle>
            <OverviewItemWrapper>
              <Whitepaper>
                <WpLink href={info?.whitepaper.link} target="_blank">
                  <WpThumb src={info?.whitepaper.thumbnail} />
                </WpLink>
              </Whitepaper>
            </OverviewItemWrapper>
          </Overview>
          <Overview>
            <OverviewTitle>Ticker</OverviewTitle>
            <OverviewItemWrapper>
              <OverviewItem>
                <span>total supply</span>
                <span>{price?.total_supply.toLocaleString()}</span>
              </OverviewItem>
              <OverviewItem>
                <span>max supply</span>
                <span>{price?.max_supply.toLocaleString()}</span>
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
              {price ? <Price data={price} /> : "Loading Price..."}
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
