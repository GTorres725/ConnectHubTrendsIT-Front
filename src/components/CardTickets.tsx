export type Status = "pending" | "inProgress" | "carriedOut" | "finalizationApproved" | "unusable";

type Props = {
    id: number;
    title: string;
    sector: number;
    status: Status;
    description: string;
    date: string;
    click?: (() => void)
}

export function CardTickets ({id, title, sector, status, description, date, click}: Props) {

    const [year, month, day] = date.split("T")[0].split("-");
    const formatted = `${day}/${month}/${year}`;
    
    const statusStyle = {
        pending: {
          text: "Pendente",
          className: "bg-blue-100 text-blue-700",
        },
        inProgress: {
          text: "Em andamento",
          className: "bg-orange-100 text-orange-700",
        },
        carriedOut: {
          text: "Finalizado",
          className: "bg-green-100 text-green-600",
        },

        finalizationApproved: {
          text: "Aprovado",
          className: "bg-green-100 text-green-900",
        },

        unusable: {
          text: "Descartado",
          className: "bg-red-100 text-red-900",
        },
    };

    return (
        <div className="w-full flex flex-col items-center mb-3 cursor-pointer" onClick={click}>
            <div className="flex flex-col bg-gray-900 w-[95%] rounded-2xl py-2">
                <div className="flex flex-row justify-around items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-gray-400">Ticket ID: </p>
                        <h3 className="text-blue-900 font-bold">{id}</h3>
                    </div>
                    <p className={`rounded-full px-2 py-0.5 text-xs ${statusStyle[status].className}`}>{statusStyle[status].text}</p>
                    <p className="rounded bg-gray-400 px-1 text-xs text-black">{sector}</p>
                    <p className="text-xs text-gray-400">{formatted}</p>
                </div>
                <div className="px-3">
                    <h2>{title}</h2>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </div>
        </div>
    )
}