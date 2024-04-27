
import HomeClient from './PageClient';

export default async function Home() {

  const res = await fetch(`${process.env.BACKEND_API_URL}/cats`)
  const data = await res.json()
  console.log(data.groups[0].cats)
  let groups = data.groups
  console.log(groups)

  return (
    <HomeClient groups={groups} />
  );
}

