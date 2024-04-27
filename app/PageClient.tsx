"use client"
import Image from "next/image"
import CatCard from '@/app/components/CatCard'
import { useState } from "react"


export default function HomeClient({ groups }) {
    const [isLoading, setIsLoading] = useState(false)
    const [catGroups, setCatGroups] = useState(groups)
    const [size, setSize] = useState('');
    const [breed, setBreed] = useState('');
    const [style, setStyle] = useState('');
    const [cutenessDefiners, setCutenessDefiners] = useState([]);

    async function onClick() {
        setIsLoading(true)
        let cat_creation = { size, breed, style }
        let cute_vission = { cutenessDefiners }
        const payload = {
            cat_creation, cute_vission
        }
        console.log('payload', payload)
        // const res = await fetch('/api/cats', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload),
        // });
        // if (res) {
        //     console.log('res', res.body)
        //     setCatGroups([...catGroups, res.body])
        //     setIsLoading(false)
        // }
    }
    function handleCutenessChange(event) {
        const { value, checked } = event.target;
        setCutenessDefiners(prev =>
            checked ? [...prev, value] : prev.filter(cd => cd !== value)
        );
    }

    const catBreeds = ['Default', 'Ragdoll', 'Maine Coon', 'British Shorthair', 'Scottish Fold',
        'Sphynx', 'Siamese', 'Persian', 'Bengal'
    ]

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-2 pt-5">
            <div className="ml-2 mr-2">
                Clicking the button generates 5 images of cats using image generation and then rates those cats by "cuteness" using computer vision. Size, breed, and style selectors
                will adjust the image generation prompt. Selecting cuteness definerse will adjust how cuteness is defined by the computer vision.
            </div>

            <button onClick={onClick} className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <div className="flex items-center">
                    <Image
                        src='kitty_computer.svg'
                        width={30}
                        height={30}
                        alt="Picture of a cat"
                        className={`rounded-sm mr-2 transition-all duration-300 ${isLoading ? 'animate-spin-nine-three' : ''}`}
                    />

                    Kitty Time!
                    <Image
                        src='kitty_computer.svg'
                        width={30}
                        height={30}
                        alt="Picture of a cat"
                        className={`rounded-sm ml-2 transition-all duration-300 ${isLoading ? 'animate-spin-nine-three' : ''}`}
                    />
                </div>
            </button>
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
                            <option value={breed}>{breed}</option>

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
                {catGroups.map(group => (
                    group.cats.map((cat, index) => (
                        <CatCard key={index} url={cat.url} score={cat.score} />
                    )))
                )}
            </div>
        </div>
    )
}

