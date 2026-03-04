import { Composition } from "remotion";
import { ChatSimulator } from "./ChatSimulator";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ChatSimulator"
      component={ChatSimulator}
      durationInFrames={420}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
