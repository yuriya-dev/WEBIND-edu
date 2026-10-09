"use client";

import React from "react";
import {
  Laptop,
  Code,
  Globe,
  Robot,
  Brain,
  type IconProps,
} from "@phosphor-icons/react";

interface ProgramIconProps extends IconProps {
  slug: string;
}

export default function ProgramIcon({
  slug,
  size = 32,
  weight = "duotone",
  className,
  ...rest
}: ProgramIconProps) {
  switch (slug) {
    case "digital-starter":
      return <Laptop size={size} weight={weight} className={className} {...rest} />;
    case "coding-starter":
      return <Code size={size} weight={weight} className={className} {...rest} />;
    case "web-developer":
      return <Globe size={size} weight={weight} className={className} {...rest} />;
    case "ai-starter":
      return <Robot size={size} weight={weight} className={className} {...rest} />;
    case "ai-developer":
      return <Brain size={size} weight={weight} className={className} {...rest} />;
    default:
      return <Code size={size} weight={weight} className={className} {...rest} />;
  }
}
