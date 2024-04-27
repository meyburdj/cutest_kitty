import HomeClient from './PageClient';

export default async function Home() {

  const res = await fetch(`${process.env.BACKEND_API_URL}/cats`, { next: { revalidate: 0 } })
  const data = await res.json()
  let groups = data.groups

  return (
    <HomeClient groups={groups} />
  );
}

