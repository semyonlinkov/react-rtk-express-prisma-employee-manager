import { useEffect } from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import CustomButton from "../../components/custom-button/CustomButton"
import { Employee } from "../../../../server/node_modules/.prisma/client"
import { Paths } from "../../path"
import { useNavigate } from "react-router-dom"
import { useGetAllEmployeesQuery } from "../../app/services/employees"
import Layout from "../../components/layout/Layout"
import { selectUser } from "../../features/auth/authSlice"
import { useAppSelector } from "../../app/hooks"

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
]

const Employees = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const { data, isLoading } = useGetAllEmployeesQuery()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const gotToAddUser = () => navigate(Paths.employeeAdd)

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={gotToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          }
        }}
      />
    </Layout>
  )
}

export default Employees
