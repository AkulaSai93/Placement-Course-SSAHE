/**
 * Facts about the programme that more than one screen states, as the live
 * sot.upgrad.com/ssahelr FAQ gives them: ₹50,000 + 18% GST (₹59,000 in all),
 * a ₹499 seat blocking amount deducted from it (₹58,501 balance), the balance
 * due within 10 days of the offer letter, and a cohort starting on
 * 1 December 2026. LaunchReady is offline — every class and event is in
 * person.
 *
 * ASSUMPTION to confirm: the campus name and the schedule in lib/schedule.js
 * are placeholders — the FAQ says the offer letter doesn't give the location.
 */
export const PROGRAMME = {
  name: "uGSOT LaunchReady",
  duration: "6 months",
  mode: "Offline",
  fee: 50000,
  gstRate: 0.18,
  feeWithGst: 59000,
  seatAmount: 499,
  balance: 58501,
  balanceDueDays: 10,
  cohort: "December 2026 · Offline",
  startDate: "1 December 2026",
  startShort: "1 Dec 2026",
  campus: "SSAHE Campus",
  email: "ugsotlaunchready@upgradsot.com",
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
