import { Employee } from "../../../../server/node_modules/.prisma/client"
import { Row } from "antd"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees"
import  EmployeeForm  from "../../components/employee-form/EmployeeForm"
import Layout from "../../components/layout/Layout"
import { Paths } from "../../path"
import { isErrorWithMessage } from "../../utils/is-error-with-message"

export const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [error, setError] = useState("")
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return <span>Загрузка</span>
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      }

      await editEmployee(editedEmployee).unwrap()

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
          onFinish={handleEditUser}
          title="Редактировать сотрудника"
          employee={data}
          btnText="Редактировать"
          error={error}
        />
      </Row>
    </Layout>
  )
}
