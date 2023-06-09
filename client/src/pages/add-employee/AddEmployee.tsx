import { Row } from "antd"
import { useState } from "react"
import EmployeeForm from "../../components/employee-form/EmployeeForm"
import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useEffect } from "react"
import { useAddEmployeeMutation } from "../../app/services/employees"
import { Employee } from "../../../../server/node_modules/.prisma/client"
import { isErrorWithMessage } from "../../utils/is-error-with-message"
import { Paths } from "../../path"

const useIsLogged = (url: string) => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user) {
      navigate(url)
    }
  }, [user, navigate])
}

export const AddEmployee = () => {
  const navigate = useNavigate()
  //   const user = useSelector(selectUser)
  const [error, setError] = useState("")
  const [addEmployee] = useAddEmployeeMutation()

  //   useEffect(() => {
  //     if (!user) {
  //       navigate("/login")
  //     }
  //   }, [user, navigate])

  useIsLogged("/login")

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()

      navigate(`${Paths.status}/created`)
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
        <EmployeeForm
          onFinish={handleAddEmployee}
          title="Добавить сутрудника"
          btnText="Добавить"
          error={error}
        />
      </Row>
    </Layout>
  )
}
