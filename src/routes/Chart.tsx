import { useQuery } from "react-query";
import { coinHistoryFetcher } from "./api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { IHistorical, IError } from "../api";
import { styled } from "styled-components";

interface ChartProps {
  coinId: string;
}

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function isError(data: IHistorical[] | IError): data is IError {
  return "error" in data;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[] | IError>(
    ["ohlcv", coinId],
    () => coinHistoryFetcher(coinId)
  );

  const isDark = useRecoilValue(isDarkAtom);

  // TODO: return error when data is error from api
  if (!isLoading && data) {
    if (isError(data)) {
      return (
        <ErrorContainer>
          <span>No Chart Info to Display!</span>
        </ErrorContainer>
      );
    }
  }

  const chartData = data as IHistorical[];
  return (
    <div>
      {isLoading ? (
        "Loading chart.."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData?.map((item) => ({
                x: new Date(item.time_open * 1000),
                y: [
                  parseFloat(item.open),
                  parseFloat(item.high),
                  parseFloat(item.low),
                  parseFloat(item.close),
                ],
              })),
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: chartData?.map((date) =>
                new Date(date.time_close * 1000).toISOString()
              ),
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#eb3b5a",
                  downward: "#3867d6",
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
