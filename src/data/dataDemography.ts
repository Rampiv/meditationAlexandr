export const dataDemography = {
  series: [
    {
      name: "Мужчины",
      data: [48, 102, 90, 58, 22],
    },
    {
      name: "Женщины",
      data: [102, 218, 190, 122, 48],
    },
  ],
  categories: ["18-25 лет", "26-35 лет", "36-45 лет", "46-55 лет", "56+ лет"],
  title: "Демографические показатели",
  yAxisTitle: "Возраст",
}


export type AppData = typeof dataDemography
