import { useEffect, useRef } from "react"
import ApexCharts from "apexcharts"
import { dataDemography } from "../../data/dataDemography"
import "./Demography.scss"
import demogaphyHero from "../../assets/image/image1.webp"

export const Demography = () => {
  const chartRef = useRef<ApexCharts | null>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)

  // Инициализация графика
  useEffect(() => {
    const options = {
      series: dataDemography.series,
      chart: {
        type: "bar",
        width: "100%",
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: false,
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["black"],
      },
      title: {
        text: dataDemography.title,
      },
      xaxis: {
        categories: dataDemography.categories,
      },
      yaxis: {
        title: {
          text: dataDemography.yAxisTitle,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    }

    const initChart = async () => {
      if (chartContainerRef.current) {
        // Удаляем старый график если существует
        if (chartRef.current) {
          chartRef.current.destroy()
        }

        // Создаем новый график
        chartRef.current = new ApexCharts(chartContainerRef.current, options)
        await chartRef.current.render()
      }
    }

    initChart().catch(console.error)

    // Очистка при размонтировании
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <section className="demography" id="demography-section">
      <div className="container">
        <div className="demography__content">
          <div className="demography__hero">
            <img
              src={demogaphyHero}
              className="demography__image"
              alt="demogaphyHero"
              loading="lazy"
            />
            <h2 className="demography__h2">Йога объединяет всех!</h2>
          </div>
          <div
            ref={chartContainerRef}
            id="demography-chart"
            className="demography__char"
          ></div>
          <div className="demography__descr">
            <p>
              В нашей практике участвуют люди самых разных возрастов — от
              студентов до пенсионеров. И это прекрасно!
            </p>
            <p>
              В Isha Yoga Center мы создали программы, которые идеально подходят
              для каждого этапа жизни. Молодым — энергичные практики для
              активного дня, старшему поколению — мягкие и глубокие техники для
              здоровья и гармонии.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
