"use client"; // ⚠️ Ajoute cette ligne tout en haut du fichier

import React, { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const statsData: Stat[] = [
  { label: "Écoles enregistrées", value: 1200 },
  { label: "Inscriptions en cours", value: 3400 },
  { label: "Élèves actifs", value: 8750 },
  { label: "Transactions sécurisées", value: 10000, suffix: "+" },
];

const Impact: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, i) => {
      const increment = Math.ceil(stat.value / 100);
      return setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev];
          if (newCounts[i] < stat.value) {
            newCounts[i] = Math.min(newCounts[i] + increment, stat.value);
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="bg-green-600 text-white py-16 px-5 text-center rounded-xl mt-12">
      <h2 className="text-3xl font-bold mb-6">Nos Statistiques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="bg-green-500 bg-opacity-20 p-6 rounded-lg shadow-lg">
            <span className="text-4xl font-extrabold block">
              {counts[idx]}{stat.suffix || ""}
            </span>
            <span className="text-lg mt-2 block">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Impact;