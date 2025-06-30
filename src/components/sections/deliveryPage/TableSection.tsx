import React from "react";

const TableSection: React.FC = () => (
  <section className="py-12 px-6 max-w-[1257px] mx-auto bg-background-paper rounded-xl shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-primary">Варианты доставки</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-secondary">
          <th className="py-2">Регион</th>
          <th className="py-2">Сроки</th>
          <th className="py-2">Стоимость</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-secondary">
          <td className="py-2">Москва и область</td>
          <td className="py-2">1–2 дня</td>
          <td className="py-2">300 ₽</td>
        </tr>
        <tr className="border-b border-secondary">
          <td className="py-2">Россия (другие регионы)</td>
          <td className="py-2">3–7 дней</td>
          <td className="py-2">500 ₽</td>
        </tr>
        <tr>
          <td className="py-2">Международная</td>
          <td className="py-2">7–21 день</td>
          <td className="py-2">от 1500 ₽</td>
        </tr>
      </tbody>
    </table>
  </section>
);

export default TableSection;
