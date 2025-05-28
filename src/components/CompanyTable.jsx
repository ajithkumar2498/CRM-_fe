import React from "react";
import Button from "./Button";
import moment from "moment";

const CompanyTable = ({ items, onEdit, onDelete, headers }) => {
    console.log(items)

  return (
    <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-300">
            <tr className="text-left text-black">
              {headers.map((item, index) => {
                return (
                  <th className="py-2" key={index}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10"
              >
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.industry}</td>
                <td className="py-2">{item.address}</td>
                <td className="py-2">{item.phone}</td>
                <td className="py-2">
                  <div className="flex flex-wrap gap-1">
                    {(item.tags || []).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2">{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                <td className="py-2 flex gap-2">
                  <Button
                    className="text-blue-600 text-sm"
                    label="Edit"
                    onClick={() => onEdit(item)}
                  />
                  <Button
                    className="text-red-600 text-sm"
                    label="Delete"
                    onClick={() => onDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyTable;
