"use client";

import { PullCord } from "pullcord";
import "pullcord/pullcord.css";

import { useTheme } from "@/components/site/theme";

/**
 * Light/dark switch: the `pullcord` rope, used as published.
 *
 * It fixes itself to the top of the viewport and is authored to hang from
 * behind a top bar, so it is mounted once at the layout level rather than
 * inside the nav. Placement and rope colour come from the --pullcord-* custom
 * properties in globals.css, which also flip the rope's ink per theme.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <PullCord
      onPull={toggle}
      pulled={theme === "light"}
      ariaLabel="Toggle theme"
    />
  );
}
