"use client"
import Image from "next/image"
import CatCard from '@/app/components/CatCard'
import { useState } from "react"

interface Cat {
    url: string;
    score: number;
}

interface Group {
    cat_creation_prompt: string;
    cat_vision_prompt: string;
    cats: Cat[];
}

interface Props {
    groups: Group[];
}

export default function HomeClient({ groups = [] }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [catGroups, setCatGroups] = useState<Group[]>(groups);
    const [size, setSize] = useState<string>('');
    const [breed, setBreed] = useState<string>('');
    const [style, setStyle] = useState<string>('');
    const [cutenessDefiners, setCutenessDefiners] = useState<string[]>([]);

    async function onClick() {
        if (catGroups.length >= 150) {
            alert("Kitties Are Full. Message Jesse For More.");
            return;
        }

        setIsLoading(true)

        let cat_creation = { size, breed, style }
        let cute_vision = { cutenessDefiners }
        const payload = {
            cat_creation, cute_vision
        }

        const res = await fetch('/api/cats', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (res.status === 403) {
            alert("Kitties Are Full. Message Jesse For More.");
            setIsLoading(false);
            return;
        }
        if (res) {
            const responseData = await res.json()
            setCatGroups([responseData.groups[0], ...catGroups])
            setIsLoading(false)
        }
    }
    function handleCutenessChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, checked } = event.target;
        setCutenessDefiners(prev =>
            checked ? [...prev, value] : prev.filter(cd => cd !== value)
        );
    }

    const catBreeds = ['Default', 'Ragdoll', 'Maine Coon', 'British Shorthair', 'Scottish Fold',
        'Sphynx', 'Siamese', 'Persian', 'Bengal'
    ]

    const isButtonDisabled = catGroups.length >= 150;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-2 pt-5">

            <button onClick={onClick} disabled={isButtonDisabled} className={`mt-8 
            text-white font-bold py-2 px-4 rounded transition-all duration-300 
            ${isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}>
                <div className="flex items-center">
                    <Image
                        src='kitty_computer.svg'
                        width={30}
                        height={30}
                        alt="Picture of a cat"
                        className={`rounded-sm mr-2 transition-all duration-300 ${isLoading ? 'animate-spin-nine-three' : ''}`}
                    />

                    {isLoading ? 'Kitties Loading!' : 'Kitty Time!'}
                    <Image
                        src='kitty_computer.svg'
                        width={30}
                        height={30}
                        alt="Picture of a cat"
                        className={`rounded-sm ml-2 transition-all duration-300 ${isLoading ? 'animate-spin-nine-three' : ''}`}
                    />
                </div>
            </button>
            {isButtonDisabled && <p className="text-red-500 mt-2">Kitties Are Full. Message Jesse For More.</p>}

            <div className="flex flex-wrap md:flex-row gap-4 mt-4 mb-4 justify-center ">
                <div>
                    <label className="block text-sm font-bold mb-1">Size</label>
                    <select
                        value={size}
                        onChange={e => setSize(e.target.value)}
                        className="form-select block w-full"
                    >
                        <option value="">Default</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Breed</label>
                    <select
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        className="form-select block w-full"
                    >
                        {catBreeds.map(breed => (
                            <option key={breed} value={breed}>{breed}</option>

                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Style</label>
                    <select
                        value={style}
                        onChange={e => setStyle(e.target.value)}
                        className="form-select block w-full"
                    >
                        <option value="">Default</option>
                        <option value="realistic">Realistic</option>
                        <option value="cartoon">Cartoon</option>
                        <option value="scary">Scary</option>
                        <option value="cool">Cool</option>
                    </select>
                </div>

                <div>
                    <fieldset>
                        <legend className="text-sm font-bold mb-1">Cuteness Definers</legend>
                        {["fluffiness", "smollness", "cuddliness"].map(definer => (
                            <div key={definer} className="flex items-center mb-1">
                                <input
                                    id={definer}
                                    type="checkbox"
                                    value={definer}
                                    checked={cutenessDefiners.includes(definer)}
                                    onChange={handleCutenessChange}
                                    className="mr-2"
                                />
                                <label htmlFor={definer}>{definer}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-4 mt-8">
                {catGroups.map((group, index) => (
                    <div key={index} className="my-4 p-4 border-t border-gray-300 w-full">
                        <div className="text-center font-bold text-lg">Group: {catGroups.length - index}</div>
                        <div>Prompt for Creation: {group.cat_creation_prompt}</div>
                        <div>Prompt for Vision: {group.cat_vision_prompt}</div>
                        <div className="flex flex-row flex-wrap justify-center gap-4 mt-8">
                            {group.cats.map((cat, catIndex) => (
                                <CatCard key={catIndex} url={cat.url} score={cat.score} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

