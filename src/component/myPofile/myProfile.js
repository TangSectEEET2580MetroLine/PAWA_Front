import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/state/AuthProvider";
import SideMenu from "../sidemenu/sideMenu";
import "../menu/menu.css";
import "./myProfile.css";

function MyProfile() {
  const { state } = useContext(AuthContext);
  const passenger = state.passenger || state.user || {};

  // Side menu logic (same as in Menu.js)
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState({ ...passenger });

  React.useEffect(() => {
    if (open) setShowMenu(true);
  }, [open]);

  React.useEffect(() => {
    setEditValues({ ...passenger });
  }, [passenger]);

  function handleTransitionEnd() {
    if (!open) setShowMenu(false);
  }

  function handleEditToggle() {
    setEditMode((prev) => !prev);
    setEditValues({ ...passenger });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSliderChange(e) {
    const { checked } = e.target;
    setEditValues((prev) => ({
      ...prev,
      disabilityStatus: checked,
    }));
  }

  function handleCancel() {
    setEditValues({ ...passenger });
    setEditMode(false);
  }

  function handleApply() {
    // TODO: Implement save logic (API call and update context)
    setEditMode(false);
  }

  return (
    <div className="menu-container">
      {!open && (
        <button className="menu-toggle-btn" onClick={() => setOpen(true)}>
          <img src="/menu.png" alt="Menu" width={32} height={32} />
        </button>
      )}
      <div
        className={`side-menu-wrapper${open ? " open" : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        {showMenu && <SideMenu onClose={() => setOpen(false)} />}
      </div>
      <div className="menu-content">
        <div
          className="profile-container"
          style={{
            maxWidth: 500,
            margin: "40px auto",
            background: "#f7fafd",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            position: "relative"
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>
            My Profile
            <img
              src="/pencil.png"
              alt="Edit"
              width={22}
              height={22}
              className={`edit-icon ${editMode ? "edit-fade" : ""}`}
              style={{
                marginLeft: 12,
                verticalAlign: "middle",
                cursor: "pointer",
                transition: "opacity 0.3s"
              }}
              title={editMode ? "Cancel Edit" : "Edit Profile"}
              onClick={handleEditToggle}
            />
          </h2>
          <div style={{ marginBottom: 12 }}>
            <strong>First Name:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="firstName"
                value={editValues.firstName || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.firstName || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Middle Name:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="middleName"
                value={editValues.middleName || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.middleName || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Last Name:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="lastName"
                value={editValues.lastName || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.lastName || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>National ID:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="nationalId"
                value={editValues.nationalId || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.nationalId || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Date of Birth:</strong>{" "}
            {editMode ? (
              <input
                type="date"
                name="dateOfBirth"
                value={editValues.dateOfBirth || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.dateOfBirth || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Residence Address:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="residenceAddress"
                value={editValues.residenceAddress || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.residenceAddress || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Phone Number:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={editValues.phoneNumber || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.phoneNumber || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Student ID:</strong>{" "}
            {editMode ? (
              <input
                type="text"
                name="studentId"
                value={editValues.studentId || ""}
                onChange={handleInputChange}
                style={{ width: "60%" }}
              />
            ) : (
              passenger.studentId || "-"
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Disability Status:</strong>{" "}
            {editMode ? (
              <label className="switch">
                <input
                  type="checkbox"
                  name="disabilityStatus"
                  checked={!!editValues.disabilityStatus}
                  onChange={handleSliderChange}
                />
                <span className="slider"></span>
                <span className="slider-label">{editValues.disabilityStatus ? "Yes" : "No"}</span>
              </label>
            ) : (
              passenger.disabilityStatus ? "Yes" : "No"
            )}
          </div>
          {editMode && (
            <div className="profile-btn-group">
              <button className="profile-btn apply-btn" onClick={handleApply}>
                Apply
              </button>
              <button className="profile-btn cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;