const BudgetSummary = () => {
    const data = [
        {
            label: "Total Budget",
            value: "₹50,000",
            percent: 100,
            color: "bg-primary",
            textColor: "text-primary",
            border: "border-primary/20",
        },
        {
            label: "Spent",
            value: "₹32,400",
            percent: 65,
            color: "bg-rose-600",
            textColor: "text-rose-700",
            border: "border-rose-700/20",
        },
        {
            label: "Remaining",
            value: "₹17,600",
            percent: 35,
            color: "bg-emerald-600",
            textColor: "text-emerald-700",
            highlight: true,
            border: "border-emerald-700/20",
        },
        {
            label: "Days Left",
            value: "9 days",
            percent: 30,
            color: "bg-violet-600",
            textColor: "text-violet-700",
            border: "border-violet-700/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {data.map((item) => (
                <div
                    key={item.label}
                    className={`
                        group relative
                        overflow-hidden rounded-lg
                        bg-white p-4 sm:p-4
                        shadow-sm ring-1 ring-gray-100
                        transition-all duration-300
                        hover:shadow-md hover:ring-green-200
                        active:scale-[0.98] border ${item.border}
                        ${item.highlight ? "ring-2 ring-emerald-500/70 bg-emerald-50/40" : ""}
                    `}
                >
                    {/* Background accent blob */}
                    <div
                        className={`
                            absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl
                            opacity-10 transition-opacity duration-500 group-hover:opacity-20
                            ${item.color}
                        `}
                    />

                    <div className="relative z-10">
                        <div
                            key={item.label}
                            className={` flex items-center justify-between`}
                        >
                            {/* LEFT: Title + Value */}
                            <div>
                                <p className="text-sm font-medium text-gray-500/90">
                                    {item.label}
                                </p>

                                <p
                                    className={`
                                        mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight
                                        ${item.highlight ? item.textColor : "text-gray-900"}
                                    `}
                                >
                                    {item.value}
                                </p>
                            </div>

                            {/* RIGHT: Mini Graph */}
                            <div className="mt-4 flex items-end gap-1 h-10 opacity-60">
                                {[38, 65, 48, 92, 55, 78, 42].map((height, i) => (
                                    <div
                                        key={i}
                                        className={`
                                            w-1.5 rounded-full
                                            ${item.color}
                                            transition-all duration-500
                                            `}
                                        style={{
                                            height: `${height}%`,
                                            opacity: i === 6 ? 0.9 : 0.45 + i * 0.07,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-4">
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                                    style={{ width: `${item.percent}%` }}
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-gray-500">
                                {item.percent}%{" "}
                                <span className="font-medium">
                                    {item.label === "Remaining" ? "available" : "used"}
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default BudgetSummary;