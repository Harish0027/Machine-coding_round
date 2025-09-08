import InputBox from "@/components/InputBox";
import TodoBox from "@/components/TodoBox";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <>
      <InputBox />
      <div className="flex mt-5 justify-center text-5xl font-serif">Todos</div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {data.Todos?.length > 0 ? (
          data.Todos.map((todo: any, index: number) => (
            <TodoBox todo={todo} key={index} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No todos available
          </p>
        )}
      </div>
    </>
  );
}
