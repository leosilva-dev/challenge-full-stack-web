export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatCPFDisplay = (cpf: string): string => {
  if (!cpf) return ''
  const cleanCPF = cpf.replace(/\D/g, '')
  return cleanCPF.length === 11
    ? cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    : cpf
}

export const cleanCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '')
}

export const applyCPFMask = (value: string): string => {
  let maskedValue = value.replace(/\D/g, '') // Remove all non-digits

  if (maskedValue.length <= 11) {
    maskedValue = maskedValue.replace(/(\d{3})(\d)/, '$1.$2')
    maskedValue = maskedValue.replace(/(\d{3})(\d)/, '$1.$2')
    maskedValue = maskedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  return maskedValue
}

export const handleCPFInput = (event: Event, callback: (value: string) => void): void => {
  const input = event.target as HTMLInputElement
  const formattedValue = applyCPFMask(input.value)
  callback(formattedValue)
}
