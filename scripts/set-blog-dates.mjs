import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Publishing order: logical content strategy rollout
// Cluster by cluster, with the pillar post first in its cluster
const PUBLISH_ORDER = [
  // Week 1-3: Cultural Health Practices (brand-building, foundational)
  'why-chinese-drink-hot-water',
  'why-indian-food-uses-spices',
  'hot-cold-foods-chinese-medicine',
  'ayurveda-food-combining-rules',
  'ayurveda-vs-tcm-food-philosophy',

  // Week 3-6: Spice-Based Functional Cooking (bridges to recipes)
  'how-to-build-spice-cabinet',
  'what-is-tadka-how-to-make',
  'whole-spices-vs-ground',
  'how-to-cook-with-turmeric-every-day',
  'warming-spices-winter-cooking',

  // Week 6-8: Gut Health & Digestion (problem-solving, high intent)
  'what-to-eat-stomach-upset',
  'best-foods-bloating-gas',
  'foods-help-constipation-naturally',
  'best-spices-digestion',
  'how-to-reset-gut-naturally',

  // Week 8-11: Anti-Inflammatory (condition-specific)
  'anti-inflammatory-foods-joint-pain',
  'anti-inflammatory-foods-gut-health',
  'anti-inflammatory-foods-skin',
  'anti-inflammatory-spices-cooking',
  'how-to-start-anti-inflammatory-diet',

  // Week 11-14: Stress & Nervous System (brand-defining, pillar first)
  'vagus-nerve-stimulation-ancient-modern',
  'foods-that-calm-nervous-system',
  'what-to-eat-anxiety-relief',
  'foods-that-reduce-cortisol',
  'adaptogenic-herbs-stress-anxiety',
  'evening-routine-calm-anxiety',

  // Week 14-17: "What to Eat When..." (long-tail traffic machine)
  'what-to-eat-when-sick-no-appetite',
  'what-to-eat-after-food-poisoning',
  'what-to-eat-cold-flu',
  'what-to-eat-tired-all-the-time',
  'what-to-eat-after-antibiotics',

  // Week 17-19: Sleep & Nighttime Foods (underserved niche)
  'foods-that-help-you-sleep',
  'what-to-eat-before-bed-sleep',
  'how-to-stop-waking-up-3am',
  'best-teas-for-sleep',
  'warm-milk-before-bed-does-it-work',
]

function generateTuesThuDates(startDate, count) {
  const dates = []
  const current = new Date(startDate)

  while (dates.length < count) {
    const day = current.getDay() // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu
    if (day === 2 || day === 4) {
      // Tue or Thu — publish at 9:00 AM UTC
      dates.push(new Date(current.getFullYear(), current.getMonth(), current.getDate(), 9, 0, 0))
    }
    current.setDate(current.getDate() + 1)
  }

  return dates
}

async function main() {
  // Start: Tuesday, January 6, 2026
  const dates = generateTuesThuDates('2026-01-06', PUBLISH_ORDER.length)

  console.log(`Assigning ${dates.length} publish dates (Tue/Thu starting Jan 6 2026)\n`)

  for (let i = 0; i < PUBLISH_ORDER.length; i++) {
    const slug = PUBLISH_ORDER[i]
    const date = dates[i].toISOString()
    const dateLabel = dates[i].toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

    const { error } = await supabase
      .from('blog_posts')
      .update({ created_at: date })
      .eq('slug', slug)

    if (error) {
      console.log(`  ✗ ${dateLabel}  ${slug} — ${error.message}`)
    } else {
      console.log(`  ${dateLabel.padEnd(22)} ${slug}`)
    }
  }

  console.log('\nDone. All publish dates updated.')
}

main()
