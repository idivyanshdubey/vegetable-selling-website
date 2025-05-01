import products from '../products.json';

export default function filterList(arr, method) {
  // If no filtering method is provided, return all products
  if (method === null) return products;

  // Filter products based on the selected sizes
  return products.filter((product) => {
    const sizeArray = product.size.split(" "); // Split sizes into an array
    if (arr.length > 0) {
      // Check if any size in `arr` matches the product's sizes
      return sizeArray.some((size) => arr.includes(size));
    }
    return true; // If no sizes are selected, return all products
  });
}