export function Hero() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-12">
          <div className="flex-1">
            <div className="aspect-4/3 bg-linear-to-br from-amber-50 to-orange-100 border-2 border-gray-300 flex items-center justify-center relative rounded-lg overflow-hidden">
              <div className="text-center p-8">
                <svg className="w-32 h-32 text-amber-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8m0 0l-3-3m3 3l3-3" />
                </svg>
                <p className="text-lg font-semibold text-amber-900">Third Wave Coffee</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Elevate Your Coffee Experience</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover premium coffee accessories, precision filters, and artisan beans for the discerning third wave coffee enthusiast. Every detail matters in the pursuit of the perfect cup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
