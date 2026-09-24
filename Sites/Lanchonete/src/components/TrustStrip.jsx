/* ------------------------------------------------------------------ */
/* Trust strip — "Trusted by Thousands" + partner logo row.             */
/* ------------------------------------------------------------------ */
const PARTNERS = [
  { name: "zomato", letters: "zomato" },
  { name: "swiggy", letters: "SWIGGY" },
  { name: "uber eats", letters: "uber eats" },
  { name: "doordash", letters: "doordash" },
  { name: "google", letters: "Google" },
];

export default function TrustStrip() {
  return (
    <section className="py-8 border-y border-gray-100">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
          Trusted by Thousands
        </span>
        <div className="flex items-center gap-8 sm:gap-10">
          {PARTNERS.map((p) => (
            <span
              key={p.name}
              className="text-gray-400 font-bold text-sm sm:text-base tracking-tight whitespace-nowrap select-none"
            >
              {p.letters}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}