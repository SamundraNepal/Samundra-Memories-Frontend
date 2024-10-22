export default function Sppiner({ Size = 'p-60', width = 'w-full' }) {
  return (
    <div
      className={`flex flex-col border shadow-sm rounded-xl h-full ${width}`}
    >
      <div className="flex flex-auto flex-col justify-center items-center p-64 md:p-5">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`animate-spin inline-block size-6 border-[5px] border-current border-t-transparent text-amber-600 rounded-full dark:text-amber-900 ${Size}`}
            role="status"
            aria-label="loading"
          ></div>
          <h1>Loading</h1>
        </div>
      </div>
    </div>
  );
}
