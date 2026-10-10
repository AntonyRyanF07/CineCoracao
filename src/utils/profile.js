export const PROFILE_KEY = 'cinecoracao-profile'

export const emptyProfile = { name: '', photo: '', created: false }

export function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY)
    if (!saved) return { ...emptyProfile }

    const parsed = JSON.parse(saved)

    if (!parsed || typeof parsed !== 'object') {
      return { ...emptyProfile }
    }

    return {
      name: parsed.name || '',
      photo: parsed.photo || '',
      created: parsed.created === true ||
        Boolean(parsed.name && parsed.name !== 'Meu perfil')
    }
  } catch {
    return { ...emptyProfile }
  }
}
