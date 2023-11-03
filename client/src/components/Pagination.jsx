import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
const Pagination = ({ numOfPages, currentPage }) => {
  const pages = Array.from({ length: numOfPages }, (_, index) => ++index);
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const handleButtons = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", page);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="absolute right-0 p-4 flex gap-2">
      <button
        className="flex items-center gap-2 py-1 px-2 bg-red-500 text-white rounded"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handleButtons(prevPage);
        }}
      >
        <AiOutlineDoubleLeft />
        Prev
      </button>
      <ul className="flex gap-2">
        {pages.map((page) => {
          return (
            <li
              className={`py-2 px-3 ${
                page == currentPage && "bg-mainColor text-white"
              }  rounded-lg border`}
              onClick={() => handleButtons(page)}
            >
              {page}
            </li>
          );
        })}
      </ul>
      <button
        className="flex items-center gap-2 py-1 px-2 bg-blue-500 text-white rounded"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handleButtons(nextPage);
        }}
      >
        Next
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};
export default Pagination;
