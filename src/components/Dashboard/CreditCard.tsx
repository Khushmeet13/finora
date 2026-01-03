import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface CardItem {
    holder: string;
    number: string;
    type: "credit" | "debit";
    gradient: string;
}

const defaultCards: CardItem[] = [
    {
        holder: "Marvin McKinney",
        number: "5242 - 4343 - 8348 - 4878",
        type: "credit",
        gradient: "from-teal-700 to-teal-500",
    }
];

export default function CreditCard({ cards = defaultCards }: { cards?: CardItem[] }) {
    return (
        <Card className="p-0 overflow-hidden relative w-full h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">My Cards</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">

                        {/* MAIN CARD */}
                        <div className="relative flex-1">
                            {cards.map((c, index) => (
                                <div
                                    key={index}
                                    className={`w-full h-48 rounded-xl mt-2 bg-gradient-to-r from-primary to-primary/80 p-5 text-white 
                                    shadow-[-5px_8px_2px_rgba(200,200,200,0.75)] flex flex-col justify-between`}

                                >
                                    <div className="flex justify-between">
                                        <span className="text-sm opacity-90">
                                            {c.type === "credit" ? "Credit" : "Debit"}
                                        </span>
                                        <div className="w-6 h-3 bg-white/40 rounded-full"></div>
                                    </div>

                                    <div>
                                        <p className="text-lg font-medium">{c.holder}</p>
                                        <p className="tracking-widest mt-1 text-sm">{c.number}</p>
                                    </div>
                                </div>
                            ))}

                            {/* DOTS */}

                        </div>

                        {/* ADD CARD BOX – EXACT LIKE IMAGE */}
                        <div className=" h-48 w-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-4xl text-primary cursor-pointer">
                            +
                        </div>

                    </div>
                    <div className="flex justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
