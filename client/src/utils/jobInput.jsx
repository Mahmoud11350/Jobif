export const newJobInputs = [
  { name: "position", label: "Position", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "jobLocation", label: "Job Location", type: "text" },
  {
    name: "jobStatus",
    label: "Job Status",
    type: "select",
    enum: ["pending", "interview", "declined"],
  },
  {
    name: "jobType",
    label: "Job Type",
    type: "select",
    enum: ["full-time", "part-time", "internship"],
  },
];

export const jobSearch = [
  { name: "search", label: "search", type: "text" },

  {
    name: "jobStatus",
    label: "Job Status",
    type: "select",
    enum: ["all", "pending", "interview", "declined"],
  },
  {
    name: "jobType",
    label: "Job Type",
    type: "select",
    enum: ["all", "full-time", "part-time", "internship"],
  },
  {
    name: "sort",
    label: "sort",
    type: "select",
    enum: ["oldest", "newest", "A-Z", "Z-A"],
  },
];
