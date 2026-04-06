import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const { email, password } = req.body

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    if (data.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    return res.status(200).json({
      message: 'Login correcto',
      user: {
        id: data.id,
        name: data.name,
        email: data.email
      }
    })

  } catch (err) {
    return res.status(500).json({ error: 'Error interno' })
  }
}