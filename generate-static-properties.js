// This script generates individual property pages for static export
const fs = require('fs');
const path = require('path');

// Property IDs from our data
const propertyIds = ['1', '2', '3', '4', '5', '6'];

// Create static property pages
const propertyDir = path.join(__dirname, 'app', 'property-static');
if (!fs.existsSync(propertyDir)) {
  fs.mkdirSync(propertyDir, { recursive: true });
}

propertyIds.forEach(id => {
  const pagePath = path.join(propertyDir, id);
  if (!fs.existsSync(pagePath)) {
    fs.mkdirSync(pagePath, { recursive: true });
  }
  
  const pageContent = `import PropertyDetailClient from '../../property-detail-client';

export default function Property${id}Page() {
  return <PropertyDetailClient propertyId="${id}" />;
}
`;
  
  fs.writeFileSync(path.join(pagePath, 'page.tsx'), pageContent);
});

console.log('✅ Static property pages generated');

