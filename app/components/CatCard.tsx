import Image from 'next/image';

interface CatCardProps {
    url: string;
    score: number;
}

const CatCard: React.FC<CatCardProps> = ({ url, score }) => {
    return (
        <div className="flex flex-col items-center p-4 shadow-lg rounded-lg">
            <Image
                src={url}
                width={250}
                height={250}
                alt="Picture of a cat"
                className="rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">score: {score}</p>
        </div>
    );
};

export default CatCard;