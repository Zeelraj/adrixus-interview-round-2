import React from "react";
import { USER_PER_PAGE } from "../utils/constants";

const Pagination = ({ totalUsers, currentPage, previousPage, nextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / USER_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-2 flex flex-col sm:flex-row justify-between mx-2">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium mx-1">
            {totalUsers > 0
              ? currentPage * USER_PER_PAGE - (USER_PER_PAGE - 1)
              : 0}
          </span>
          -
          <span className="font-medium mx-1">
            {currentPage * USER_PER_PAGE > totalUsers
              ? totalUsers
              : currentPage * USER_PER_PAGE}
          </span>
          of
          <span className="font-medium"> {totalUsers} </span>
          results
        </p>
      </div>
      <div>{currentPage}</div>
      {totalUsers > USER_PER_PAGE ? (
        <div className="mt-2 sm:mt-0">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => {
                previousPage();
              }}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-${
                currentPage === 1 ? "300" : "500"
              } hover:bg-gray-50 cursor-pointer`}
            >
              <span>Previous</span>
            </button>
            <button
              onClick={() => {
                nextPage(pageNumbers.length);
              }}
              disabled={currentPage === pageNumbers.length}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-${
                currentPage === pageNumbers.length ? "300" : "500"
              } hover:bg-gray-50 cursor-pointer`}
            >
              <span>Next</span>
            </button>
          </nav>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
