import "./HeaderSection.css";
import { useContext } from "react";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "./CustomContext";

export default function HeaderSection() {
  const { theme, changeTheme } = useContext(ThemeContext);

  const hijriDateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let hijriDate = hijriDateFormatter.format(Date.now());

  const gregorianDateFormatter = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let gregorianDate = gregorianDateFormatter.format(Date.now());

  return (
    <>
      <header className={`header-section-container center ${theme.mode}`}>
        <div>
          <h1 className="toDo-title">المهام</h1>

          <div className="tody-date-container">
            <p>{hijriDate}</p>
            <p>{gregorianDate}</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div>
          <div className="center theme-container">
            <div className={`${theme.dark}`} onClick={changeTheme}>
              <SunIcon className="h-6 w-6 text-gray-500" />
            </div>

            <div className={`${theme.light}`} onClick={changeTheme}>
              <MoonIcon className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
