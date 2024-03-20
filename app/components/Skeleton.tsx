export default function Skeleton() {
  return (
    <div role="status" className="flex gap-1 animate-pulse">
      <div className="bg-gray-700 h-[90vh] w-12 rounded" />
      <div className="flex flex-col gap-1 pt-1">
        <div className="bg-gray-700 w-60 h-6 rounded-full" />
        <div className='h-6' />
        <div className="bg-gray-700 w-24 h-6 rounded-full" />
        <div className="bg-gray-700 w-20 h-6 rounded-full" />
        <div className="bg-gray-700 w-24 h-6 rounded-full" />
        <div className="bg-gray-700 w-28 h-6 rounded-full" />
        <div className="bg-gray-700 w-32 h-6 rounded-full" />
        <div className='h-6' />
        <div className="bg-gray-700 w-20 h-6 rounded-full" />
        <div className="bg-gray-700 w-64 h-6 rounded-full" />
      </div>
    </div>
  )
}
