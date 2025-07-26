import { SummaryCard } from "@/types/dashbord.type";
import React from "react";
import { IconType } from "react-icons";

function SummaryCards({ summaryCards }: { summaryCards: SummaryCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
      {summaryCards.map((card: SummaryCard, index: number) => {
        const IconComponent: IconType = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-6 py-4 border border-gray-200 cursor-pointer hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <IconComponent className={`h-6 w-6 ${card.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;
