export type Flow =
  | "welcome"
  | "abandon"
  | "browse"
  | "post-purchase"
  | "winback"
  | "replenishment";

export type Inputs = {
  revenue: number;
  aov: number;
  repeatRate: number;
  frequency: number;
  emailShare: number;
  flows: Flow[];
};

export type FieldSpec = {
  key: keyof Inputs;
  label: string;
  type: "currency" | "percent" | "decimal" | "multi";
  prefix?: string;
  suffix?: string;
  placeholder: string;
  min?: number;
  max?: number;
  help: string;
  options?: Flow[];
};

export const FLOW_OPTIONS: Flow[] = [
  "welcome",
  "abandon",
  "browse",
  "post-purchase",
  "winback",
  "replenishment",
];

export const FIELDS: FieldSpec[] = [
  {
    key: "revenue",
    label: "Monthly revenue",
    type: "currency",
    prefix: "$",
    placeholder: "150,000",
    min: 5000,
    help: "Trailing 30 days, gross revenue before refunds.",
  },
  {
    key: "aov",
    label: "Average order value",
    type: "currency",
    prefix: "$",
    placeholder: "85",
    min: 20,
    help: "Blended AOV across all orders, not just new customers.",
  },
  {
    key: "repeatRate",
    label: "Repeat purchase rate",
    type: "percent",
    suffix: "%",
    placeholder: "22",
    min: 0,
    max: 100,
    help: "Percentage of customers who have placed 2+ orders.",
  },
  {
    key: "frequency",
    label: "Orders / customer / year",
    type: "decimal",
    placeholder: "1.6",
    min: 1.0,
    max: 10.0,
    help: "Average number of orders a customer places per year.",
  },
  {
    key: "emailShare",
    label: "Email % of total revenue",
    type: "percent",
    suffix: "%",
    placeholder: "12",
    min: 0,
    max: 100,
    help: "Klaviyo attributed revenue / total revenue.",
  },
  {
    key: "flows",
    label: "Active flow architecture",
    type: "multi",
    placeholder: "",
    options: FLOW_OPTIONS,
    help: "Check every flow currently running and sending.",
  },
];

export function validate(v: Partial<Inputs>): v is Inputs {
  return (
    typeof v.revenue === "number" && v.revenue >= 5000 &&
    typeof v.aov === "number" && v.aov >= 20 &&
    typeof v.repeatRate === "number" && v.repeatRate >= 0 && v.repeatRate <= 1 &&
    typeof v.frequency === "number" && v.frequency >= 1.0 && v.frequency <= 10.0 &&
    typeof v.emailShare === "number" && v.emailShare >= 0 && v.emailShare <= 1 &&
    Array.isArray(v.flows)
  );
}
