import { FC, PropsWithChildren } from "react"
import { Layout as AntLayout } from "antd"
import styles from "./Layout.module.scss"
import { Header } from "../header/Header"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: "100%" }}>
        {children}
      </AntLayout.Content>
    </div>
  )
}

export default Layout
