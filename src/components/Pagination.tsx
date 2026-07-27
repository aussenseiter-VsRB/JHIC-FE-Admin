import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

function visiblePages(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const maxVisible = siblingCount * 2 + 3;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > siblingCount + 2) pages.push("...");
    for (
      let i = Math.max(2, currentPage - siblingCount);
      i <= Math.min(totalPages - 1, currentPage + siblingCount);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - siblingCount - 1) pages.push("...");
    pages.push(totalPages);
  }
  return pages;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const pages = visiblePages(currentPage, totalPages, siblingCount);

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-500 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-sm text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm transition-all ${
              currentPage === page
                ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-600"
                : "border-slate-200 bg-white text-slate-500 hover:border-blue-500 hover:text-blue-500"
            }`}
          >
            {page}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-500 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
