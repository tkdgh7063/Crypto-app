import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ICoin, IError } from "../api";
import ImageCircleAi from "../assets/images/ImageCircleAi.svg";
import { isDarkAtom } from "../atoms";
import { coinsFetcher } from "./api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const ErrorWrapper = styled.div`
  display: block;
  text-align: center;
`;

const Error = styled.div``;

const Description = styled.div``;

const Header = styled.header`
  height: 10vh;
  position: relative;
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.accentColor};
`;

const Toggle = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const Loader = styled.div`
  display: block;
  text-align: center;
`;

const CoinsList = styled.ul``;

// const CoinWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

const CoinImg = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 10px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface ICoinsProps {}

function isError(data: ICoin[] | IError): data is IError {
  return "error" in data;
}

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[] | IError>(
    "allCoins",
    coinsFetcher
  );
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);

  const toggleTheme = () => setDarkAtom((prev) => !prev);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `${ImageCircleAi}`;
  };

  if (!isLoading && data) {
    if (isError(data)) {
      const errorData = data as IError;
      return (
        <ErrorWrapper>
          <Error>{errorData?.error}</Error>
          <Description>Try again 1 hour later</Description>
        </ErrorWrapper>
      );
    }
  }

  const coinData = data as ICoin[];
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <Toggle onClick={toggleTheme}>
          {isDark ? "🌞Light Mode" : "🌙Dark Mode"}
        </Toggle>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coinData?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `${process.env.PUBLIC_URL}/${coin.id}/chart`,
                  state: { name: coin.name },
                }}>
                <CoinImg
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                  onError={handleImgError}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
