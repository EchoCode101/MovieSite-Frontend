// import Paginator from "../components/Paginator";

import MemberProfile from "../components/EditUserComp/MemberProfile";
import MemberComments from "../components/EditUserComp/MemberComments";
import MemberReviews from "../components/EditUserComp/MemberReviews";
import ProfileDetailsForm from "../components/EditUserComp/ProfileDetailsForm";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMemberData,
  updateMemberData,
} from "../../redux/slices/memberSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
const EditUser = () => {
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memberData, status, error } = useSelector((state) => state.member);
  const [activeTab, setActiveTab] = useState("Profile");

  // Redirect to users page if memberId is missing
  useEffect(() => {
    if (!memberId) {
      navigate("/users", { replace: true });
    }
  }, [memberId, navigate]);

  const onRefresh = useCallback(() => {
    if (memberId) {
      dispatch(fetchMemberData(memberId));
    }
  }, [dispatch, memberId]);
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  // Don't render if memberId is missing (will redirect)
  if (!memberId) {
    return null;
  }

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
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              )}
              <div className="tab-content" id="myTabContent">
                <div
                  className={`tab-pane fade ${
                    activeTab === "Profile" ? "show active" : ""
                  }`}
                  id="tab-1"
                  role="tabpanel"
                  aria-labelledby="1-tab"
                  style={{
                    display: activeTab === "Profile" ? "block" : "none",
                  }}
                >
                  <div className="col-12">
                    {memberData ? (
                      <ProfileDetailsForm
                        profileData={memberData}
                        onSave={() => {
                          // Update was already successful in ProfileDetailsForm
                          // Just refresh the member data to get the latest from server
                          onRefresh();
                        }}
                      />
                    ) : (
                      <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} />
                    )}
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "Comments" ? "show active" : ""
                  }`}
                  id="tab-2"
                  role="tabpanel"
                  aria-labelledby="2-tab"
                  style={{
                    display: activeTab === "Comments" ? "block" : "none",
                  }}
                >
                  <div className="col-12">
                    {memberData?.memberComments &&
                    memberData.memberComments.length > 0 ? (
                      <MemberComments comments={memberData.memberComments} />
                    ) : (
                      <div
                        className="main__table-wrap"
                        style={{
                          minHeight: "70vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div className="main__table-text">
                          No comments found for this user.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "Reviews" ? "show active" : ""
                  }`}
                  id="tab-3"
                  role="tabpanel"
                  aria-labelledby="3-tab"
                  style={{
                    display: activeTab === "Reviews" ? "block" : "none",
                  }}
                >
                  <div className="col-12">
                    {memberData?.memberReviews &&
                    memberData.memberReviews.length > 0 ? (
                      <MemberReviews reviews={memberData.memberReviews} />
                    ) : (
                      <div
                        className="main__table-wrap"
                        style={{
                          minHeight: "70vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div className="main__table-text">
                          No reviews found for this user.
                        </div>
                      </div>
                    )}
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
