import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table";
import AddContact from "../components/AddContacts";
import { toast } from "react-toastify";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { deleteContact, fetchContacts } from "../redux/slices/contactSlice";
import Loading from "../components/Loader";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { data: contacts, loading, error } = useSelector((state) => state.contacts);

  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);       
  const [openAddModal, setOpenAddModal] = useState(false); 

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const headers = ["Name", "Email", "Phone", "Company", "tags", "Created At"];

  const renderRow = (contact) => (
    <>
      <td className="py-2">{contact.name}</td>
      <td className="py-2">{contact.email}</td>
      <td className="py-2">{contact.phone}</td>
      <td className="py-2">{contact.company}</td>
      <td className="py-2">{contact.tags}</td>
      <td className="py-2">{new Date(contact.createdAt).toLocaleDateString()}</td>
        <td className="py-2">{actions}</td>
    </>
  );

  const handleDelete = async (id) => {
    try {
        console.log(id)
      await dispatch(deleteContact(id)).unwrap();
     
      toast.success("Contact deleted successfully");
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
              label="Add Contact"
              onClick={() => {
                setSelectedItem(null);
                setOpenAddModal(true);
              }}
              icon={<IoMdAdd className="text-lg" />}
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
            />
          </div>

          <Table
            items={contacts}
            headers={headers}
            renderRow={renderRow}
            onEdit={(item) => {
              setSelectedItem(item);
              setOpenModal(true);
            }}
            onDelete={handleDelete}
          />

          {/* Add Contact Modal */}
          <AddContact
            open={openAddModal}
            setOpen={setOpenAddModal}
          />

          {/* Edit Contact Modal */}
          <AddContact
            open={openModal}
            setOpen={setOpenModal}
            contactData={selectedItem}
          />
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
