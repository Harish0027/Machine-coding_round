export const CheckBoxData = [
  {
    id: 1,
    name: "parent1",
    isCheck: false,
    children: [
      {
        id: 2,
        name: "parent2",
        isCheck: false,
        children: [
          {
            id: 3,
            name: "parent3",
            isCheck: false,
            children: [
              {
                id: 4,
                name: "parent4",
                isCheck: false,
                children: [],
              },
            ],
          },
          {
            id: 9,
            name: "parent9",
            isCheck: true,
            children: [],
          },

          {
            id: 5,
            name: "parent5",
            isCheck: true,
            children: [],
          },
        ],
      },
      {
        id: 6,
        name: "parent6",
        isCheck: false,
        children: [],
      },
      {
        id: 7,
        name: "parent7",
        isCheck: true,
        children: [],
      },
    ],
  },
];

export interface CheckBoxDataType {
  id: number;
  name: string;
  isCheck: boolean;
  children: CheckBoxDataType[];
}
