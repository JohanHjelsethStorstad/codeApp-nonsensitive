import styles from "./Footer.module.scss"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

import UDIR from "../images/footerLogos/UDIR.png"
import IEA from "../images/footerLogos/IEA.png"
import NTNU from "../images/footerLogos/NTNU.png"
import NTNUSAMF from "../images/footerLogos/NTNUSAMF.png"
import ICCS from "../images/footerLogos/ICCS.png"

import About from "./footerWindows/About"
import ContactInfo from "./footerWindows/ContactInfo"
import PrivacyPolicy from "./footerWindows/PrivacyPolicy"
import HowToUse from "./footerWindows/HowToUse"
import ReportProblem from "./footerWindows/ReportProblem"

function Footer() {
  const [window, setWindow] = useState(null)
  
  return (
    <>
      {window === "about" ? <About onClose={() => setWindow(null)} /> : <></>}
      {window === "contactInfo" ? <ContactInfo onClose={() => setWindow(null)}/> : <></>}
      {window === "privacyPolicy" ? <PrivacyPolicy onClose={() => setWindow(null)}/> : <></>}
      {window === "howToUse" ? <HowToUse onClose={() => setWindow(null)}/> : <></>}
      {window === "reportProblem" ? <ReportProblem onClose={() => setWindow(null)}/> : <></>}

      <footer className={styles.footer}>
          <div className={styles.dev}>
            <h4>developed by Johan Hjelseth Storstad</h4>
            <h4>2022</h4>
            <h4>v. 1.3.3</h4>
          </div>
          <div className={styles.infoA}>
            <button onClick={() => setWindow("about")}>about</button>
            <button onClick={() => setWindow("contactInfo")}>contact us</button>
            <Link href="/code">start coding</Link>
          </div>
          <div className={styles.infoB}>
            <button onClick={() => setWindow("privacyPolicy")}>privacy policy</button>
            <button onClick={() => setWindow("howToUse")}>how to use</button>
            <button onClick={() => setWindow("reportProblem")}>report a problem</button>
          </div>
          <div className={styles.links}>
            <div>
              <a target="blank" href='https://www.udir.no/'></a>
              <Image width={200} objectFit="contain" src={UDIR} alt="UDIR logo" />
            </div>
            <div>
              <a target="blank" href='https://www.iea.nl/'></a>
              <Image width={200} objectFit="contain" src={IEA} alt="IEA logo" />
            </div>
            <div>
              <a target="blank" href='https://www.iea.nl/studies/iea/iccs'></a>
              <Image width={200} objectFit="contain" src={ICCS} alt="ICCS logo"/>
            </div>
            <div>
              <a target="blank" href='https://samforsk.no/'></a>
              <Image width={200} objectFit="contain"  src={NTNUSAMF} alt="NTNU samfunnsforskning logo"/>
            </div>
            <div>
              <a target="blank" href='https://www.ntnu.no/'></a>
              <Image width={200} objectFit="contain" src={NTNU} alt="NTNU logo" />
            </div>
          </div> 
      </footer>
    </>

  )
}

export default Footer
