

type Props =  {
    label: string;
    value: number;
    click: () => void
}

export function ButtonCardsFilterTickets({label, value, click}: Props) {
    return (
        <button onClick={click}
      className="
        group
        relative
        h-12
        w-24
        overflow-hidden
        border
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:border-blue-700
        hover:shadow-lg
        cursor-pointer
        mx-auto
      "
    >
      {/* Conteúdo normal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-full">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-semibold text-black">{value}</p>
      </div>

      {/* Conteúdo do hover */}
      <div className="absolute inset-0 flex translate-y-full items-center justify-center transition-all duration-300 group-hover:translate-y-0">
        <span className="text-lg text-blue-900">
          Filtrar
        </span>
      </div>
    </button>
    )
}

