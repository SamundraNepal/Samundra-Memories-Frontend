export default function U_Button({ b_name, b_function }) {
  return (
    <button
      className="bg-green-100 w-40 rounded hover:bg-green-500 p-2 text-black"
      onClick={b_function}
    >
      {b_name}
    </button>
  );
}
