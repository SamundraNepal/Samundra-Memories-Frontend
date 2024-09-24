export default function Sppiner() {
  return (
    <div className="flex flex-col border shadow-sm rounded-xl h-full w-full ">
      <div className="flex flex-auto flex-col justify-center items-center p-64 md:p-5">
        <div className="flex flex-col items-center justify-center">
          <div
            className="animate-spin inline-block size-6 border-[5px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500 p-60"
            role="status"
            aria-label="loading"
          ></div>
          <h1>Loading</h1>
        </div>
      </div>
    </div>
  );
}
