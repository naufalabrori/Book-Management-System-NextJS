/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/hooks/services/User/type";
import { useMemo } from "react";
import { formatDateTime } from "@/lib/functions";
import { DeleteUserAlert } from "./DeleteAlert";
import { UpdateUserForm } from "./UpdateForm";

interface ColumnUser {
  currentPage: number;
  perPage: number;
}

export const UserColumns = ({ currentPage, perPage }: ColumnUser) => {
  const columns = useMemo<ColumnDef<any, User>[]>(
    () => [
      {
        id: "numbers",
        header: "No",
        cell: (info) => {
          return (
            <div className="text-center">
              {perPage * (currentPage - 1) + (info?.row.index + 1)}
            </div>
          );
        },
      },
      {
        accessorKey: "name",
        header: () => "Name",
      },
      {
        accessorKey: "email",
        header: () => "Email",
      },
      {
        accessorKey: "role",
        header: () => "Role",
      },
      {
        accessorKey: "phone_number",
        header: () => "Phone Number",
      },
      {
        accessorKey: "created_date",
        header: () => "Created Date",
        cell: ({ row }) => formatDateTime(row.getValue("created_date")),
      },
      {
        accessorKey: "modified_date",
        header: () => "Modified Date",
        cell: ({ row }) => formatDateTime(row.getValue("modified_date")),
      },
      {
        id: "actions",
        header: "Action",
        cell: (info) => {
          const {
            id,
            name,
            email,
            role,
            phone_number,
            created_date,
            modified_date,
          } = info.row.original;

          const masterData = {
            id,
            name,
            email,
            role,
            phone_number,
            created_date,
            modified_date,
          };
          return (
            <>
              <UpdateUserForm data={masterData} />
              <DeleteUserAlert id={id} />
            </>
          );
        },
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
