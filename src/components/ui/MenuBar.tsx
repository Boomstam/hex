interface MenuBarProps {
  gameShown: boolean;
  hideGame: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ gameShown, hideGame }) => {
  const onFullscreen = () => document.documentElement.requestFullscreen();
  const generateMinimap = () => {
    /*html2canvas(document.body).then(function (canvas) {
      document.body.appendChild(canvas);
    });*/

  };
  return (
    <div className="menu-bar">
      <h4 className="menu-bar-content">Menu</h4>
      <button className="menu-bar-button" onClick={onFullscreen}>
        Fullscreen
      </button>
      {gameShown && (
        <div>
          <button className="menu-bar-button" onClick={generateMinimap}>
            Generate Minimap
          </button>
          <button className="menu-bar-button" onClick={hideGame}>
            Quit game
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
