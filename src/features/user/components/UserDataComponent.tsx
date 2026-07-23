type Props = {
    name: string | undefined;
    email: string | undefined;
    // sector: string;
    sectorId: number | undefined;
    userId: number | undefined;
}

export function UserDataComponent ({name, email, userId, sectorId}: Props) {
    return (
        <div className="bg-gray-900 py-5 w-[90%] rounded-md">
                <div className="flex items-center w-full justify-center">
                    <p className="text-sm text-gray-400">Nome:</p>
                    {"\u00A0"}
                    {"\u00A0"}
                    <p>{name}</p>
                </div>
                <div className="flex items-center w-full justify-center">
                    <p className="text-sm text-gray-400">E-mail:</p>
                    {"\u00A0"}
                    {"\u00A0"}
                    <p>{email}</p>
                </div>
                <div className="flex items-center w-full justify-center">
                    <p className="text-sm text-gray-400">ID do setor:</p>
                    {"\u00A0"}
                    {"\u00A0"}
                    <p>{sectorId}</p>
                </div>
                <div className="flex items-center w-full justify-center">
                    <p className="text-sm text-gray-400">ID de usuário:</p>
                    {"\u00A0"}
                    {"\u00A0"}
                    <p>{userId}</p>
                </div>
                {/* <p>Setor: {sector}</p> */}

                <button>
                    Sair
                </button>
        </div>
    )
}