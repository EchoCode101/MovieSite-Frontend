// import Paginator from "../components/Paginator";

import MemberProfile from "../components/EditUserComp/MemberProfile";
import MemberComments from "../components/EditUserComp/MemberComments";
import MemberReviews from "../components/EditUserComp/MemberReviews";
import ProfileDetailsForm from "../components/EditUserComp/ProfileDetailsForm";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMemberData,
  updateMemberData,
} from "../../redux/slices/memberSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
const EditUser = () => {
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const { memberData, status, error } = useSelector((state) => state.member);
  // console.log("memberData:", JSON.stringify(memberData, null, 2));

  const onRefresh = useCallback(() => {
    if (memberId) {
      dispatch(fetchMemberData(memberId));
    }
  }, [dispatch, memberId]);
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);
  // console.log("Member Data:", memberData); // Check the output

  if (status === "loading") {
    return <LoadingSpinner r={20} w={30} h={"100vh"} />;
  }

  if (status === "failed") {
    return <div>Error: {error || "Failed to load member data."}</div>;
  }

  return (
    <>
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Edit User</h2>
              </div>
            </div>

            <div className="col-12">
              {memberData && (
                <MemberProfile
                  data={memberData}
                  status={status}
                  onRefresh={onRefresh}
                />
              )}
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab-1"
                  role="tabpanel"
                  aria-labelledby="1-tab"
                >
                  <div className="col-12">
                    {memberData ? (
                      <ProfileDetailsForm
                        profileData={memberData}
                        onSave={(updatedData) => {
                          dispatch(
                            updateMemberData({
                              memberId: updatedData.member_id,
                              formData: updatedData,
                            })
                          );
                        }}
                      />
                    ) : (
                      <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} /> // Show a loader or placeholder
                    )}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-2"
                  role="tabpanel"
                  aria-labelledby="2-tab"
                >
                  <div className="col-12">
                    <MemberComments
                      comments={memberData?.memberComments || []}
                    />
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-3"
                  role="tabpanel"
                  aria-labelledby="3-tab"
                >
                  <div className="col-12">
                    <MemberReviews reviews={memberData?.memberReviews || []} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditUser;
{
  /* <div className="col-12">
                    <Paginator
                      pages={Array.from({ length: 1 }, (_, i) => i + 1)}
                      currentPage={1}
                      onPageChange={(page) => dispatch(setCurrentPage(page))}
                    />
                  </div> */
}
{
  /* <div className="col-12">
                    <Paginator
                      pages={Array.from({ length: 1 }, (_, i) => i + 1)}
                      currentPage={1}
                      onPageChange={(page) => dispatch(setCurrentPage(page))}
                    />
                  </div>
{
  /*  <div
        id="modal-view"
        className="zoom-anim-dialog mfp-hide modal modal--view"
      >
        <div className="comments__autor">
          <img
            className="comments__avatar"
            src="/src/assets/img/user.svg"
            alt=""
          />
          <span className="comments__name">John Doe</span>
          <span className="comments__time">30.08.2018, 17:53</span>
        </div>
        <p className="comments__text">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure there isn&apos;t anything embarrassing hidden in the middle
          of text.
        </p>
        <div className="comments__actions">
          <div className="comments__rate">
            <span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 7.3273V14.6537"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6667 10.9905H7.33333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              12
            </span>

            <span>
              7
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6667 10.9905H7.33333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div><div id="modal-delete" className="zoom-anim-dialog mfp-hide modal">
        <h6 className="modal__title">Comment delete</h6>

        <p className="modal__text">
          Are you sure to permanently delete this comment?
        </p>

        <div className="modal__btns">
          <button className="modal__btn modal__btn--apply" type="button">
            Delete
          </button>
          <button className="modal__btn modal__btn--dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div>

      <div
        id="modal-view2"
        className="zoom-anim-dialog mfp-hide modal modal--view"
      >
        <div className="reviews__autor">
          <img
            className="reviews__avatar"
            src="/src/assets/img/user.svg"
            alt=""
          />
          <span className="reviews__name">Best Marvel movie in my opinion</span>
          <span className="reviews__time">24.08.2018, 17:53 by John Doe</span>

          <span className="reviews__rating">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
            </svg>
            8.4
          </span>
        </div>
        <p className="reviews__text">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure there isn&apos;t anything embarrassing hidden in the middle
          of text.
        </p>
      </div>

      <div id="modal-delete2" className="zoom-anim-dialog mfp-hide modal">
        <h6 className="modal__title">Review delete</h6>

        <p className="modal__text">
          Are you sure to permanently delete this review?
        </p>

        <div className="modal__btns">
          <button className="modal__btn modal__btn--apply" type="button">
            Delete
          </button>
          <button className="modal__btn modal__btn--dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div>

      <div id="modal-status3" className="zoom-anim-dialog mfp-hide modal">
        <h6 className="modal__title">Status change</h6>

        <p className="modal__text">
          Are you sure about immediately change status?
        </p>

        <div className="modal__btns">
          <button className="modal__btn modal__btn--apply" type="button">
            Apply
          </button>
          <button className="modal__btn modal__btn--dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div>

      <div id="modal-delete3" className="zoom-anim-dialog mfp-hide modal">
        <h6 className="modal__title">User delete</h6>

        <p className="modal__text">
          Are you sure to permanently delete this user?
        </p>

        <div className="modal__btns">
          <button className="modal__btn modal__btn--apply" type="button">
            Delete
          </button>
          <button className="modal__btn modal__btn--dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div> */
}
