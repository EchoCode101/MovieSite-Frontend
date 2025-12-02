import type { Coupon } from '../types'

interface CouponUsageStatsProps {
  coupons: Coupon[]
}

/**
 * Simple aggregate usage statistics for coupons.
 * Backend does not expose explicit usage counts, so this can be extended later
 * when such fields become available.
 */
export function CouponUsageStats({ coupons }: CouponUsageStatsProps) {
  const total = coupons.length
  const active = coupons.filter((c) => c.is_active).length
  const percentActive = total ? Math.round((active / total) * 100) : 0

  return (
    <div className="grid gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4 md:grid-cols-3">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Total coupons
        </p>
        <p className="text-2xl font-semibold text-slate-50">{total}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Active coupons
        </p>
        <p className="text-2xl font-semibold text-emerald-300">{active}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Active ratio
        </p>
        <p className="text-2xl font-semibold text-sky-300">
          {percentActive}%
        </p>
      </div>
    </div>
  )
}


