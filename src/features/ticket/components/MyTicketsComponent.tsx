type Props = {
    name: string | undefined;
    email: string | undefined;
    // sector: string;
    sectorId: number | undefined;
    userId: number | undefined;
}

export function UserDataComponent ({name, email, userId, sectorId}: Props) {
    return (
        <div className="w-screen h-screen">
            <div className="w-[90%] h-[90%] bg-amber-400">

            </div>
        </div>
    )
}