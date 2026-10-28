/**
 * Facts about the programme that more than one screen states. Lastmile is
 * offline — every class, event and venue below is in person.
 *
 * ASSUMPTIONS to confirm: the seat booking amount, cohort label, venue names
 * and the schedule are placeholders until the real ones are supplied.
 */
export const PROGRAMME = {
  name: "uGSOT Lastmile",
  duration: "6 months",
  mode: "Offline",
  fee: 50000,
  seatAmount: 499,
  cohort: "January 2027 · Offline",
  /** last day to block a seat — placeholder until the real date is set */
  seatDeadline: "20 Dec 2026",
  campus: "SSAHE Campus",
};

export const YEARS = ["3rd year", "4th year"];

export const BRANCHES = [
  "Computer Science (CSE)",
  "Information Technology (IT)",
  "AI & Data Science",
  "AI & Machine Learning",
  "Electronics & Communication (ECE)",
  "Electrical & Electronics (EEE)",
  "Mechanical",
  "Civil",
  "BCA",
  "B.Sc. Computer Science",
  "Other",
];

export const STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
