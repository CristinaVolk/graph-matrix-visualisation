import { useCallback } from "react";

export function useComponent(changeLayout) {
  const runLayout = useCallback(
    (event) => {
      changeLayout(
        event.target.innerHTML.replace(/(<([^>]+)>)/gi, "").toLowerCase(),
      );
    },
    [changeLayout],
  );

  return { runLayout };
}
