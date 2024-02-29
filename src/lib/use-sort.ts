import * as React from "react";

export const useSort = <T>(data: T[]) => {
  const [sortBy, setSortBy] = React.useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"up" | "down" | null>(null);

  const handleSort = (sortBy: keyof T) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder === "up" ? "down" : "up");
  };

  let sortedData = [...data];
  if (sortBy) {
    sortedData = data.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      const order = sortOrder === "up" ? 1 : -1;

      if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB) * order;
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * order;
      }

      return 0;
    });
  }

  return {
    sortedData,
    handleSort,
    sortOrder,
  };
};
