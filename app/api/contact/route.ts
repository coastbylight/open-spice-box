import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  // Basic email format check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const supabase = createClient()
  const { error } = await supabase
    .from('contact_submissions')
    .insert({ name: name.trim(), email: email.trim(), message: message.trim() })

  if (error) return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })

  return NextResponse.json({ success: true }, { status: 201 })
}
