'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GitHubIcon } from './icons'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

export function AuthButton ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback' // URL nuestra para llamar a un método que guarde las creedenciales de usuario en una cookie
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // para recuperar la sesion del usuario
  // en su lugar pasamos por parametro
  /*
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    getSession()
  }, [])
  */

  return (
    <header>
      {
        session === null
          ? (
            <Button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50
            font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 mr-2 mb-2">
              <GitHubIcon />
              Iniciar sesión Github
            </Button>
            )
          : <Button onClick={handleSignOut}>Cerrar Sesión</Button>
      }
    </header>
  )
}
