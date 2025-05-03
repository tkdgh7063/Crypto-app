import styled from "styled-components";
import { IPriceData } from "../api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  span:first-child {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 800;
  }
  span:last-child {
    font-weight: 400;
  }
`;

interface PriceProps {
  data: IPriceData;
}

function Price(data: PriceProps) {
  return (
    <>
      <Wrapper>
        <span>ATH Price</span>
        <span>{`$ ${data.data.quotes.USD.ath_price.toFixed(3)}`}</span>
      </Wrapper>
      <Wrapper>
        <span>Price</span>
        <span>{`$ ${data.data.quotes.USD.price.toFixed(3)}`}</span>
      </Wrapper>
      <Wrapper>
        <span>Percent Change 24H</span>
        <span>{`${data.data.quotes.USD.percent_change_24h} %`}</span>
      </Wrapper>
      <Wrapper>
        <span>Volume 24H</span>
        <span>{`${data.data.quotes.USD.volume_24h.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`}</span>
      </Wrapper>
      <Wrapper>
        <span>Market Cap</span>
        <span>{`${data.data.quotes.USD.market_cap.toLocaleString()}`}</span>
      </Wrapper>
    </>
  );
}

export default Price;
