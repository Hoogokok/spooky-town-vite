export const generatePagination = (currentPage: number, totalPages: number) => {
    // 총 페이지가 8 이하인 경우
    if (totalPages <= 8) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 현재 페이지가 처음 3 페이지인 경우
    if (currentPage < 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // 현재 페이지가 마지막 3 페이지인 경우
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // 현재 페이지가 중간에 위치한 경우
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
} 