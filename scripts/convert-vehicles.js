const fs = require('fs');
const path = require('path');

// Read the vehicle table file
const vehicleTablePath = path.join(__dirname, '..', 'data', 'vehiclestable.lua');
const luaContent = fs.readFileSync(vehicleTablePath, 'utf8');

// Parse the Lua table and convert to TypeScript
function convertLuaToTypeScript(luaContent) {
  const vehicles = {};
  
  // Regular expression to match vehicle entries
  const vehicleRegex = /(\w+)\s*=\s*\{[\s\S]*?name\s*=\s*'([^']+)',[\s\S]*?brand\s*=\s*'([^']*)',[\s\S]*?model\s*=\s*'([^']+)',[\s\S]*?price\s*=\s*(\d+),[\s\S]*?category\s*=\s*'([^']+)',[\s\S]*?type\s*=\s*'([^']+)',[\s\S]*?hash\s*=\s*`([^`]+)`,[\s\S]*?\}/g;
  
  let match;
  while ((match = vehicleRegex.exec(luaContent)) !== null) {
    const [, key, name, brand, model, price, category, type, hash] = match;
    
    vehicles[key] = {
      name: name,
      brand: brand,
      model: model,
      price: parseInt(price),
      category: category,
      type: type,
      hash: hash
    };
  }
  
  return vehicles;
}

// Convert the data
const vehicleData = convertLuaToTypeScript(luaContent);

// Generate TypeScript file content
const tsContent = `// Auto-generated vehicle lookup data
// Converted from FiveM vehicle table

export interface VehicleInfo {
  name: string
  brand: string
  model: string
  price: number
  category: string
  type: string
  hash: string
}

export const vehicleData: Record<string, VehicleInfo> = ${JSON.stringify(vehicleData, null, 2)};

/**
 * Get vehicle information by model name
 * @param model - The vehicle model name (e.g., 'adder', 'onx_polcon')
 * @returns Vehicle information or null if not found
 */
export function getVehicleByModel(model: string): VehicleInfo | null {
  const normalizedModel = model.toLowerCase()
  return vehicleData[normalizedModel] || null
}

/**
 * Get vehicle information by hash
 * @param hash - The vehicle hash
 * @returns Vehicle information or null if not found
 */
export function getVehicleByHash(hash: string): VehicleInfo | null {
  const normalizedHash = hash.toLowerCase()
  const vehicleEntry = Object.values(vehicleData).find(
    vehicle => vehicle.hash.toLowerCase() === normalizedHash
  )
  return vehicleEntry || null
}

/**
 * Get formatted vehicle display name with brand
 * @param model - The vehicle model name
 * @returns Formatted string like "Truffade Adder" or fallback to formatted model name
 */
export function getVehicleDisplayName(model: string): string {
  const vehicleInfo = getVehicleByModel(model)
  
  if (vehicleInfo) {
    if (vehicleInfo.brand && vehicleInfo.brand.trim() !== '') {
      return \`\${vehicleInfo.brand} \${vehicleInfo.name}\`
    } else {
      return vehicleInfo.name
    }
  }
  
  // Fallback: format the model name if not found in lookup
  return model.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase())
}

/**
 * Get vehicle category display name
 * @param model - The vehicle model name
 * @returns Category like "Super Cars", "Sports Cars", etc.
 */
export function getVehicleCategory(model: string): string {
  const vehicleInfo = getVehicleByModel(model)
  
  if (vehicleInfo) {
    const category = vehicleInfo.category
    // Convert category to more readable format
    switch (category) {
      case 'super': return 'Super Cars'
      case 'sports': return 'Sports Cars'
      case 'sportsclassics': return 'Sports Classics'
      case 'coupes': return 'Coupes'
      case 'sedans': return 'Sedans'
      case 'compacts': return 'Compacts'
      case 'suvs': return 'SUVs'
      case 'offroad': return 'Off-Road'
      case 'muscle': return 'Muscle Cars'
      case 'motorcycles': return 'Motorcycles'
      case 'vans': return 'Vans'
      case 'trucks': return 'Trucks'
      case 'emergency': return 'Emergency'
      case 'service': return 'Service'
      case 'utility': return 'Utility'
      case 'military': return 'Military'
      case 'commercial': return 'Commercial'
      case 'helicopters': return 'Helicopters'
      case 'planes': return 'Planes'
      case 'boats': return 'Boats'
      default: return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }
  
  return 'Unknown'
}

/**
 * Get vehicle price
 * @param model - The vehicle model name
 * @returns Price or 0 if not found
 */
export function getVehiclePrice(model: string): number {
  const vehicleInfo = getVehicleByModel(model)
  return vehicleInfo?.price || 0
}
`;

// Write the TypeScript file
const outputPath = path.join(__dirname, '..', 'lib', 'vehicle-lookup.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`Converted ${Object.keys(vehicleData).length} vehicles to TypeScript`);
console.log('Output written to:', outputPath);
