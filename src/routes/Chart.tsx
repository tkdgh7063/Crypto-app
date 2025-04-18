import { useQuery } from "react-query";
import { coinHistoryFetcher } from "./api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    coinHistoryFetcher(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart.."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((item) => ({
                  x: new Date(item.time_open * 1000),
                  y: [
                    parseFloat(item.open),
                    parseFloat(item.high),
                    parseFloat(item.low),
                    parseFloat(item.close),
                  ],
                })) ?? [],
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
              mode: "dark",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            // fill: {
            //   type: "gradient",
            //   gradient: {
            //     gradientToColors: ["blue"],
            //     stops: [0, 100],
            //   },
            // },
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
              categories: data?.map((date) =>
                new Date(date.time_close * 1000).toISOString()
              ),
            },
            // tooltip: {
            //   custom:
            // },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
