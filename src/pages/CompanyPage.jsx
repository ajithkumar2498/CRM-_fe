import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Loading from "../components/Loader";
import { deleteCompany, fetchCompanies } from "../redux/slices/companySlice";
import AddCompany from "../components/AddCompany";
import CompanyTable from "../components/companyTable";

const CompanyPage = () => {
  const dispatch = useDispatch();
  const { data: companies, loading, error } = useSelector((state) => state.companies);

  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);       
  const [openAddModal, setOpenAddModal] = useState(false); 

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const headers = ["name", "industry", "address", "phone", "tag", "Created At", "Actions"];

  const renderRow = (companies) => (
    <>
      <td className="py-2">{companies.industry}</td>
      <td className="py-2">{companies.name}</td>
      <td className="py-2">{companies.address}</td>
      <td className="py-2">{companies.phone}</td>
      <td className="py-2">{companies.tag}</td>
      <td className="py-2">{new Date(companies.createdAt).toLocaleDateString()}</td>
       <td className="py-2">{Actions}</td>
    </>
  );

  const handleDelete = async (id) => {
    try {
        
      await dispatch(deleteCompany(id)).unwrap();
     
      toast.success("company deleted successfully");
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
              label="Add Company"
              onClick={() => {
                setSelectedItem(null);
                setOpenAddModal(true);
              }}
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
            />
          </div>

          <CompanyTable
            items={companies}
            headers={headers}
            renderRow={renderRow}
            onEdit={(item) => {
              setSelectedItem(item);
              setOpenModal(true);
            }}
            onDelete={handleDelete}
          />

          {/* Add Company Modal */}
          <AddCompany
            open={openAddModal}
            setOpen={setOpenAddModal}
          />

          {/* Edit Company Modal */}
          <AddCompany
            open={openModal}
            setOpen={setOpenModal}
            companyData={selectedItem}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
