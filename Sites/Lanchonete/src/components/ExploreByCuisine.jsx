import "./ExploreByCuisine.css";

const cuisines = [
    {
        name: "Italiana",
        count: "120+ Pratos",
        image:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
        bg: "#e7efe3",
    },
    {
        name: "Chinesa",
        count: "150+ Pratos",
        image:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80",
        bg: "#fbe9dd",
    },
    {
        name: "Indiana",
        count: "180+ Pratos",
        image:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80",
        bg: "#fdf1cf",
    },
    {
        name: "Mexicana",
        count: "90+ Pratos",
        image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
        bg: "#fbe4e1",
    },
    {
        name: "Japonesa",
        count: "110+ Pratos",
        image:
            "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
        bg: "#f1e6f7",
    },
];

export default function ExploreByCuisine({ onNavigate }) {
    return (
        <section className="cuisine-section">
            <div className="cuisine-header">
                <h2>Explorar por Cozinha</h2>
                <a
                    href="#"
                    className="view-all"
                    onClick={(e) => { e.preventDefault(); onNavigate?.('Categories'); }}
                >
                    Ver Todos <span aria-hidden="true">→</span>
                </a>
            </div>

            <div className="cuisine-grid">
                {cuisines.map((cuisine) => (
                    <div
                        className="cuisine-card"
                        key={cuisine.name}
                        style={{ backgroundColor: cuisine.bg }}
                    >
                        <img src={cuisine.image} alt={cuisine.name} />
                        <h3>{cuisine.name}</h3>
                        <p>{cuisine.count}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}