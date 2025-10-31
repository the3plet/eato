export const SkeletonCard = () => {
  return (
    <div className="rounded-2xl p-4 bg-white shadow-md animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded-xl mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export const SkeletonCategory = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 animate-pulse">
      <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gray-200 rounded-full"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  );
};

export const SkeletonRestaurant = () => {
  return (
    <div className="rounded-2xl p-4 bg-gray-100 animate-pulse h-32">
      <div className="flex gap-4 h-full">
        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
        <div className="flex flex-col justify-center flex-1 gap-2">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full mt-1"></div>
        </div>
      </div>
    </div>
  );
};
