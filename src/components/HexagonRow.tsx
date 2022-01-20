import Hexagon from "./Hexagon";

interface HexagonRowProps {
  rowIndex: number;
  rowSize: number;
}

const HexagonRow: React.FC<HexagonRowProps> = ({ rowIndex, rowSize }) => {
  const rows = new Array(rowSize).fill(0);
  const rowClass = "hex-row" + (rowIndex % 2 === 1 ? " odd-row" : "");
  return (
    <div className={rowClass}>
      {rows.map((_, x) => (
        <Hexagon key={"hex_" + rowIndex + ", " + x} coor={{ x, y: rowIndex }} />
      ))}
    </div>
  );
};

export default HexagonRow;
