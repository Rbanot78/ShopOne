const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePageNumberClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const range = 2; // To show a range of pages around the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full hover:from-blue-600 hover:to-teal-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        <span className="font-semibold">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageNumberClick(pageNumber)}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full hover:from-blue-600 hover:to-teal-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        <span className="font-semibold">Next</span>
      </button>
    </div>
  );
};

export default Pagination;
