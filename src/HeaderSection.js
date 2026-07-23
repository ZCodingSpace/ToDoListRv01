import "./HeaderSection.css";
import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import { ThemeContext } from "./CustomContext";

export default function HeaderSection() {
  const { theme, changeTheme } = useContext(ThemeContext);
  console.log(theme);

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
            <div className={`${theme.light}`} onClick={changeTheme}>
              <LightModeIcon
                sx={{
                  "@media (min-width: 767px)": {
                    fontSize: "3rem",
                  },
                }}
              />
            </div>
            <div className={`${theme.dark}`} onClick={changeTheme}>
              <DarkModeIcon
                sx={{
                  "@media (min-width: 767px)": {
                    fontSize: "3rem",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
