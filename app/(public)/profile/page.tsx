import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'My Profile — Ancient Pantry',
}

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/profile')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/auth/login?redirectTo=/profile')
  }

  const initials = profile.display_name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0].toUpperCase())
    .join('')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-sage-600 text-sage-50 text-2xl font-semibold shrink-0">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.display_name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="flex-1">
          <h1 className="font-display text-3xl text-charcoal-900 tracking-tight mb-1">
            {profile.display_name}
          </h1>
          {profile.cooking_skill && (
            <p className="text-sm text-charcoal-500 capitalize">
              {profile.cooking_skill} cook
            </p>
          )}
        </div>

        <Link
          href="/profile/settings"
          className="text-sm font-body text-ochre-700 hover:text-ochre-800 border border-ochre-200 hover:border-ochre-300 rounded-lg px-4 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 active:bg-ochre-50"
        >
          Edit Profile
        </Link>
      </div>

      {/* Bio */}
      {profile.bio && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-charcoal-400 mb-2 font-body">About</h2>
          <p className="text-sm text-charcoal-700 leading-relaxed font-body">{profile.bio}</p>
        </section>
      )}

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Dietary Preferences */}
        {profile.dietary_preferences && profile.dietary_preferences.length > 0 && (
          <section className="bg-white border border-parchment-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(139,90,43,0.06)]">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-400 mb-3 font-body">Dietary Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {profile.dietary_preferences.map((pref: string) => (
                <span
                  key={pref}
                  className="text-xs bg-sage-50 text-sage-700 border border-sage-200 rounded-full px-3 py-1"
                >
                  {pref}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Cuisine Interests */}
        {profile.cuisine_interests && profile.cuisine_interests.length > 0 && (
          <section className="bg-white border border-parchment-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(139,90,43,0.06)]">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-400 mb-3 font-body">Cuisine Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.cuisine_interests.map((interest: string) => (
                <span
                  key={interest}
                  className="text-xs bg-ochre-50 text-ochre-700 border border-ochre-200 rounded-full px-3 py-1"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Favorite Ingredients */}
        {profile.favorite_ingredients && profile.favorite_ingredients.length > 0 && (
          <section className="bg-white border border-parchment-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(139,90,43,0.06)]">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-400 mb-3 font-body">Favorite Ingredients</h2>
            <div className="flex flex-wrap gap-2">
              {profile.favorite_ingredients.map((ing: string) => (
                <span
                  key={ing}
                  className="text-xs bg-terra-50 text-terra-700 border border-terra-200 rounded-full px-3 py-1"
                >
                  {ing}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Cooking Skill */}
        {profile.cooking_skill && (
          <section className="bg-white border border-parchment-200 rounded-xl p-5 shadow-[0_2px_8px_-2px_rgba(139,90,43,0.06)]">
            <h2 className="text-xs uppercase tracking-widest text-charcoal-400 mb-3 font-body">Cooking Skill</h2>
            <p className="text-sm text-charcoal-700 capitalize font-body">{profile.cooking_skill}</p>
          </section>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-10 flex gap-4">
        <Link
          href="/profile/collections"
          className="text-sm font-body text-charcoal-600 hover:text-charcoal-900 border border-parchment-200 hover:border-parchment-300 rounded-lg px-4 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 active:bg-parchment-50"
        >
          My Collections
        </Link>
      </div>
    </div>
  )
}
