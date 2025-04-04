export function getTypeColorHex(type) {
	if (!type || !type.type || !type.type.name) {
	  return '#F0F0F0'; // Default neutral gray
	}
	const typeName = type.type.name.toLowerCase();
	const typeColors = {
	  normal: '#B0B0B0',   // Cool, solid gray (more balanced and defined)
	  fire: '#FF5733',     // Rich, fiery red-orange (bold and intense)
	  water: '#2674A7',    // Deep, vivid blue (strong contrast with pastels)
	  grass: '#4A9B2D',    // Rich emerald green (richer and bolder than pastel)
	  electric: '#F9A800', // Vibrant amber yellow (bright yet bold)
	  ice: '#57A6D1',      // Cool, rich ice blue (still pastel but deeper)
	  fighting: '#E04B4B', // Bold red (more intense)
	  poison: '#9A56B8',   // Deep, rich purple (more vibrant)
	  ground: '#A97F43',   // Earthy brown (bold and warm)
	  flying: '#5A4BCF',   // Deep periwinkle blue (stronger contrast)
	  psychic: '#8F4BAF',  // Rich purple (more saturated)
	  bug: '#7EBD2A',      // Vivid lime green (bolder and less pastel)
	  rock: '#D1B77A',     // Warm, earthy tan (richer and more prominent)
	  ghost: '#7C58A2',    // Stronger purple (less pastel and more saturated)
	  dragon: '#6F3A90',   // Deep violet (bold and intense)
	  dark: '#3E3E3E',     // Charcoal gray (strong and defined)
	  steel: '#5B6D7E',    // Cool blue-gray (deeper, more defined)
	  fairy: '#F157A4'     // Bold pink (stronger but still playful)
	};
  
	return typeColors[typeName] || '#F0F0F0'; // Default neutral gray for unknown types
  }
  
  export default getTypeColorHex;
  