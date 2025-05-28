import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Loading from "../components/Loader";
import AddCompany from "../components/AddCompany";
import DealTable from "../components/DealTable";
import { deleteDeal, fetchDeals } from "../redux/slices/dealSlice";
import AddDeal from "../components/AddDeal";

const DealsPage = () => {
  const dispatch = useDispatch();
  const { data: deals, loading, error } = useSelector((state) => state.deals);

  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);       
  const [openAddModal, setOpenAddModal] = useState(false); 

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const headers = ["Deal Title", "Associated Contact", "status", "Created At", "Actions"];

  const renderRow = (deals) => (
    <>
      <td className="py-2">{deals.title}</td>
      <td className="py-2">{deals.contact.name}</td>
      <td className="py-2">{deals.status}</td>
      <td className="py-2">{new Date(deals.createdAt).toLocaleDateString()}</td>
       <td className="py-2">{Actions}</td>
    </>
  );

  const handleDelete = async (id) => {
    try {
        
      await dispatch(deleteDeal(id)).unwrap();
     
      toast.success("deals deleted successfully");
    } catch (err) {
      toast.error(err || "Delete failed");
    }
  };

  return (
    <div>
      {loading ? (
      <div className="py-10">
        <Loading />
      </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full">
          <div className="flex items-center flex-row-reverse justify-between mb-4">
            <Button
              label="Add a Deal"
              onClick={() => {
                setSelectedItem(null);
                setOpenAddModal(true);
              }}
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
            />
          </div>

          <DealTable
            items={deals}
            headers={headers}
            renderRow={renderRow}
            onEdit={(item) => {
              setSelectedItem(item);
              setOpenModal(true);
            }}
            onDelete={handleDelete}
          />

          {/* Add Deal Modal */}
          <AddDeal
            open={openAddModal}
            setOpen={setOpenAddModal}
          />

          {/* Edit Deal Modal */}
          <AddDeal
            open={openModal}
            setOpen={setOpenModal}
            companyData={selectedItem}
          />
        </div>
      )}
    </div>
  );
};

export default DealsPage;
