import PropTypes from "prop-types";

/**
 * Reusable component for displaying like/dislike counts
 * @param {number} likeCount - Number of likes
 * @param {number} dislikeCount - Number of dislikes
 */
const LikeDislikeCount = ({ likeCount = 0, dislikeCount = 0 }) => {
  return (
    <>
      <span
        className={
          likeCount > 0 ? "main__table-text--green" : "main__table-text--grey"
        }
      >
        {likeCount || 0}
      </span>
      &nbsp;/&nbsp;
      <span
        className={
          dislikeCount > 0 ? "main__table-text--red" : "main__table-text--grey"
        }
      >
        {dislikeCount || 0}
      </span>
    </>
  );
};

LikeDislikeCount.propTypes = {
  likeCount: PropTypes.number,
  dislikeCount: PropTypes.number,
};

export default LikeDislikeCount;
