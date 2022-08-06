import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FILTER_PARAMS,
  TABLE_HEADERS,
  USER_PER_PAGE,
} from "../utils/constants";
import Loader from "../utils/Loader";
import Pagination from "./Pagination";

const Table = () => {
  const { users, loading } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");

  if (loading) {
    <Loader />;
  }

  const indexOfLastUserOnPage = currentPage * USER_PER_PAGE;
  const indexOfFirstUserOnPage = indexOfLastUserOnPage - USER_PER_PAGE;

  const previousPage = () => {
    setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1);
  };

  const nextPage = (totalPages) => {
    setCurrentPage(currentPage + 1 < totalPages ? currentPage + 1 : totalPages);
  };

  function search(users) {
    const result = users.filter((usr) =>
      FILTER_PARAMS.some((parameter) =>
        usr[parameter.toString()].toString().toLowerCase().includes(filterValue)
      )
    );

    return result;
  }

  return (
    <div>
      <div className="w-full md:w-1/2 px-3 my-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="filterValue"
        >
          Filter Value
        </label>
        <div className="flex flex-col sm:flex-row">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="filterValue"
            name="filterValue"
            type="text"
            placeholder="name, email, contact"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {TABLE_HEADERS.map((head, index) => {
                return (
                  <th key={index} scope="col" className="py-3 px-6">
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {search(users)
              .slice(indexOfFirstUserOnPage, indexOfLastUserOnPage)
              .map((user, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">{user.id}</td>
                    <td className="py-4 px-6">
                      {`${user.firstName} ${user.lastName}`}
                    </td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.contact}</td>
                    <td className="py-4 px-6">{user.gender}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          totalUsers={search(users).length}
          currentPage={currentPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default Table;
