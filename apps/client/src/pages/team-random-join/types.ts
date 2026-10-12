import type { TeamRandomListItem } from "api/types/client";

import type { RouteName } from "@/components/team-form/types";

export interface RandomJoinRouteOption {
  name: RouteName;
  title: string;
  distanceKm: number;
}

export type { RouteName };

export type RandomJoinTeam = TeamRandomListItem;
