import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTable,
  deleteTable,
  getTable,
  getTables,
  updateTable,
} from "../apis/table.api";
import { toast } from "react-toastify";

export const useTables = () => {
  const queryClient = useQueryClient();

  const { data: tables = [], isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const useGetTable = (id: string) => {
    return useQuery({
      queryKey: ["tables", id],
      queryFn: () => getTable(id),
      enabled: !!id,
    });
  };

  const createTableMutation = useMutation({
    mutationFn: createTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table added successfully", {
        autoClose: 1500,
      });
    },
    onError: () => {
      toast.error("Failed to add table", {
        autoClose: 1500,
      });
    },
  });

  const updateTableMutation = useMutation({
    mutationFn: updateTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table updated successfully", {
        autoClose: 1500,
      });
    },
    onError: (error) => {
      console.error("Failed to update table:", error);
      toast.error("Failed to update table:", {
        autoClose: 1500,
      });
    },
  });

  const deleteTableMutation = useMutation({
    mutationFn: deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table deleted successfully!", {
        autoClose: 1500,
      });
    },
    onError: (error) => {
      toast.error("Failed to delete table.", {
        autoClose: 1500,
      });
      console.error("Failed to delete table:", error);
    },
  });

  return {
    tables,
    isLoading,
    createTableMutation,
    updateTableMutation,
    deleteTableMutation,
    useGetTable,
  };
};
