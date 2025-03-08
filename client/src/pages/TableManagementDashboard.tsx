import { useState } from "react";
import { FaPlus, FaFilter, FaSearch } from "react-icons/fa";
import { Table } from "../types/table.type";
import LoadingPage from "../components/common/LoadingPage";
import TableCard from "../components/TableManagement/TableCard";
import AddTableModal from "../components/TableManagement/modals/AddTableModal";
import EditTableModal from "../components/TableManagement/modals/EditTableModal";
import DeleteTableModal from "../components/TableManagement/modals/DeleteTableModal";
import QRCodeModal from "../components/TableManagement/modals/QRCodeModal";
import { useTables } from "../hooks/useTables";

const TableManagementDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { tables, isLoading } = useTables();

  if (isLoading) {
    return <LoadingPage />;
  }

  const filteredTables = tables
    .filter(
      (table: Table) => filterStatus === "all" || table.status === filterStatus
    )
    .filter((table: Table) =>
      table.table_number.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-heading font-heading text-accent">
            Table Management
          </h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FaPlus /> Add Table
          </button>
        </div>

        <div className="mb-6 flex gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-card p-2 rounded-md">
            <FaFilter className="text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-card p-2 rounded-md flex-1">
            <FaSearch className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTables.map((table: Table) => (
            <TableCard
              key={table.id}
              table={table}
              onEdit={() => {
                setSelectedTable(table);
                setIsEditModalOpen(true);
              }}
              onDelete={() => {
                setSelectedTable(table);
                setIsDeleteModalOpen(true);
              }}
              onQRCode={() => {
                setSelectedTable(table);
                setIsQRModalOpen(true);
              }}
            />
          ))}
        </div>

        {isAddModalOpen && (
          <AddTableModal onClose={() => setIsAddModalOpen(false)} />
        )}

        {isEditModalOpen && selectedTable && (
          <EditTableModal
            table={selectedTable}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}

        {isDeleteModalOpen && selectedTable && (
          <DeleteTableModal
            table={selectedTable}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}

        {isQRModalOpen && selectedTable && (
          <QRCodeModal
            table={selectedTable}
            onClose={() => setIsQRModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TableManagementDashboard;
