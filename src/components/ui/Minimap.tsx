import { useEffect } from "react";
import { scrollToCoor } from "../../game/map/DOMAccessor";
import { minimapPxSize } from "../../game/map/mapSettings";

const Minimap: React.FC = () => {
  const mapClicked = (e: any) => {
    const boundingRect = e.target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const x = Math.floor((mouseX - boundingRect.x) / minimapPxSize);
    const y = Math.floor((mouseY - boundingRect.y) / minimapPxSize);
    scrollToCoor({ x, y });
  };
  useEffect(() => {
    window.onscroll = onScroll;
    window.onresize = onResize;
    onResize();
  }, []);
  const onScroll = () => {
    const gridEl = document.getElementById("grid");
    if (gridEl === null) return;
    const minimapEl = document.getElementById("minimap-container");
    if (minimapEl === null) return;
    const viewEl = document.getElementById("minimap-view");
    if (viewEl === null) return;
    const width =
      gridEl.clientWidth - window.innerWidth + viewEl.clientWidth * 21.5; // ?
    const height =
      gridEl.clientHeight - window.innerHeight + viewEl.clientHeight * 21;
    const normX = (window.scrollX / width) * 100;
    const normY = (window.scrollY / height) * 100;
    viewEl.style.left = normX + "%";
    viewEl.style.top = normY + "%";
  };
  const onResize = () => {
    const gridEl = document.getElementById("grid");
    if (gridEl === null) return;
    const minimapEl = document.getElementById("minimap-container");
    if (minimapEl === null) return;
    const viewEl = document.getElementById("minimap-view");
    if (viewEl === null) return;
    const widthRatio = window.innerWidth / gridEl.clientWidth;
    const heightRatio = window.innerHeight / gridEl.clientHeight;
    const width = minimapEl.clientWidth * widthRatio;
    const height = minimapEl.clientHeight * heightRatio;
    viewEl.style.width = width + "px";
    viewEl.style.height = height + "px";
  };
  return (
    <div id="minimap-container" className="minimap-container">
      <canvas
        id="minimap"
        className="minimap"
        onClick={(e) => mapClicked(e)}
      ></canvas>
      <div id="minimap-view" className="minimap-view" />
    </div>
  );
};

export default Minimap;
