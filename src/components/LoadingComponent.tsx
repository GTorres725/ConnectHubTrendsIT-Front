type Props = {
    message?: string;
};

export function LoadingComponent({
    message = "Carregando..."
}: Props) {
    return (
        <main className="flex h-full w-full items-center justify-center bg-black mt-5">
            <div className="flex flex-col items-center justify-center gap-5 rounded-md bg-gray-800 w-[80%] py-5">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500" />

                <p className="text-center text-white">
                    {message}
                </p>

            </div>
        </main>
    );
}