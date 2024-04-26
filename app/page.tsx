import CatCard from '@/app/components/CatCard'

export default async function Home() {

  const res = await fetch(`${process.env.BACKEND_API_URL}/cats`)
  const data = await res.json()
  console.log(data.groups[0].cats)
  let cats = data.groups[0].cats

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 pt-12">
      <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Kitty Time!
      </button>
      <div className="flex flex-row flex-wrap justify-center gap-4 mt-8">
        {cats.map((cat, index) => (
          <CatCard key={index} url={cat.url} score={cat.score} />
        ))}
      </div>
    </div>
  );
}

