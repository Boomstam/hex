interface MenuBarProps {
  gameShown: boolean;
  hideGame: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ gameShown, hideGame }) => {
  const onFullscreen = () => document.documentElement.requestFullscreen();
  return (
    <div className="menu-bar">
      <h4 className="menu-bar-content">Menu</h4>
      <button className="menu-bar-button" onClick={onFullscreen}>
        Fullscreen
      </button>
      {gameShown && (
        <button className="menu-bar-button" onClick={hideGame}>
          Quit game
        </button>
      )}
    </div>
  );
};

export default MenuBar;
