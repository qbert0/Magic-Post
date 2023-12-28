import { DotIcon } from "lucide-react";

interface Props {
    children : React.ReactNode | null,
    date : Date,
    option : string,
    start : boolean,
}

const StatusTitle = ({
    children,
    date,
    option,
    start,
} : Props) => {
    return (
        <>
        <div className="w-full flex gap-3 relative ">
            {start && <div className="h-full w-0.5 bg-hex absolute left-1.5 top-2 z-0"></div>
            }
            <div className="flex justify-center">
                
                <div className=" h-11 w-11 bg-hex rounded-full mt-1.5 z-10 ">
                </div>
            </div>
            <div className="text-center ">
                {date.toLocaleDateString()}
            </div>
            <div className="text-left grow">
                {option}
            </div>

        </div>

        </>
    )
}

export default StatusTitle;