import { Api } from './ApiConfigs'

export interface IStudent {
  id: number
  ra: string
  name: string
  email: string
  cpf: string
}

const getAll = async (
  page: number,
  pageSize: number,
  search: string = ''
): Promise<IStudent[] | undefined> => {
  try {
    const { data } = await Api.get<IStudent[]>(
      `/alunos?page=${page}&pageSize=${pageSize}&search=${search}`
    )
    return data
  } catch (error) {
    return undefined
  }
}

const getById = async (id: number): Promise<IStudent | undefined> => {
  try {
    const { data } = await Api.get(`/alunos/${id}`)
    return data.result
  } catch (error) {
    return undefined
  }
}

const deleteById = async (id: number): Promise<string | undefined> => {
  try {
    const { data } = await Api.delete(`/alunos/${id}`)
    return data.result
  } catch (error) {
    return undefined
  }
}

const create = async (newStudent: IStudent): Promise<string | Error> => {
  try {
    const { data } = await Api.post('/alunos', newStudent)
    return data
  } catch (error: any) {
    if (error.response && error.response.data.error) {
      return new Error(error.response.data.error)
    } else {
      return new Error('Erro ao processar a requisição.')
    }
  }
}

const update = async (newStudent: IStudent): Promise<string | Error> => {
  try {
    const { id, name, email } = newStudent
    const { data } = await Api.put(`/alunos/${id}`, { name, email })
    return data
  } catch (error: any) {
    if (error.response && error.response.data.error) {
      return new Error(error.response.data.error)
    } else {
      return new Error('Erro ao processar a requisição.')
    }
  }
}

export const StudentsService = {
  create,
  update,
  getAll,
  getById,
  deleteById
}
