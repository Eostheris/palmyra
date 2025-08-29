const fs = require('fs');
const path = require('path');

// Read the vehicle table file
const vehicleTablePath = path.join(__dirname, '..', 'data', 'vehiclestable.lua');
const luaContent = fs.readFileSync(vehicleTablePath, 'utf8');

// Parse the Lua table and convert to TypeScript
function convertLuaToTypeScript(luaContent) {
  const vehicles = {};
  
  // Remove the table declaration and closing bracket
  let content = luaContent
    .replace(/^---@type.*\n/, '')
    .replace(/^return\s*\{\s*\n/, '')
    .replace(/\}$/, '');
  
  // Split into potential vehicle blocks
  const lines = content.split('\n');
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines and comments
    if (!line || line.startsWith('--') || line.startsWith('---')) {
      i++;
      continue;
    }
    
    // Look for vehicle declaration (both formats)
    let vehicleMatch = line.match(/^(\w+)\s*=\s*\{/);
    if (!vehicleMatch) {
      vehicleMatch = line.match(/^\["?([^"]+)"?\]\s*=\s*\{/);
    }
    if (!vehicleMatch) {
      vehicleMatch = line.match(/^\['([^']+)'\]\s*=\s*\{/);
    }
    
    if (vehicleMatch) {
      const vehicleKey = vehicleMatch[1];
      const vehicleData = {};
      
      // Parse the vehicle block
      i++; // Move to next line after the opening brace
      
      while (i < lines.length) {
        const propertyLine = lines[i].trim();
        
        // Check for end of vehicle block
        if (propertyLine === '},') {
          break;
        }
        
        // Skip empty lines and comments
        if (!propertyLine || propertyLine.startsWith('--')) {
          i++;
          continue;
        }
        
        // Parse properties with both quote styles
        let match;
        
        // Parse name
        if ((match = propertyLine.match(/name\s*=\s*["']([^"']*)["'],?/))) {
          vehicleData.name = match[1];
        }
        // Parse brand
        else if ((match = propertyLine.match(/brand\s*=\s*["']([^"']*)["'],?/))) {
          vehicleData.brand = match[1];
        }
        // Parse model
        else if ((match = propertyLine.match(/model\s*=\s*["']([^"']+)["'],?/))) {
          vehicleData.model = match[1];
        }
        // Parse price
        else if ((match = propertyLine.match(/price\s*=\s*(\d+),?/))) {
          vehicleData.price = parseInt(match[1]);
        }
        // Parse category
        else if ((match = propertyLine.match(/category\s*=\s*["']([^"']+)["'],?/))) {
          vehicleData.category = match[1];
        }
        // Parse type
        else if ((match = propertyLine.match(/type\s*=\s*["']([^"']+)["'],?/))) {
          vehicleData.type = match[1];
        }
        // Parse hash
        else if ((match = propertyLine.match(/hash\s*=\s*`([^`]+)`,?/))) {
          vehicleData.hash = match[1];
        }
        
        i++;
      }
      
      // Only add vehicle if it has all required fields
      if (vehicleData.name && vehicleData.model && vehicleData.price !== undefined && 
          vehicleData.category && vehicleData.type && vehicleData.hash) {
        vehicleData.brand = vehicleData.brand || ''; // Brand can be empty
        vehicles[vehicleKey] = vehicleData;
      } else {
        console.warn(`Skipping incomplete vehicle: ${vehicleKey}`, vehicleData);
      }
    }
    
    i++;
  }
  
  return vehicles;
}

// Convert the data
console.log('Starting conversion...');
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

// Show first few vehicles as sample
const sampleVehicles = Object.keys(vehicleData).slice(0, 5);
console.log('\nSample vehicles converted:');
sampleVehicles.forEach(key => {
  const vehicle = vehicleData[key];
  console.log(`- ${key}: ${vehicle.brand} ${vehicle.name} (${vehicle.category})`);
});

// Check for the problematic vehicles
const gbVehicles = Object.keys(vehicleData).filter(key => key.startsWith('gb')).slice(0, 3);
console.log('\nSample GB vehicles:');
gbVehicles.forEach(key => {
  const vehicle = vehicleData[key];
  console.log(`- ${key}: ${vehicle.brand} ${vehicle.name} (${vehicle.category})`);
});
