import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NavBarHeader from "../NavBarHeader/NavBarHeader";
import { sendFeedbackLanguages } from "./SendFeedbackLanguageHTMLBlocks";
import "../Footer/Footer.scss";

function SendFeedback() {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const [navToggled, setNavToggled] = useState(false);
  function handleToggle() {
    setNavToggled(!navToggled);
  }

  return (
    <div>
      <NavBarHeader toggled={navToggled} handleToggle={handleToggle} />
      <div className="footer-pages-container">
        {sendFeedbackLanguages(language)}
      </div>
    </div>
  );
}

export default SendFeedback;
