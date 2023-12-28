'use client'
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
    link: "back" | string,
    option : string,
}

const ButtonRouter = ({link, option} : Props) => {
    const router = useRouter()
    const click = () => {
        if(link === "back") {
            router.back()
        }else {
            router.push(link)
        }
    }
    return (
        <>
        <Button onClick={() => click()}
        className="bg-pink-1 md hover:bg-pink-2">
            {option}
        </Button>
        </>
    )
}

export default ButtonRouter;