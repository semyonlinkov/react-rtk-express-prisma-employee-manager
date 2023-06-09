import {
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Layout, Space, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"
import CustomButton from "../custom-button/CustomButton"
import styles from "./Header.module.scss"
import { Paths } from "../../path"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectUser } from "../../features/auth/authSlice"

export const Header = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogoutClick = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LoginOutlined />}
          onClick={onLogoutClick}
        >
          Выйти
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton type="ghost" icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to="/login">
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}
