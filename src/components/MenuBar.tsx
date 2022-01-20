const MenuBar: React.FC = () => {
  const onFullscreen = () => document.documentElement.requestFullscreen();
  return (
    <div className="menu-bar">
      <h4 className="menu-bar-content">Menu</h4>
      <button className="menu-bar-button" onClick={onFullscreen}>
        Fullscreen
      </button>
    </div>
  );
};

export default MenuBar;
