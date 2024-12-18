import PropTypes from "prop-types";
import TableCell from "./TableCell";
import TableButton from "./TableButton";
import Svg from "../Svg";
const TableRow = ({ data, buttonData }) => {
  const path = {
    a: "M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z",
    b: "M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Z",
  };
  return (
    <tr>
      {/*When Data is coming from the Catalog Table, then this table formate will render*/}
      {data.catalogTable && (
        <>
          <TableCell>{data.video_id || "N/A"}</TableCell>
          <td>
            <div className="main__user">
              <div className="main__avatar">
                <img
                  src={
                    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSLNQ1t4kHMECW1dLM7F3h1l1vWdZzZTHERYJmlg1NC7Ekl7JpWsIDXVw6EKTgiDzhlTA0u9GqgAU0Bl_gTtIy_Q-G0DdRQR4l7GsqKDSrkBA"
                    // data.thumbnail_url
                  }
                  alt="User avatar"
                />
              </div>
              <div className="main__meta">
                <h3>
                  <a href="#" className="main__table-text undefined">
                    {data.title}
                  </a>
                </h3>
              </div>
            </div>
          </td>
          <td>
            <div className="main__table-text main__table-text--rate">
              <Svg path={path.a} />
              {data.rating ? data.rating.toFixed(1) : "N/A"}
            </div>
          </td>

          <TableCell>{data.category || "N/A"}</TableCell>
          <TableCell>{data.views || 0}</TableCell>
          <TableCell
            classvalue={
              data.is_active
                ? "main__table-text--green"
                : "main__table-text--red"
            }
          >
            {data.is_active ? "Visible" : "Hidden"}
          </TableCell>
          <TableCell>
            {data.uploaded_at
              ? new Date(data.uploaded_at).toLocaleString("en-US", {
                  weekday: "long", // e.g., "Monday"
                  year: "numeric", // e.g., "2024"
                  month: "long", // e.g., "December"
                  day: "numeric", // e.g., "16"
                  hour: "numeric", // e.g., "8"
                  minute: "numeric", // e.g., "47"
                  second: "numeric", // e.g., "03"
                  hour12: true, // e.g., "PM"
                })
              : "N/A"}
          </TableCell>

          <td>
            <div className="main__table-btns">
              {buttonData.map((button, index) => (
                <TableButton
                  key={index}
                  iconPath={button.iconPath}
                  href={button.href}
                  className={button.className}
                />
              ))}
            </div>
          </td>
        </>
      )}
      {/*When Data is coming from the Users Table, then this table formate will render*/}
      {data.userTable && (
        <>
          <TableCell>{data.member_id || "N/A"}</TableCell>
          <td>
            <div className="main__user">
              <div className="main__avatar">
                <img
                  src={
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    // data.profile_pic
                  }
                  alt="User avatar"
                />
              </div>
              <div className="main__meta">
                <h3>
                  {data.first_name}&nbsp;{data.last_name}
                </h3>
                <span>{data.email}</span>
              </div>
            </div>
          </td>
          <TableCell>{data.username}</TableCell>
          <TableCell>{data.subscription_plan || "Free"}</TableCell>
          <TableCell>{data.comments_count}</TableCell>
          <TableCell>{data.reviews || 0}</TableCell>
          <TableCell
            classvalue={
              data.status === "Active"
                ? "main__table-text--green"
                : "main__table-text--red"
            }
          >
            {data.status === "Active" ? "Approved" : "Banned"}
          </TableCell>
          <TableCell>
            {data.date_of_creation
              ? new Date(data.date_of_creation).toLocaleString("en-US", {
                  weekday: "long", // e.g., "Monday"
                  year: "numeric", // e.g., "2024"
                  month: "long", // e.g., "December"
                  day: "numeric", // e.g., "16"
                  hour: "numeric", // e.g., "8"
                  minute: "numeric", // e.g., "47"
                  second: "numeric", // e.g., "03"
                  hour12: true, // e.g., "PM"
                })
              : "N/A"}
          </TableCell>
          <td>
            <div className="main__table-btns">
              {buttonData.map((button, index) => (
                <TableButton
                  key={index}
                  iconPath={button.iconPath}
                  href={button.href}
                  className={button.className}
                />
              ))}
            </div>
          </td>
        </>
      )}
      {/*When Data is coming from the Comments Table, then this table formate will render*/}
      {data.commentTable && (
        <>
          <TableCell>{data.comment_id || "N/A"}</TableCell>

          <td>
            <div className="main__user">
              <div className="main__avatar">
                <img
                  src={
                    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSLNQ1t4kHMECW1dLM7F3h1l1vWdZzZTHERYJmlg1NC7Ekl7JpWsIDXVw6EKTgiDzhlTA0u9GqgAU0Bl_gTtIy_Q-G0DdRQR4l7GsqKDSrkBA"
                    // data.thumbnail_url
                  }
                  alt="User avatar"
                />
              </div>
              <div className="main__meta">
                <h3>
                  <a href="#" className="main__table-text undefined">
                    {data.video.title}
                  </a>
                </h3>
              </div>
            </div>
          </td>
          <TableCell>
            {data.member.first_name}&nbsp;{data.member.last_name}
          </TableCell>
          <TableCell>{data.content}</TableCell>
          <TableCell
            classvalue={
              data.likesDislikes.some((likeDislike) => likeDislike.is_like)
                ? "main__table-text--green"
                : "main__table-text--red"
            }
          >
            {
              data.likesDislikes.filter((likeDislike) => likeDislike.is_like)
                .length
            }{" "}
            /{" "}
            {
              data.likesDislikes.filter((likeDislike) => !likeDislike.is_like)
                .length
            }
          </TableCell>
          <TableCell>
            {data.created_at
              ? new Date(data.created_at).toLocaleString("en-US", {
                  weekday: "long", // e.g., "Monday"
                  year: "numeric", // e.g., "2024"
                  month: "long", // e.g., "December"
                  day: "numeric", // e.g., "16"
                  hour: "numeric", // e.g., "8"
                  minute: "numeric", // e.g., "47"
                  second: "numeric", // e.g., "03"
                  hour12: true, // e.g., "PM"
                })
              : "N/A"}
          </TableCell>
          <td>
            <div className="main__table-btns">
              {buttonData.map((button, index) => (
                <TableButton
                  key={index}
                  iconPath={button.iconPath}
                  href={button.href}
                  className={button.className}
                />
              ))}
            </div>
          </td>
        </>
      )}
      {/*When Data is coming from the Reviews Table, then this table formate will render*/}
      {data.reviewTable && (
        <>
          <TableCell>{data.id || "N/A"}</TableCell>

          <td>
            <div className="main__user">
              <div className="main__avatar">
                <img src={data.thumbnailImg} alt="User avatar" />
              </div>
              <div className="main__meta">
                <h3>
                  <a href="#" className="main__table-text undefined">
                    {data.item}
                  </a>
                </h3>
              </div>
            </div>
          </td>
          <TableCell>{data.author}</TableCell>
          <TableCell>{data.text}</TableCell>
          <TableCell>
            <Svg path={path.b} />
            {data.rating}
          </TableCell>
          <TableCell>
            {data.likes} / {data.dislikes}
          </TableCell>
          <TableCell>{data.createdDate}</TableCell>

          <td>
            <div className="main__table-btns">
              {buttonData.map((button, index) => (
                <TableButton
                  key={index}
                  iconPath={button.iconPath}
                  href={button.href}
                  className={button.className}
                />
              ))}
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

TableRow.propTypes = {
  data: PropTypes.shape({
    video_id: PropTypes.number,
    member_id: PropTypes.number,
    comment_id: PropTypes.number,
    id: PropTypes.number,
    catalogTable: PropTypes.bool,
    thumbnail_url: PropTypes.string,
    thumbnailImg: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.shape({
      title: PropTypes.string,
    }),
    member: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    rating: PropTypes.number,
    category: PropTypes.string,
    views: PropTypes.number,
    classValue: PropTypes.string,
    createdDate: PropTypes.string,
    date_of_creation: PropTypes.string,
    created_at: PropTypes.string,
    uploaded_at: PropTypes.string,
    userTable: PropTypes.bool,
    avatar: PropTypes.string,
    profile_pic: PropTypes.string,
    name: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    subscription_plan: PropTypes.string,
    comments: PropTypes.number,
    comments_count: PropTypes.number,
    reviews: PropTypes.number,
    status: PropTypes.string,
    commentTable: PropTypes.bool,
    item: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string,
    likesDislikes: PropTypes.string,
    reviewTable: PropTypes.bool,
    likes: PropTypes.number,
    dislikes: PropTypes.number,
    is_active: PropTypes.bool,
  }).isRequired,
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      iconPath: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      className: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableRow;
