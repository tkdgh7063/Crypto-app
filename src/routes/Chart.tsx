import { useQuery } from "react-query";
import { coinHistoryFetcher } from "./api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { IHistorical } from "../api";

interface ChartProps {
  coinId: string;
}

interface IError {
  error: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    coinHistoryFetcher(coinId)
  );

  const isDark = useRecoilValue(isDarkAtom);

  // TODO: return error when data is error from api

  return (
    <div>
      {isLoading ? (
        "Loading chart.."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              // error when data returns null
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
              categories: data?.map((date) =>
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
            noData: {
              text: undefined,
              align: "center",
              verticalAlign: "middle",
              offsetX: 0,
              offsetY: 0,
              style: {
                color: undefined,
                fontSize: "14px",
                fontFamily: undefined,
              },
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
