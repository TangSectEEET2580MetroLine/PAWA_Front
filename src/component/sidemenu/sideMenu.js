import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidemenu.css";

function SideMenu({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="side-menu side-menu-top">
      <button
        className="side-menu-btn"
        style={{ justifyContent: "center" }}
        onClick={onClose}
      >
        <img src="/reject.png" alt="Reject" width={20} height={20} />
      </button>
      <button className="side-menu-btn" onClick={() => navigate("/menu")}>
        <img
          src="/home.png"
          alt="Home"
          width={20}
          height={20}
          style={{ marginRight: 8 }}
        />
        Home
      </button>
      <button className="side-menu-btn" onClick={() => navigate("/profile")}>
        <img
          src="/user.png"
          alt="Profile"
          width={20}
          height={20}
          style={{ marginRight: 8 }}
        />
        My Profile
      </button>
      <button className="side-menu-btn" onClick={() => navigate("/metrolines")}>
        <img
          src="/train.png"
          alt="Metro Lines"
          width={20}
          height={20}
          style={{ marginRight: 8 }}
        />
        Metro Lines
      </button>
      <button className="side-menu-btn" onClick={() => navigate("/cart")}>
        <img
          src="/shopping-cart.png"
          alt="My Cart"
          width={20}
          height={20}
          style={{ marginRight: 8 }}
        />
        My Cart
      </button>

      <button className="side-menu-btn" onClick={() => navigate("/login")}>
        <img
          src="/log-out.png"
          alt="Log Out"
          width={20}
          height={20}
          style={{ marginRight: 8 }}
        />
        Log Out
      </button>
    </div>
  );
}

export default SideMenu;
