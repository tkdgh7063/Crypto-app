import styled from "styled-components";
import { IPriceData } from "../api";

const PriceWrapper = styled.div`
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
    font-weight: 500;
  }
`;

interface PriceProps {
  data: IPriceData;
}

function Price(data: PriceProps) {
  return (
    <>
      <PriceWrapper>
        <span>ATH Price(ATH Date)</span>
        <span>{`$ ${data.data.quotes.USD.ath_price.toFixed(
          3
        )}(${data.data.quotes.USD.ath_date.slice(0, 10)})`}</span>
      </PriceWrapper>
      <PriceWrapper>
        <span>Price(Change 24h)</span>
        <span>{`$ ${data.data.quotes.USD.price.toFixed(3)}(${
          data.data.quotes.USD.percent_change_24h
        } %)`}</span>
      </PriceWrapper>
      <PriceWrapper>
        <span>Volume(Change 24h)</span>
        <span>{`${data.data.quotes.USD.volume_24h.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}(${data.data.quotes.USD.volume_24h_change_24h} %)`}</span>
      </PriceWrapper>
      <PriceWrapper>
        <span>Market Cap(Change 24h)</span>
        <span>{`$ ${data.data.quotes.USD.market_cap.toLocaleString()}(${
          data.data.quotes.USD.market_cap_change_24h
        } %)`}</span>
      </PriceWrapper>
    </>
  );
}

export default Price;
