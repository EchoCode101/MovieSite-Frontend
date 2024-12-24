// components/EditUser/MemberReviews.js
import PropTypes from "prop-types";
import Table from "../Table/Table";

const MemberReviews = ({ reviews }) => {
  const buttonData = [
    {
      id: 1,
      iconPath:
        "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z",
      toggle: true,
      className: "main__table-btn--banned",
    },
    {
      id: 2,
      iconPath:
        "M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1,1,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z",
      href: "/edit-review",
      toggle: false,
      className: "main__table-btn--edit",
    },
    {
      id: 3,
      iconPath:
        "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z",
      toggle: true,
      className: "main__table-btn--delete",
    },
  ];
  const columns = [
    { label: "Review ID", accessor: "review_id" },
    { label: "Content", accessor: "review_content" },
    { label: "Rating", accessor: "rating" },
    {
      label: "Video",
      accessor: "video",
      render: (value) => value?.title || "N/A",
    },
    { label: "Likes", accessor: "likes" },
    { label: "Dislikes", accessor: "dislikes" },
    { label: "Created At", accessor: "createdAt" },
  ];

  return (
    <div className="main__table-wrap" style={{ minHeight: "70vh" }}>
      <Table data={reviews} columns={columns} buttonData={buttonData} />
    </div>
  );
};

MemberReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      review_id: PropTypes.number,
      review_content: PropTypes.string,
      rating: PropTypes.number,
      video: PropTypes.object,
      likes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      dislikes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      createdAt: PropTypes.string,
    })
  ),
};

export default MemberReviews;
