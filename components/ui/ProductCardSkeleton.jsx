export default function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-forest-700 rounded-2xl overflow-hidden shadow-premium">
      <div className="skeleton aspect-square" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-3 w-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-6 w-20" />
          <div className="skeleton h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}
