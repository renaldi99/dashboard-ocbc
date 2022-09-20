import {
  BsFillCalendar2WeekFill,
  BsFillGrid1X2Fill,
  BsFillKeyFill,
} from "react-icons/bs";

export const _nav = [
  {
    icon: <BsFillGrid1X2Fill />,
    name: "Dashboard",
    to: "/",
  },
  {
    icon: <BsFillCalendar2WeekFill />,
    name: "Absensi",
    to: "absensi",
  },
  {
    icon: <BsFillKeyFill />,
    name: "Log Vpn",
    to: "vpn",
  },
];
