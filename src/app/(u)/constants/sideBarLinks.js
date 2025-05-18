import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BungalowIcon from "@mui/icons-material/Bungalow";

export const ctlLinks = [
  {
    name: "Users",
    id: "usersmain",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "white",
  },
  {
    name: "White Level",
    id: "whitelevel",
    icon: "",
    styling: "",
    color: "white",
  },
  {
    name: "Market Watch",
    id: "marketwatch",
    icon: "",
    styling: "",
    color: "white",
  },
  {
    name: "Acitve Matches",
    id: "activeMatches",
    icon: "",
    styling: "",
    color: "white",
  },
  {
    name: "Manage Series/Matches",
    id: "manageSeriesMatches",
    icon: "",
    styling: "",
    color: "white",
  },
  {
    name: "Match Results Manual",
    id: "matchResultsManual",
    icon: "",
    styling: "",
    color: "white",
  },
  {
    name: "Sport Setttings",
    id: "sportsettings",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "white",
  },

  {
    name: "Reports",
    id: "reports",
    icon: "",
    styling: "",
    color: "white",
  },
];

export const linksAdmin = [
  {
    name: "Users",
    id: "usersmain",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "white",
  },
  // {
  //   name: "Market Watch",
  //   id: "marketwatch",
  //   icon: "",
  //   styling: "",
  //   color: "white",
  // },
  // {
  //   name: "Active Matches",
  //   id: "activeMatches",
  //   icon: "",
  //   styling: "",
  //   color: "white",
  // },
  // {
  //   name: "Manage Series/Matches",
  //   id: "manageSeriesMatches",
  //   icon: "",
  //   styling: "",
  //   color: "white",
  // },
  // {
  //   name: "Match Results Manual",
  //   id: "matchResultsManual",
  //   icon: "",
  //   styling: "",
  //   color: "white",
  // },
  // {
  //   name: "Sport Setttings",
  //   id: "sportsettings",
  //   icon: AdminPanelSettingsIcon,
  //   styling: "",
  //   color: "white",
  // },

  {
    name: "Reports",
    id: "reports",
    icon: "",
    styling: "",
    color: "white",
  },
];

export const whitelevelLinks = [
  {
    name: "Users",
    id: "usersmain",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "white",
  },
  {
    name: "Reports",
    id: "reports",
    icon: "",
    styling: "",
    color: "white",
  },
];

export const adminMainLinks = [
  {
    name: "Users",
    id: "usersmain",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "white",
  },
  {
    name: "Market Watch",
    id: "marketwatch",
    icon: "",
    styling: "",
    color: "white",
  },
  {
    name: "Reports",
    id: "reports",
    icon: "",
    styling: "",
    color: "white",
  },
];

export const allowedRoles = {
  systemControl: [
    "king",
    "mainAdmin",
    "admin",
    "whitelevel",
    "master",
    "super",
    "panel",
    "normalUser",
  ],
  king: [
    "mainAdmin",
    "admin",
    "whitelevel",
    "master",
    "super",
    "panel",
    "normalUser",
  ],
  mainAdmin: ["admin", "whitelevel", "master", "super", "panel", "normalUser"],
  whitelevel: ["admin", "master", "super", "agent", "normalUser"],
  admin: ["master", "super", "panel", "agent", "normalUser"],
  master: ["super", "panel", "agent", "normalUser"],
  super: ["panel", "agent", "normalUser"],
  panel: ["normalUser"],
  agent: ["normalUser"],
};

export const controlLinks = [
  {
    name: "Control",
    id: "king",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Main Admin",
    id: "mainAdmin",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Admins",
    id: "admin",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Master",
    id: "master",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Super",
    id: "super",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Panel",
    id: "panel",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Agent",
    id: "agent",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Normal Users",
    id: "normalUser",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
];

export const spLinks = [
  {
    name: "Sports Settings",
    id: "sportsettings",
    icon: "",
    styling: "",
    color: "primary",
  },
  // {
  //   name: "Series Setting",
  //   id: "seriesetting",
  //   icon: "",
  //   styling: "",
  //   color: "primary",
  // },
  {
    name: "Match Setting",
    id: "matchsetting",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Market Setting",
    id: "markertsetting",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Fancy Manager",
    id: "fancymanager",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Bookmaker Manager",
    id: "bookmakermanager",
    icon: "",
    styling: "",
    color: "primary",
  },
  // {
  //   name: "Match Results",
  //   id: "matchresults",
  //   icon: "",
  //   styling: "",
  //   color: "primary",
  // },
  {
    name: "Match Rollback",
    id: "matchrollback",
    icon: "",
    styling: "",
    color: "primary",
  },

  {
    name: "Delete Declared Markets",
    id: "deletedeclaredmarkets",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Clear All Data",
    id: "clearalldata",
    icon: "",
    styling: "",
    color: "primary",
  },
];

export const controlReportLinks = [
  {
    name: "Settlement",
    id: "settlement",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Bet History",
    id: "bet_history",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Casino Result Report",
    id: "casino_result_report",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Account Statement",
    id: "account_statement",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Profit & Loss By Match",
    id: "profit_loss_by_match",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Profit & Loss By Upline",
    id: "profit_loss_by_upline",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Deleted Bets",
    id: "deleted_bets",
    icon: "",
    styling: "",
    color: "primary",
  },
];

export const level3ReportLinks = [
  {
    name: "Settlements",
    id: "settlement",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Sports Bet History",
    id: "bet_history",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Casino Bet History",
    id: "casinobethistory",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Transaction logs",
    id: "transactions",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Account Statements",
    id: "account_statement",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "Profit & Loss By User",
    id: "profit_loss",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "P & L By Match",
    id: "profit_loss_by_match",
    icon: "",
    styling: "",
    color: "primary",
  },
  {
    name: "P & L By Upline",
    id: "profit_loss_by_upline",
    icon: "",
    styling: "",
    color: "primary",
  },
 
];

export const panelLinks = [
  {
    name: "Home",
    id: "home",
    icon: BungalowIcon,
    styling: "",
    color: "secondary",
  },
  {
    name: "Users",
    id: "normalUser",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "white",
  },
  {
    name: "Settings",
    id: "settings",
    icon: SettingsIcon,
    styling: "",
    color: "primary",
  },
];

export const mainAdminLinks = [
  {
    name: "Home",
    id: "home",
    icon: BungalowIcon,
    styling: "",
    color: "secondary",
  },
  {
    name: "Admin(s)",
    id: "admin",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "black",
  },
  {
    name: "Settings",
    id: "settings",
    icon: SettingsIcon,
    styling: "",
    color: "primary",
  },
];

export const adminLinks = [
  {
    name: "Home",
    id: "home",
    icon: BungalowIcon,
    styling: "",
    color: "secondary",
  },
  {
    name: "Master Users",
    id: "master",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "black",
  },
  {
    name: "Settings",
    id: "settings",
    icon: SettingsIcon,
    styling: "",
    color: "primary",
  },
];

export const masterLinks = [
  {
    name: "Home",
    id: "home",
    icon: BungalowIcon,
    styling: "",
    color: "secondary",
  },
  {
    name: "Super Users",
    id: "super",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "success",
  },
  {
    name: "Settings",
    id: "settings",
    icon: SettingsIcon,
    styling: "",
    color: "primary",
  },
];

export const superLinks = [
  {
    name: "Home",
    id: "home",
    icon: BungalowIcon,
    styling: "",
    color: "secondary",
  },
  {
    name: "Panel",
    id: "normalUser",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "white",
  },
  {
    name: "Settings",
    id: "settings",
    icon: SettingsIcon,
    styling: "",
    color: "primary",
  },
];

export const scLinks = [
  {
    name: "Home",
    id: "home",
    icon: BungalowIcon,
    styling: "",
    color: "secondary",
  },
  {
    name: "Control Users",
    id: "control",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Main Admin",
    id: "mainadmin",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Admins",
    id: "admin",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Master",
    id: "master",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Super User",
    id: "super",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Panel User",
    id: "panel",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Normal Users",
    id: "users",
    icon: AdminPanelSettingsIcon,
    styling: "",
    color: "primary",
  },
  {
    name: "Settings",
    id: "settings",
    icon: SettingsIcon,
    styling: "",
    color: "primary",
  },
];
