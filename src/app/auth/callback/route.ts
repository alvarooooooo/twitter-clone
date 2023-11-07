// route.ts --> endpoint de la API
// ENDPOINT: An API endpoint is a digitial location where an API receives requests about a specific resource on its server.
// In APIs, an endpoint is typically a uniform resource locator (URL) that provides the location of a resource on the server

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

// esto es una opción de Next.js, para evitar que cachee de forma
// estática la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code') // para obtener el codigo del URL y evitar usar REGEX

  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies }) // Crear el cliente de supabase

    // usando el código que le hemos pasado por URL
    // nos devuelve la sesión del usuario
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin) // requestUrl.origin devuelve al usuario a la página donde estaba, también podríamos mandarlo a home con '/'
}
