import { useEffect } from "react";
import Mousetrap from "mousetrap";

interface ShortcutConfig {
  code: string;
  shortcutTarget?: HTMLElement;
}

type ShortcutAction = (e: KeyboardEvent) => void;

export default function useKeyboardShortcut(
  shortcutAction: ShortcutAction,
  config: ShortcutConfig
) {
  useEffect(() => {
    const targetElement = config.shortcutTarget || document;

    const keyCombo = config.code;

    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      shortcutAction(e);
    };

    Mousetrap.bind(keyCombo, handler, "keydown");

    return () => {
      Mousetrap.unbind(keyCombo);
    };
  }, [shortcutAction, config]);
}
