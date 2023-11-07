import { type Database } from './database'

type PostEntity = Database['public']['Tables']['posts']['Row']
type UserEntity = Database['public']['Tables']['users']['Row']

export type Post = PostEntity & {
  user: Pick<UserEntity, 'name' | 'avatar_url' | 'user_name'>
}
