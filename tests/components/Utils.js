import { createRenderer } from "react-test-renderer/shallow";

export const shallow = (element) => {
  const renderer = createRenderer();
  renderer.render(element);
  return {
    renderer,
    instance: renderer.getMountedInstance(),
    tree: renderer.getRenderOutput(),
  };
};
