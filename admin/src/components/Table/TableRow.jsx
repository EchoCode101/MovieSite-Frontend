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
      <TableCell>{data.id}</TableCell>
      {/*When Data is coming from the Catalog Table, then this table formate will render*/}
      {data.catalogTable && (
        <>
          <TableCell>{data.title}</TableCell>
          <td>
            <div className="main__table-text main__table-text--rate">
              <Svg path={path.a} />
              {data.rating}
            </div>
          </td>
          <TableCell>{data.category}</TableCell>
          <TableCell>{data.views}</TableCell>
          <TableCell classvalue={data.classValue}>{data.status}</TableCell>
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
      {/*When Data is coming from the Users Table, then this table formate will render*/}

      {data.userTable && (
        <>
          <td>
            <div className="main__user">
              <div className="main__avatar">
                <img src={data.avatar} alt="User avatar" />
              </div>
              <div className="main__meta">
                <h3>{data.name}</h3>
                <span>{data.email}</span>
              </div>
            </div>
          </td>
          <TableCell>{data.username}</TableCell>
          <TableCell>{data.pricingPlan}</TableCell>
          <TableCell>{data.comments}</TableCell>
          <TableCell>{data.reviews}</TableCell>
          <TableCell>{data.status}</TableCell>
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

      {/*When Data is coming from the Comments Table, then this table formate will render*/}

      {data.commentTable && (
        <>
          <TableCell>
            <a href="#">{data.item}</a>
          </TableCell>
          <TableCell>{data.author}</TableCell>
          <TableCell>{data.text}</TableCell>
          <TableCell>{data.likesDislikes}</TableCell>
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

      {/*When Data is coming from the Reviews Table, then this table formate will render*/}
      {data.reviewTable && (
        <>
          <TableCell>
            <a href="#">{data.item}</a>
          </TableCell>
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
    id: PropTypes.number.isRequired,
    catalogTable: PropTypes.bool,
    title: PropTypes.string,
    rating: PropTypes.number,
    category: PropTypes.string,
    views: PropTypes.number,
    classValue: PropTypes.string,
    createdDate: PropTypes.string,
    userTable: PropTypes.bool,
    avatar: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    pricingPlan: PropTypes.string,
    comments: PropTypes.number,
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
