
interface Props {
    children : React.ReactNode,
    date : Date | null ,
    option : string | null,
    done : boolean,
}

const StatusIcon = ({
    children,
    date,
    option,
    done,
}: Props) => {
    return (
        <>
        <div className="flex flex-col items-center z-10">
            <div className="flex justify-center p-3">
                <div className={`bg-light-1 w-box h-box 
                rounded-full flex justify-center items-center border-4 
                ${done ? "border-green": "border-hex"}`}>
                    {children}
                </div>
                
            </div>
            <div className="text-center mt-2 text-lg">
                {date?.toLocaleDateString()}
            </div>
            <div className="text-center m-1 text-lg w-card">
                {option}
            </div>
        </div>
        


        </>
    )
}

export default StatusIcon;