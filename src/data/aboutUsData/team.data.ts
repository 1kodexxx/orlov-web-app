// src/components/sections/aboutUsPage/team.data.ts

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  telegram: string;
}

export interface TeamSectionData {
  title: string;
  paragraphs: string[];
}

export const TEAM_SECTION: TeamSectionData = {
  title: "Наши люди — наше величие",
  paragraphs: [
    "В ORLOV мы создаём продукты, в которых сочетаются технологии, культура и премиальное качество.",
    "Работая с нами, вы встречаете профессионалов, решаете нестандартные задачи и находите единомышленников.",
  ],
};

export const TEAM: TeamMember[] = [
  {
    name: "Иван",
    role: "Генеральный директор",
    description:
      "Иван определяет стратегию Orlov Brand и уверенно ведёт команду к достижению больших целей.",
    image: "/ivan_avatar.jpg",
    telegram: "https://t.me/ORLANDE_777",
  },
  {
    name: "Александр",
    role: "Главный разработчик",
    description:
      "Александр строит платформу Orlov Brand на принципах надёжности, скорости и технологического совершенства.",
    image: "/sasha_avatar.jpg",
    telegram: "https://t.me/pvntheraxxx",
  },
  {
    name: "Виктория",
    role: "PR-специалист",
    description:
      "Виктория формирует имидж Orlov Brand в глазах общественности, развивает коммуникации и доносит ценности бренда миру.",
    image: "/vika_avatar.jpg",
    telegram: "https://t.me/viiikaa51",
  },
];
