// import styles
import "./HeaderSection.css";

// imports from React
import { useContext } from "react";

// import components
import { ThemeContext } from "./CustomContext";

// imports from Heroicons library
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";

export default function HeaderSection() {
  const { theme, changeTheme } = useContext(ThemeContext);

  // Format the current date in Hijri calendar using Intl.DateTimeFormat
  const hijriDateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let hijriDate = hijriDateFormatter.format(Date.now());

  // Format the current date in Gregorian calendar using Intl.DateTimeFormat
  const gregorianDateFormatter = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let gregorianDate = gregorianDateFormatter.format(Date.now());

  return (
    <>
      <header className={`header-section-container center ${theme.mode}`}>
        {/* --- Header Title and Date - START --- */}
        <div>
          <h1 className="toDo-title">المهام</h1>

          <div className="tody-date-container">
            <p>{hijriDate}</p>
            <p>{gregorianDate}</p>
          </div>
        </div>
        {/* --- Header Title and Date - END --- */}

        {/* --- Theme Toggle - START --- */}
        <div className="theme-container center">
          <div className={`${theme.dark}`} onClick={changeTheme}>
            <SunIcon />
          </div>

          <div className={`${theme.light}`} onClick={changeTheme}>
            <MoonIcon />
          </div>
        </div>
        {/* --- Theme Toggle - END --- */}
      </header>
    </>
  );
}
