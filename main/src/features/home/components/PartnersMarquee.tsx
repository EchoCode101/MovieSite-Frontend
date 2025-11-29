const PARTNERS = [
  { name: "3DOcean", image: "/partners/3docean-light-background.png" },
  { name: "ActiveDen", image: "/partners/activeden-light-background.png" },
  { name: "AudioJungle", image: "/partners/audiojungle-light-background.png" },
  { name: "CodeCanyon", image: "/partners/codecanyon-light-background.png" },
  { name: "PhotoDune", image: "/partners/photodune-light-background.png" },
  { name: "ThemeForest", image: "/partners/themeforest-light-background.png" },
]

export function PartnersMarquee() {
  return (
    <div className="w-full py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-2xl font-bold text-muted-foreground/50 uppercase tracking-widest">
          Trusted Partners
        </h2>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
          {PARTNERS.map((partner) => (
            <img
              key={partner.name}
              src={partner.image}
              alt={partner.name}
              className="h-12 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 px-8">
          {PARTNERS.map((partner) => (
            <img
              key={`${partner.name}-duplicate`}
              src={partner.image}
              alt={partner.name}
              className="h-12 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
