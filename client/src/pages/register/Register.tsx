import { User } from "../../../../server/node_modules/.prisma/client"
import { Card, Row, Form, Space, Typography } from "antd"
import Layout from "../../components/layout/Layout"
import CustomInput from "../../components/custom-input/CustomInput"
import PasswordInput from "../../components/password-input/PasswordInput"
import CustomButton from "../../components/custom-button/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../path"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRegisterMutation } from "../../app/services/auth"
import { selectUser } from "../../features/auth/authSlice"
import { isErrorWithMessage } from "../../utils/is-error-with-message"
import ErrorMessage from "../../components/error-message/ErrorMessage"

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [error, setError] = useState("")
  const [registerUser] = useRegisterMutation()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()

      navigate("/")
    } catch (err) {
      const maybeError = isErrorWithMessage(err)

      if (maybeError) {
        setError(err.data.message)
      } else {
        setError("Неизвестная ошибка")
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput type="text" name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput name="confirmPassword" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Register
