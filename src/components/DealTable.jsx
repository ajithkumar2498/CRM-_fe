import React, { useState } from "react";
import moment from "moment";
import Button from "./Button";
import { ChevronDown, ChevronUp } from "lucide-react";

const DealTable = ({ items, onEdit, onDelete }) => {
  const [openSections, setOpenSections] = useState({
    open: true,
    won: false,
    lost: false,
  });

  const toggleSection = (status) => {
    setOpenSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  // Group deals by status
  const groupedDeals = items.reduce((groups, deal) => {
    const key = deal.status || "open";
    if (!groups[key]) groups[key] = [];
    groups[key].push(deal);
    return groups;
  }, {});

  const statusLabels = {
    open: "🟡 Open Deals",
    won: "🟢 Won Deals",
    lost: "🔴 Lost Deals",
  };

  return (
    <div className="bg-white p-4 shadow rounded space-y-4">
      {["open", "won", "lost"].map((status) => (
        <div key={status} className="border border-gray-200 rounded">
          {/* Dropdown Header */}
          <div
            className="flex justify-between items-center bg-gray-100 px-4 py-3 cursor-pointer"
            onClick={() => toggleSection(status)}
          >
            <h2 className="font-semibold text-lg">
              {statusLabels[status]} ({groupedDeals[status]?.length || 0})
            </h2>
            {openSections[status] ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>

          {/* Dropdown Content */}
          {openSections[status] && (
            <div className="divide-y divide-gray-100">
              {(groupedDeals[status] || []).map((deal) => (
                <div
                  key={deal._id}
                  className="p-4 hover:bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <h3 className="text-md font-medium">{deal.title}</h3>
                    <p className="text-sm text-gray-600">
                      Contact: {deal.contact?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {moment(deal.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button
                      className="text-blue-600 text-sm"
                      label="Edit"
                      onClick={() => onEdit(deal)}
                    />
                    <Button
                      className="text-red-600 text-sm"
                      label="Delete"
                      onClick={() => onDelete(deal._id)}
                    />
                  </div>
                </div>
              ))}
              {groupedDeals[status]?.length === 0 && (
                <p className="p-4 text-gray-400 italic">No deals in this category.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DealTable;
