import React, { useState } from "react";
import SideMenu from "../sidemenu/sideMenu";
import "./menu.css";

function Menu() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // When open becomes true, show the menu immediately
  React.useEffect(() => {
    if (open) setShowMenu(true);
  }, [open]);

  // When animation ends and open is false, hide the menu
  function handleTransitionEnd() {
    if (!open) setShowMenu(false);
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
        <h2>Menu</h2>
        {/* Your main content here */}
      </div>
    </div>
  );
}

export default Menu;