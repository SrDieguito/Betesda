import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('persons')
      .select('*')
      .order('created_at', { ascending: false })

    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { nombre, telefono, direccion, ciudad } = req.body

    const { data, error } = await supabase
      .from('persons')
      .insert([{ nombre, telefono, direccion, ciudad }])

    return res.status(200).json(data)
  }

  if (req.method === 'DELETE') {
    const { id } = req.body

    await supabase
      .from('persons')
      .delete()
      .eq('id', id)

    return res.status(200).json({ ok: true })
  }

}