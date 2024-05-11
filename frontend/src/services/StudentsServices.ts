import { Api } from './ApiConfigs'

export interface IStudent {
  id: number
  ra: string
  name: string
  email: string
  cpf: string
}

const getAll = async (): Promise<IStudent[] | undefined> => {
  try {
    const { data } = await Api.get<IStudent[]>('/alunos')
    return data
  } catch (error) {
    return undefined
  }
}

export const StudentsService = {
  getAll
}
