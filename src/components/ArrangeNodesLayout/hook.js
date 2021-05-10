import { useCallback } from "react";

export function useComponent(arrangeNodesFromGroup) {
  const arrangeNodes = useCallback(
    (event) => {
      arrangeNodesFromGroup(
        event.target.innerHTML.replace(/(<([^>]+)>)/gi, ""),
      );
    },
    [arrangeNodesFromGroup],
  );
  return { arrangeNodes };
}
