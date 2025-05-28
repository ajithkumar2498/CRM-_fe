import React, { useEffect, useState } from "react";
import Loading from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import AxiosService from "../utils/axiosService";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardSummary } from "../redux/slices/dashBoardSlice";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import clsx from "clsx"

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);

  useEffect(()=>{
     dispatch(fetchDashboardSummary());
  },[dispatch])

  if (loading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>
    if (!data) return <p>No dashboard data found.</p>;

    const stats = [
    {
      _id: "1",
      label: "Contacts",
      total: data?.contacts || 0,
      icon: <RiContactsBook3Line />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "Companies",
      total: data?.companies || 0,
      icon: <MdWork />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "Deals",
      total: data?.deals || 0,
      icon: <FaHandshakeSimple />,
      bg: "bg-[#f59e0b]",
    },
  ];

    const Card = ({ label, count, bg, icon }) => {
    return (
      <>
        <div className="w-full h-24 bg-white shadow-md p-4 rounded-md flex items-center justify-between">
          <div className="h-full flex flex-1 flex-col justify-between">
            <p className="text-base text-gray-600">{label}</p>
            <span className="text-2xl font-semibold">{count}</span>
            <span className="text-sm text-gray-400">{}</span>
          </div>
          <div
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center text-white",
              bg
            )}
          >
            {icon}
          </div>
        </div>
      </>
    );
  };

  return <>
  
    <div className="h-full py-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(({ icon, bg, label, total }, index) => (
            <Card key={index} icon={icon} bg={bg} label={label} count={total} />
          ))}
        </div>

      </div>
  
  </>
};

export default Dashboard;
