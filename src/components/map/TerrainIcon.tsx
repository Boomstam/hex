import { TerrainType } from "../../game/terrain/terrainTypes";
import {
  GiEarthCrack,
  GiForestCamp,
  GiGrass,
  GiHills,
  GiMountainCave,
  GiPineTree,
} from "react-icons/gi";
import { FaWater } from "react-icons/fa";
import { WiSmog } from "react-icons/wi";

interface TerrainIconProps {
  type: TerrainType | undefined;
}

const TerrainIcon: React.FC<TerrainIconProps> = ({ type }) => {
  if (type === undefined) return null;
  switch (type) {
    case TerrainType.Water:
      return <FaWater className="terrain-icon" />;
    case TerrainType.Crater:
      return <GiEarthCrack className="terrain-icon" />;
    case TerrainType.Earth:
      return <GiGrass className="terrain-icon" />;
    case TerrainType.Mud:
      return <WiSmog className="terrain-icon" />;
    case TerrainType.Forest:
      return <GiPineTree className="terrain-icon" />;
    case TerrainType.Hill:
      return <GiHills className="terrain-icon" />;
    case TerrainType.HillForest:
      return <GiForestCamp className="terrain-icon" />;
    case TerrainType.Mountain:
      return <GiMountainCave className="terrain-icon" />;
  }
};

export default TerrainIcon;
