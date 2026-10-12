export type MatchValue = "false" | "true";

export type RouteName = "pf-half" | "pf-full" | "mgs";

export type OpenedSelect = "" | "match" | "route";

export interface TeamFormRawValue {
  name: string;
  slogan: string;
  password: string;
  allowMatch: MatchValue | "";
  routeName: RouteName | "";
}

export interface TeamFormValue {
  name: string;
  slogan: string;
  password: string;
  allowMatch: boolean;
  routeName: RouteName;
}
