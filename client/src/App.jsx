import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { FaUsers, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import ContactModal from "./components/ContactModel";

const columns = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email" },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "company",
    label: "Company",
  },
  {
    id: "jobTitle",
    label: "Job Title",
  },
  {
    id: "edit",
    label: "Edit",
  },
  {
    id: "delete",
    label: "Delete",
  },
];

const Home = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [editModelOpen, setEditModelOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModalClose = () => {
    setModelOpen(false);
    setSelectedContact(null);
  };

  const handleEditModalClose = () => {
    setEditModelOpen(false);
  };

  const handleModalOpen = () => {
    setModelOpen(true);
  };

  const handleEditModalOpen = (contact) => {
    setSelectedContact(contact);
    setEditModelOpen(true);
  };

  const getContacts = async () => {
    try {
      const page = 1;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts?page=${page}`
      );
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      getContacts();
    } catch (error) {
      console.error(error.message);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnId) => {
    const isAsc = sortColumn === columnId && sortOrder === "asc";
    setSortColumn(columnId);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (!sortColumn) return 0;

    const valueA = a[sortColumn]?.toString().toLowerCase() || "";
    const valueB = b[sortColumn]?.toString().toLowerCase() || "";

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="h-full font-poppins">
      <div className="h-20 flex gap-2 text-xl font-semibold items-center px-8 border-b">
        <FaUsers size={24} />
        Contacts
      </div>

      <div>
        <div className="h-14 flex items-center justify-between px-8 border-b">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              color="secondary"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            onClick={handleModalOpen}
            color="secondary"
            variant="contained"
          >
            <GoPlus size={24} /> New Contact
          </Button>
        </div>

        <Paper sx={{ overflow: "hidden", margin: "12px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sortDirection={
                        sortColumn === column.id ? sortOrder : false
                      }
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                        {sortColumn === column.id
                          ? sortOrder === "asc"
                            ? " 🔼"
                            : " 🔽"
                          : null}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedContacts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contact, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>{contact.firstName}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>{contact.jobTitle}</TableCell>
                        <TableCell>
                          <button onClick={() => handleEditModalOpen(contact)}>
                            <FaEdit />
                          </button>
                        </TableCell>
                        <TableCell>
                          <button onClick={() => handleDelete(contact._id)}>
                            <MdDelete />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sortedContacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      {modelOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 flex justify-center items-center">
          <ContactModal
            onClose={handleModalClose}
            contacts={setContacts}
            title={"New"}
          />
        </div>
      )}

      {editModelOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 flex justify-center items-center">
          <ContactModal
            onClose={handleEditModalClose}
            contacts={setContacts}
            title={"Edit"}
            contact={selectedContact}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
