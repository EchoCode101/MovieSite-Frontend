import type { Banner } from '../types'

interface BannerPreviewProps {
  banner?: Banner | null
}

export function BannerPreview({ banner }: BannerPreviewProps) {
  if (!banner) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-800 bg-slate-900/40 text-sm text-slate-500">
        Select or create a banner to see a preview.
      </div>
    )
  }

  return (
    <div className="flex h-40 items-stretch overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60">
      <div className="relative flex-1">
        {banner.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={banner.image_url}
            alt={banner.title || 'Banner preview'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
            No image URL set
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="pointer-events-none absolute left-4 top-4 space-y-1 text-xs text-slate-200">
          <p className="font-semibold">
            {banner.title || 'Banner title'}
          </p>
          <p className="text-slate-300">
            Device: {banner.device || 'Any'} · Position: {banner.position || 'Any'}
          </p>
          <p className="text-slate-400">
            Target: {banner.target_type}:{' '}
            <span className="font-mono text-[10px]">
              {banner.target_id || 'not set'}
            </span>
          </p>
        </div>
      </div>
      <div className="w-40 border-l border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
        <p className="font-semibold mb-1">Meta</p>
        <p>Sort: {banner.sort_order ?? '—'}</p>
        <p>Status: {banner.is_active ? 'Active' : 'Inactive'}</p>
        {banner.createdAt && (
          <p className="mt-1 text-[10px] text-slate-500">
            Created:{' '}
            {new Date(banner.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}


