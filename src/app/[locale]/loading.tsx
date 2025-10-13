export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-lumora-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lumora-dark/60">Loading...</p>
      </div>
    </div>
  )
}
