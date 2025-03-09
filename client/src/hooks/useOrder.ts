import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../apis/order.api";

export const useOrder = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const useGetOrder = (id: string) => {
    return useQuery({
      queryKey: ["tables", id],
      queryFn: () => getOrder(id),
      enabled: !!id,
    });
  };

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to add order", {
        autoClose: 1500,
      });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order successfully", {
        autoClose: 1500,
      });
    },
    onError: () => {
      toast.error("Failed to update order", {
        autoClose: 1500,
      });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to delete order", {
        autoClose: 1500,
      });
    },
  });

  return {
    useGetOrder,
    createOrderMutation,
    orders,
    isLoading,
    updateOrderMutation,
    deleteOrderMutation,
  };
};
