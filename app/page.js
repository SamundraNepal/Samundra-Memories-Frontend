export const metadata = {
  title: "Homepage",
};

export default function Home({ userName }) {
  return (
    <div className="flex justify-center items-center bg-slate-100 h-full">
      <strong className="text-4xl animate-bounce flex flex-col gap-2 justify-center items-center">
        <h1>Welcome {userName}</h1>
        <h1>Echoes of Memories</h1>
      </strong>
    </div>
  );
}
